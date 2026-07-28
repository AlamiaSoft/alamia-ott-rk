# Current Sprint State — Sprint 0: Portainer Stack & Infrastructure Foundation

## 1. Sprint Objective
**Sprint 0 Goal**: Create a Portainer-compatible `docker-compose.yml` and container applications (`cms`, `web`, `workers/ffmpeg`) so the entire RK Portal MVP stack can be deployed on Oracle VPS via Portainer, accessible at `checkmatemedia.alamiaai.com`.

---

## 2. Sprint Roadmap & Progression

| Sprint | Phase Name | Status | Key Deliverable |
| :--- | :--- | :---: | :--- |
| **Sprint 0** | **Project Foundation** | 🟢 **COMPLETED** | Portainer Stack specification (`docker-compose.yml`), PostgreSQL, MinIO, Payload CMS, Next.js, FFmpeg worker |
| **Sprint 1** | **CMS Foundation** | 🟡 **NEXT** | Payload CMS collections (Articles, Videos, Categories, Users) & Admin interface |
| **Sprint 2** | **Video Pipeline** | ⚪ Pending | Direct uploader, MinIO bucket integration, FFmpeg worker queue, HLS transcoding |
| **Sprint 3** | **Public Website** | ⚪ Pending | Next.js portal pages (Homepage, News, Videos, Article view, HLS player) |
| **Sprint 4** | **Membership & Paywall** | ⚪ Pending | Auth (Login/Register), JWT tokens, subscriber middleware, premium badges |
| **Sprint 5** | **Polish & Demo Prep** | ⚪ Pending | Cloudflare Tunnel verification, SEO metadata, demo content population |

---

## 3. Sprint 0 Tasks Breakdown

- [x] Initialise AI Knowledge Base & repository structure (`.ai/`, `.agents/`, `.repobrain/`)
- [x] Create Portainer `docker-compose.yml` stack specification (`rk_db`, `rk_storage`, `rk_cms`, `rk_web`, `rk_worker`)
- [x] Scaffold Payload CMS application (`cms/` with `@payloadcms/db-postgres`)
- [x] Scaffold Next.js 14+ App Router web portal (`web/` with Tailwind CSS & Video.js)
- [x] Scaffold FFmpeg video transcoder worker service (`workers/ffmpeg/` with Alpine FFmpeg binaries)
- [x] Configure Cloudflare Tunnel direct routing parameters (`checkmatemedia.alamiaai.com` $\rightarrow$ `http://rk_web:3000` & `http://rk_cms:4000`)
- [x] Push Sprint 0 codebase to `main` branch
