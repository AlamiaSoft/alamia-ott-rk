# Project Conventions — Alamia OTT / RK Portal

## Deployment Infrastructure
- **Hosting Target**: Oracle VPS running Docker + Portainer.
- **Ingress & Domain**: Cloudflare Tunnel mapping `checkmatemedia.alamiaai.com` to `http://rk_proxy:80`.
- **Deployment Method**: Portainer Stack creation pulling directly from GitHub (`docker-compose.yml`).

## Subsystem Stack
- **Frontend**: Next.js (App Router), TypeScript (Strict mode), Tailwind CSS.
- **CMS**: Payload CMS (TypeScript) + PostgreSQL 16.
- **Storage**: MinIO S3 object storage (buckets: `raw-uploads`, `hls-media`).
- **Transcoder**: FFmpeg worker pool (HLS `.m3u8` playlist + `.ts` segment generation).
- **Proxy**: Caddy (`rk_proxy`) routing `/` to `web:3000`, `/admin` to `cms:4000`, `/media` to `storage:9000`.
