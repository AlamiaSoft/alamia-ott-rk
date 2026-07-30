# System Architecture — Alamia OTT / RK Portal

## 1. Executive Intent & Deployment Architecture
**Alamia OTT / RK Portal** is a production-grade **hybrid News + Video (OTT) platform** inspired by modern digital media houses such as the BBC, Al Jazeera, DW, and TRT World.

### Environment Topology
* **Production / Staging**: Oracle VPS (A1 Flex) running Docker + Portainer.
* **Primary Dev Machine**: Low-end laptop (No local Docker; uses SQLite for local testing).
* **Secondary Dev Machine**: High-end workstation (`Hostname: DESKTOP-5...`) with full Docker/Container support.

### Production Infrastructure Model
* **Hosting Platform**: Oracle VPS (A1 Flex) running Docker + Portainer.
* **Network Integration**: Attached to existing external Docker network **`alamia-network`**.
* **Ingress Domains**:
  * **Public Web Portal**: `cmm.alamiaai.com` $\rightarrow$ `http://rk_web:3000`
  * **CMS Admin Dashboard**: `cmmadmin.alamiaai.com` $\rightarrow$ `http://rk_cms:4000`
* **Custom Non-Standard Ports**: Host ports `23000`, `24000`, `29000`, `29001` exposed as secondary fallbacks.

---

## 2. Container Topology & Port Allocation

| Service Name | Container Name | Internal Port | Docker Network | Host Port | Cloudflare Tunnel Target | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`rk_web`** | `rk_web` | `3000` | `alamia-network` | `23000` | `cmm.alamiaai.com` $\rightarrow$ `http://rk_web:3000` | Next.js App Router public website & Video.js player. |
| **`rk_cms`** | `rk_cms` | `4000` | `alamia-network` | `24000` | `cmmadmin.alamiaai.com` $\rightarrow$ `http://rk_cms:4000` | Payload CMS administrative backend & APIs. |
| **`rk_storage`** | `rk_storage` | `9000`/`9001` | `alamia-network` | `29000` / `29001` | S3 Media Storage | MinIO S3 object storage for raw uploads & HLS streams. |
| **`rk_db`** | `rk_db` | `5432` | `alamia-network` | Internal | Internal | PostgreSQL 16 database. |
| **`rk_worker`** | `rk_worker` | Internal | `alamia-network` | Internal | Internal | Background FFmpeg HLS transcoding worker. |
