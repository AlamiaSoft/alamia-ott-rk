# System Architecture — Alamia OTT / RK Portal

## 1. Executive Intent & Deployment Architecture
**Alamia OTT / RK Portal** is a production-grade **hybrid News + Video (OTT) platform** inspired by modern digital media houses such as the BBC, Al Jazeera, DW, and TRT World.

### Production Infrastructure Model
* **Hosting Platform**: Oracle VPS running Docker + Portainer.
* **Ingress & Domain Gateway**: Cloudflare Tunnel routing traffic directly to host ports or container network names (`http://rk_web:3000` / `http://localhost:23000`).
* **Custom Non-Standard Ports**: Host ports configured in the high `20000+` range to prevent any port collisions with other existing VPS workloads.

---

## 2. Container Topology & Port Allocation

| Service Name | Container Name | Internal Port | Host Port | Cloudflare Tunnel Target | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`rk_web`** | `rk_web` | `3000` | **`23000`** | `checkmatemedia.alamiaai.com` $\rightarrow$ `http://rk_web:3000` (or `http://localhost:23000`) | Next.js App Router public website & Video.js player. |
| **`rk_cms`** | `rk_cms` | `4000` | **`24000`** | `checkmatemedia.alamiaai.com/admin*` $\rightarrow$ `http://rk_cms:4000` (or `http://localhost:24000`) | Payload CMS administrative backend & APIs. |
| **`rk_storage`** | `rk_storage` | `9000`/`9001` | **`29000`** / **`29001`** | `checkmatemedia.alamiaai.com/media*` $\rightarrow$ `http://rk_storage:9000` (or `http://localhost:29000`) | MinIO S3 object storage for raw uploads & HLS streams. |
| **`rk_db`** | `rk_db` | `5432` | Internal | Internal | PostgreSQL 16 database. |
| **`rk_worker`** | `rk_worker` | Internal | Internal | Internal | Background FFmpeg HLS transcoding worker. |
