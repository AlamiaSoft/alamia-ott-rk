import { Worker, Job } from 'bullmq';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const CMS_API_URL = process.env.CMS_API_URL || 'http://127.0.0.1:24000';
const S3_ENDPOINT = process.env.S3_ENDPOINT || 'http://127.0.0.1:29000';
const MINIO_ROOT_USER = process.env.MINIO_ROOT_USER || 'minioadmin';
const MINIO_ROOT_PASSWORD = process.env.MINIO_ROOT_PASSWORD || 'minioadminpassword';
const S3_BUCKET = process.env.S3_BUCKET || 'alamia-media';

const s3 = new S3Client({
  endpoint: S3_ENDPOINT,
  region: 'us-east-1',
  credentials: {
    accessKeyId: MINIO_ROOT_USER,
    secretAccessKey: MINIO_ROOT_PASSWORD,
  },
  forcePathStyle: true,
});

async function logToCMS(level: 'info' | 'warn' | 'error', message: string, videoId?: string, jobId?: string, metadata?: any) {
  try {
    await fetch(`${CMS_API_URL}/api/worker-logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, message, videoId, jobId, metadata }),
    });
  } catch (err) {
    console.error('[Logger Error] Failed to send log to CMS', err);
  }
}

logToCMS('info', 'Worker process started', undefined, undefined, { redisUrl: REDIS_URL });
console.log('[Worker] Starting BullMQ FFmpeg worker...', REDIS_URL);

/**
 * Helper function to convert input raw video file to HLS playlist and ts segments
 */
async function transcodeToHLS(inputPath: string, outputDir: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const playlistPath = path.join(outputDir, 'playlist.m3u8');

    ffmpeg(inputPath)
      .outputOptions([
        '-profile:v baseline',
        '-level 3.0',
        '-start_number 0',
        '-hls_time 6',
        '-hls_list_size 0',
        '-f hls',
      ])
      .output(playlistPath)
      .on('end', () => {
        console.log(`[Worker] HLS Transcoding complete: ${playlistPath}`);
        resolve(playlistPath);
      })
      .on('error', (err) => {
        console.error(`[Worker] Transcoding error: ${err.message}`);
        reject(err);
      })
      .run();
  });
}

/**
 * Upload an entire directory (HLS segments) to S3
 */
async function uploadDirectoryToS3(dir: string, prefix: string): Promise<string> {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStream = fs.createReadStream(filePath);
    const contentType = file.endsWith('.m3u8') ? 'application/vnd.apple.mpegurl' : 'video/MP2T';
    
    await s3.send(new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: `${prefix}/${file}`,
      Body: fileStream,
      ContentType: contentType,
      // For local development MinIO, public read is typically assumed if bucket policy allows, 
      // but payload-s3-plugin handles bucket creation.
    }));
  }
  // The playlist URL will be accessible via Payload's storage path or MinIO path directly.
  return `/${S3_BUCKET}/${prefix}/playlist.m3u8`;
}

const worker = new Worker('video-transcode', async (job: Job) => {
  const { videoId } = job.data;
  console.log(`[Worker] Processing job ${job.id} for video ${videoId}`);
  await logToCMS('info', `Started processing job`, videoId, job.id);

  let tempDir = '';
  try {
    // 1. Fetch video from CMS
    const res = await fetch(`${CMS_API_URL}/api/videos/${videoId}`);
    if (!res.ok) throw new Error(`Video ${videoId} not found`);
    const video = await res.json();

    if (!video.videoFile || typeof video.videoFile !== 'object') {
       throw new Error('Video file object not populated');
    }
    const filename = video.videoFile.filename;
    console.log(`[Worker] Found filename: ${filename}`);
    await logToCMS('info', `Found source file: ${filename}`, videoId, job.id);

    // Update status to processing
    await fetch(`${CMS_API_URL}/api/videos/${videoId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'processing' }),
    });

    // 2. Download from S3
    tempDir = fs.mkdtempSync(path.join(process.cwd(), 'hls-'));
    const inputPath = path.join(tempDir, filename);
    const getObj = await s3.send(new GetObjectCommand({
      Bucket: S3_BUCKET,
      Key: filename,
    }));
    
    if (getObj.Body) {
      const writeStream = fs.createWriteStream(inputPath);
      // @ts-ignore
      await pipeline(getObj.Body, writeStream);
    } else {
      throw new Error('No body in S3 object');
    }

    // 3. Transcode
    const outputDir = path.join(tempDir, 'output');
    fs.mkdirSync(outputDir);
    await transcodeToHLS(inputPath, outputDir);

    // 4. Upload to S3
    const prefix = `hls/${videoId}`;
    const playlistPath = await uploadDirectoryToS3(outputDir, prefix);
    
    // 5. Update CMS with ready status and playlist url
    await fetch(`${CMS_API_URL}/api/videos/${videoId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        status: 'ready',
        hlsPlaylistUrl: playlistPath,
      }),
    });

    console.log(`[Worker] Job ${job.id} completed successfully!`);
    await logToCMS('info', `Job completed successfully. Playlist: ${playlistPath}`, videoId, job.id);

  } catch (error: any) {
    console.error(`[Worker] Job ${job.id} failed:`, error);
    await logToCMS('error', `Job failed: ${error.message}`, videoId, job.id, { stack: error.stack });
    // Mark as failed
    await fetch(`${CMS_API_URL}/api/videos/${videoId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'failed' }),
    }).catch(() => {});
    throw error;
  } finally {
    // Cleanup
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }
}, {
  connection: {
    url: REDIS_URL
  }
});

worker.on('failed', (job, err) => {
  console.log(`[Worker] Job failed with error: ${err.message}`);
});
