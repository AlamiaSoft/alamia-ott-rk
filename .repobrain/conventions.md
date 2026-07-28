# Project Conventions — Alamia OTT / RK Portal

## Language & Framework
- **Frontend**: Next.js (App Router), TypeScript (Strict mode), Tailwind CSS / Vanilla CSS modules.
- **Content Management**: Payload CMS (TypeScript), PostgreSQL.
- **Object Storage**: MinIO (development), Cloudflare R2 (production).
- **Video Pipeline**: FFmpeg HLS Transcoder worker pool, RabbitMQ / Redis task queue.
- **Ingress Gateway**: Caddy / Cloudflare Tunnel.

## Code Style
- **API-First**: Frontend strictly consumes backend REST / GraphQL endpoints.
- **Strict Typing**: All API request/response objects, CMS collections, and component props must be explicitly typed.
- **UI Aesthetics**: Modern digital news outlet theme, dark mode support, smooth micro-animations, responsive layout.

## Testing & Containerization
- **Docker-First**: All services run in Docker Compose (`docker compose up -d`).
- **Transcoding Output**: HLS packaging (`playlist.m3u8` with target segment duration 4-6s) + thumbnail keyframe extraction.

## Architecture
- **BBC Model**: Editorial-first hybrid news and video platform (articles, opinion columns, HLS video streams).
- **Paywall & Auth**: JWT authorization, role-based access (Admin, Editor, Subscriber, Guest), short-lived signed media URLs.
