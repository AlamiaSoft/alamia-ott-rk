# Current Sprint State — Sprint 0: Portainer Stack & Cloudflare Tunnel Setup

## 1. Sprint Objective
**Sprint 0 Goal**: Create a Portainer-compatible `docker-compose.yml` and Caddy proxy configuration so the entire RK Portal MVP stack can be deployed on Oracle VPS via Portainer, accessible at `checkmatemedia.alamiaai.com`.

---

## 2. Active Deployment Plan
- **Target URL**: `checkmatemedia.alamiaai.com`
- **Cloudflare Tunnel Routing Target**: `http://rk_proxy:80`
- **Deployment Flow**: Portainer Stack $\rightarrow$ Git Repository (`docker-compose.yml`) $\rightarrow$ Live Test

---

## 3. Sprint 0 Deliverables
- [ ] `docker-compose.yml` (Portainer Stack definition for `rk_proxy`, `rk_db`, `rk_storage`, `rk_cms`, `rk_web`, `rk_worker`)
- [ ] `Caddyfile` (Reverse proxy routes for `/`, `/admin`, `/api`, `/media`)
- [ ] `cms/` (Payload CMS 3.0 + PostgreSQL adapter)
- [ ] `web/` (Next.js 14+ App Router + Tailwind CSS + Video.js)
- [ ] `workers/ffmpeg/` (FFmpeg transcoder worker)
