# Architectural Decision Log

This log records major design decisions and changes in the project timeline.

| Date | Decision Summary | Impact |
| :--- | :--- | :--- |
| **2026-07-28** | Initialized AI Knowledge Base (`.ai/`) & set AI Bootstrap order. | Grounded context for AI agents without initial codebase reverse engineering. |
| **2026-07-28** | Adopted Payload CMS + Custom FFmpeg Video Pipeline (ADR-0001). | Unified editorial CMS with decoupled HLS video processing. |
| **2026-07-28** | Setup RepoBrain workspace knowledge hub (`.repobrain/`). | Cross-IDE grounded repository context via RepoBrain CLI & `rb-ask`. |
| **2026-07-28** | Eliminated Caddy reverse proxy container in favor of direct Cloudflare Tunnel container routing. | Simplified stack footprint for Oracle VPS deployment (`cmm.alamiaai.com` & `cmmadmin.alamiaai.com`). |
| **2026-07-28** | Completed Sprint 0 Project Foundation scaffolding. | Portainer stack (`docker-compose.yml`), `cms/`, `web/`, and `workers/ffmpeg/` pushed to `main`. |
| **2026-07-28** | Adopted Payload 3.0 Next.js 15 App Router Architecture with Dual-Database (SQLite Dev / Postgres Prod). | Resolves ESM & React 19 compiler errors. Allows local dev with zero Postgres overhead and seamless VPS production. |
| **2026-07-29** | Adopted Headless Payload CMS 3 + `shadcn/ui` Editor Studio Architecture. | Decoupled Payload CMS 3 to act as pure headless REST API microservice; ported `shadcn/ui` Editor Studio into `web/` (`/dashboard`) for clean content management. |
