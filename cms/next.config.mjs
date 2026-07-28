import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: ['cmmadmin.alamiaai.com', 'localhost:4000'],
  },
};

export default withPayload(nextConfig);
