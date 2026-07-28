# Current Sprint State — Sprint 0: Project Foundation

## 1. Sprint Objective
**Sprint 0 Goal**: Establish a fully working containerized development environment so developers can spin up the entire RK Portal MVP stack with a single command.

---

## 2. Sprint Roadmap & Progression

| Sprint | Phase Name | Status | Key Deliverable |
| :--- | :--- | :---: | :--- |
| **Sprint 0** | **Project Foundation** | 🟢 **IN PROGRESS** | Docker Compose stack (PostgreSQL, MinIO, Payload CMS, Next.js, FFmpeg worker scaffolding) |
| **Sprint 1** | **CMS Foundation** | ⚪ Pending | Payload CMS schemas (Articles, Videos, Authors, Categories, Tags) & Admin UI |
| **Sprint 2** | **Video Pipeline** | ⚪ Pending | Upload service, MinIO integration, FFmpeg worker queue, HLS generation |
| **Sprint 3** | **Public Website** | ⚪ Pending | Next.js portal (Homepage, News, Opinion, Videos, Article view, HLS player) |
| **Sprint 4** | **Membership & Paywall** | ⚪ Pending | Auth (Login/Register), JWT tokens, subscriber middleware, premium badges |
| **Sprint 5** | **Polish & Demo Prep** | ⚪ Pending | SEO, loading states, Cloudflare setup, demo content population |

---

## 3. Sprint 0 Tasks Breakdown

- [x] Initialise AI Knowledge Base & repository structure (`.ai/`, `.agents/`)
- [ ] Create core `docker-compose.yml` environment
- [ ] Configure PostgreSQL database container
- [ ] Configure MinIO object storage container & bucket setup
- [ ] Initialize Payload CMS project (`cms/`)
- [ ] Initialize Next.js frontend project (`web/`)
- [ ] Scaffold FFmpeg video worker service (`workers/ffmpeg/`)
- [ ] Verify full stack initialization command (`docker compose up -d`)

---

## 4. Immediate Blockers & Open Items
* None. Ready to proceed with Sprint 0 environment setup.
