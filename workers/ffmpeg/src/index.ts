import ffmpeg from 'fluent-ffmpeg';

console.log('[Worker] Starting FFmpeg HLS Transcoder worker...');

/**
 * Helper function to convert input raw video file to HLS playlist and ts segments
 */
export async function transcodeToHLS(inputPath: string, outputOutputDir: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const playlistPath = `${outputOutputDir}/playlist.m3u8`;

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

// Simple polling loop skeleton for Sprint 0 foundation
setInterval(() => {
  console.log('[Worker] Idle - Polling for video transcoding jobs...');
}, 30000);
