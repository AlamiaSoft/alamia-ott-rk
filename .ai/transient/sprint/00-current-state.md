# Current Sprint State — Sprint 0: Portainer Stack & Infrastructure Foundation

## 1. Sprint Objective
**Sprint 0 Goal**: Create a Portainer-compatible `docker-compose.yml` and container applications (`cms`, `web`, `workers/ffmpeg`) so the entire RK Portal MVP stack can be deployed on Oracle VPS via Portainer, accessible at `cmm.alamiaai.com` (web:3000) & `cmmadmin.alamiaai.com` (cms:4000).

---

## 2. Sprint Roadmap & Progression

| Sprint | Phase Name | Status | Key Deliverable |
| :--- | :--- | :---: | :--- |
| **Sprint 0** | **Project Foundation** | 🟢 **COMPLETED** | Portainer Stack (`docker-compose.yml`), Postgres, MinIO, Payload CMS 3 (Next 15), Next.js Web, FFmpeg worker |
| **Sprint 1** | **v0-app Evaluation & CMS Integration** | 🟡 **NEXT SESSION** | Evaluate `v0-app` frontend components, connect to Payload 3 CMS collections & APIs |
| **Sprint 2** | **Video Pipeline** | ⚪ Pending | Direct uploader, MinIO bucket integration, FFmpeg worker queue, HLS transcoding |
| **Sprint 3** | **Public Website** | ⚪ Pending | Next.js portal pages (Homepage, News, Videos, Article view, HLS player) |
| **Sprint 4** | **Membership & Paywall** | ⚪ Pending | Auth (Login/Register), JWT tokens, subscriber middleware, premium badges |
| **Sprint 5** | **Polish & Demo Prep** | ⚪ Pending | Cloudflare Tunnel verification, SEO metadata, demo content population |

---

## 3. Sprint 0 Completed Milestones

- [x] Initialise AI Knowledge Base & repository structure (`.ai/`, `.agents/`, `.repobrain/`)
- [x] Create Portainer `docker-compose.yml` stack specification (`rk_db`, `rk_storage`, `rk_cms`, `rk_web`, `rk_worker`) attached to external `alamia-network`
- [x] Migrate Payload CMS 3.0 to native **Next.js 15 + React 19 App Router Architecture** matching official [`blank` template](https://github.com/payloadcms/payload/tree/main/templates/blank)
- [x] Configure dual-database architecture in `cms/src/payload.config.ts`: **SQLite** (`payload.db` file) for local dev without PostgreSQL, and **PostgreSQL** (`DATABASE_URI`) for production VPS
- [x] Create custom **Alamia Dark Theme Design System** in `cms/src/app/(payload)/custom.css` (Outfit font, Crimson accent `#e50914`, micro-animations, styled scrollbars)
- [x] Generate component import map (`cms/src/app/(payload)/admin/importMap.js`) and verify local execution (`http://localhost:4000/admin` $\rightarrow$ 200 OK)
- [x] Note `v0-app` created by user for evaluation and integration in Next Session
- [x] Push all fixes and features to GitHub `main` branch (`a221b9f`, `e23998f`)
