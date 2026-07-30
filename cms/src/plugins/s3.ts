import { s3Storage } from '@payloadcms/storage-s3'

export const s3Plugin = s3Storage({
  collections: {
    media: true,
  },
  bucket: process.env.S3_BUCKET || 'alamia-media',
  config: {
    credentials: {
      accessKeyId: process.env.MINIO_ROOT_USER || 'minioadmin',
      secretAccessKey: process.env.MINIO_ROOT_PASSWORD || 'minioadminpassword',
    },
    region: process.env.S3_REGION || 'us-east-1',
    endpoint: process.env.S3_ENDPOINT || 'http://127.0.0.1:29000',
    forcePathStyle: true,
  },
})
