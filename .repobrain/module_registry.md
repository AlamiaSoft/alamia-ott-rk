# Module Registry — Alamia OTT / RK Portal

This registry lists all module domain areas across the codebase.

## Registered Modules

### 1. `docs_and_ai_knowledge`
- **Scope**: `.ai/`, `.agents/`, `docs/`, `scaffold_ai_knowledge.ps1`
- **Responsibility**: System architecture, PRD requirements, ADR records, coding standards, and AI workspace instructions.
- **Key Files**:
  - `docs/RK Portal MVP.md`
  - `docs/OSS Architecture Evaluation Report.md`
  - `.ai/permanent/architecture/01-system-architecture.md`

### 2. `repobrain_engine`
- **Scope**: `.repobrain/`, `AGENTS.md`, `CLAUDE.md`, `CONTEXT.md`
- **Responsibility**: RepoBrain workspace context, conventions, decision logs, routing map, and multi-IDE agent rules.
- **Key Files**:
  - `.repobrain/conventions.md`
  - `.repobrain/structure.md`
  - `.repobrain/map.md`

### 3. `infrastructure_and_docker`
- **Scope**: `docker-compose.yml`, `.env.example`, `docker/`
- **Responsibility**: Container orchestration for PostgreSQL, MinIO, Payload CMS, Next.js, and Caddy.
- **Key Files**:
  - `docker-compose.yml`
  - `.env.example`

### 4. `editorial_cms`
- **Scope**: `cms/`
- **Responsibility**: Payload CMS schema definitions (Articles, Videos, Authors, Categories, Tags, Users), admin interface, and PostgreSQL integration.

### 5. `video_pipeline`
- **Scope**: `workers/ffmpeg/`
- **Responsibility**: Direct upload ingestion, worker queue (RabbitMQ / Redis), FFmpeg HLS packaging (`.m3u8` / `.ts`), thumbnail extraction, metadata generation.

### 6. `web_frontend`
- **Scope**: `web/`
- **Responsibility**: Next.js public news portal, video viewing pages, HLS player (Video.js), user auth (Login/Register), and member paywall prompts.
