# Project Glossary — Alamia OTT / RK Portal

| Term | Definition | Context / Usage |
| :--- | :--- | :--- |
| **Payload CMS** | A headless CMS built with Next.js and TypeScript, used as the primary content management control plane. | Manages Articles, Videos, Authors, Categories, Tags, and Users. |
| **HLS (HTTP Live Streaming)** | An HTTP-based adaptive bitrate streaming communications protocol developed by Apple. | Raw uploaded videos are transcoded into HLS playlists (`.m3u8`) and media segments (`.ts`). |
| **MinIO** | High-performance, S3-compatible object storage server. | Used in local development for storing raw video uploads, HLS chunks, and image assets. |
| **Cloudflare R2** | S3-compatible cloud object storage with zero egress fees. | Target storage system for production deployment. |
| **Caddy** | Modern, fast open-source web server and reverse proxy with automatic HTTPS capabilities. | Used as ingress gateway routing traffic between web frontend, CMS, and media storage. |
| **FFmpeg** | Command-line tool for transcoding, packaging, and processing video/audio files. | Used in the background worker pipeline for HLS generation, thumbnail extraction, and duration metadata. |
| **Signed URLs** | Short-lived cryptographically signed URLs that grant temporary read access to private storage objects. | Used to protect `MEMBER_ONLY` video streams from unauthorized direct downloading. |
| **Paywall** | Access control gate that restricts premium content (`MEMBER_ONLY`) to authenticated subscribers. | MVP simulates subscriber authentication and content access gates. |
| **BBC Model** | Hybrid digital media publishing paradigm where news articles, opinion columns, and embedded OTT video streams share a unified content platform. | Core architectural vision for RK Portal. |
