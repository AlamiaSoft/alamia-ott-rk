# Repository Concept Map

This document maps high-level system concepts and architectural components to their corresponding directories, configuration files, and Architecture Decision Records (ADRs).

## 1. Concept to Code Mapping

| Architectural Concept | Path / Directory | Description / Responsibilities | Relevant ADR / Docs |
| :--- | :--- | :--- | :--- |
| **System Documentation** | `docs/` | Original PRD, product specifications, and OSS architecture evaluation. | [RK Portal MVP.md](file:///d:/MyApps/alamia-ott-rk/docs/RK%20Portal%20MVP.md), [OSS Architecture Evaluation Report.md](file:///d:/MyApps/alamia-ott-rk/docs/OSS%20Architecture%20Evaluation%20Report.md) |
| **AI Knowledge Base** | `.ai/` | Canonical AI memory: system architecture, coding standards, ADRs, sprint state, and backlog. | [.ai/README.md](file:///d:/MyApps/alamia-ott-rk/.ai/README.md) |
| **AI Rules & Instructions** | `.agents/AGENTS.md` | Workspace instructions and AI bootstrap sequence. | [AGENTS.md](file:///d:/MyApps/alamia-ott-rk/.agents/AGENTS.md) |
| **AI System Scaffolder** | `scaffold_ai_knowledge.ps1` | PowerShell initialization script for AI memory directory structure. | [scaffold_ai_knowledge.ps1](file:///d:/MyApps/alamia-ott-rk/scaffold_ai_knowledge.ps1) |
| **Container Infrastructure (Planned)** | `docker-compose.yml` / `docker/` | Docker container definitions for PostgreSQL, MinIO, Payload CMS, Next.js, and Caddy. | [ADR-0001](file:///d:/MyApps/alamia-ott-rk/.ai/permanent/adr/0001-headless-cms-and-custom-video-pipeline.md) |
| **Editorial CMS (Planned)** | `cms/` or `apps/cms/` | Payload CMS application (collections for Articles, Videos, Authors, Categories, Users). | [01-system-architecture.md](file:///d:/MyApps/alamia-ott-rk/.ai/permanent/architecture/01-system-architecture.md) |
| **Public Web Portal (Planned)** | `web/` or `apps/web/` | Next.js App Router application (homepage, article reading, video player, search, auth). | [01-system-architecture.md](file:///d:/MyApps/alamia-ott-rk/.ai/permanent/architecture/01-system-architecture.md) |
| **Video Transcoder Worker (Planned)** | `workers/ffmpeg/` | FFmpeg worker script and job queue listener for HLS packaging and thumbnail extraction. | [01-system-architecture.md](file:///d:/MyApps/alamia-ott-rk/.ai/permanent/architecture/01-system-architecture.md) |

---

## 2. Directory Taxonomy & Planned Project Layout

```
alamia-ott-rk/
├── .agents/                      # AI workspace instructions (AGENTS.md)
├── .ai/                          # AI Knowledge Base (permanent, transient, indexes, history)
│   ├── history/                  # Architecture sprint timelines
│   ├── indexes/                  # Concept mapping and dependency graphs
│   ├── lessons/                  # Operational knowledge & lessons learned
│   ├── permanent/                # Long-lived architecture, ADRs, glossary, standards
│   └── transient/                # Short-lived sprint state, handoffs, backlog
├── docs/                         # Human product requirements & architecture evaluation reports
│   ├── OSS Architecture Evaluation Report.md
│   └── RK Portal MVP.md
├── scaffold_ai_knowledge.ps1     # AI knowledge scaffolding script
├── docker-compose.yml            # (Sprint 0) Container orchestration spec
├── cms/                          # (Sprint 1) Payload CMS & PostgreSQL schemas
├── workers/                      # (Sprint 2) FFmpeg worker queue & HLS packaging
└── web/                          # (Sprint 3) Next.js public web portal & Video.js player
```
