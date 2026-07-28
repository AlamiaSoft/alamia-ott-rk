# Repository Structure & File Map — Alamia OTT / RK Portal

## Top-Level Directory Layout

```
alamia-ott-rk/
├── .agents/                      # AI workspace instructions (AGENTS.md)
├── .ai/                          # AI Knowledge Base (permanent, transient, indexes, history)
│   ├── history/                  # Architecture sprint timelines
│   ├── indexes/                  # Concept mapping and dependency graphs
│   ├── lessons/                  # Operational knowledge & lessons learned
│   ├── permanent/                # Long-lived architecture, ADRs, glossary, standards
│   └── transient/                # Short-lived sprint state, handoffs, backlog
├── .repobrain/                   # RepoBrain dynamic knowledge hub
│   ├── decisions/                # ADR and decision logs
│   ├── memory/                   # Reports, findings, and task traces
│   ├── conventions.md            # Technology stack & coding conventions
│   ├── map.md                    # Module routing index
│   ├── module_registry.md        # Module responsibility summaries
│   ├── rules.md                  # Dynamic context guidelines
│   └── structure.md              # Repository structure map
├── docs/                         # Human product requirements & architecture evaluation reports
│   ├── OSS Architecture Evaluation Report.md
│   └── RK Portal MVP.md
├── .env.example                  # Environment configuration template
├── .gitignore                    # Version control ignore rules
├── AGENTS.md                     # Base AI workspace rules & RepoBrain instructions
├── CLAUDE.md                     # Claude Code workspace entry
├── CONTEXT.md                    # Workspace context overview
├── docker-compose.yml            # (Sprint 0) Docker container orchestration spec
├── scaffold_ai_knowledge.ps1     # AI knowledge scaffolding script
├── cms/                          # (Sprint 1) Payload CMS & PostgreSQL schemas
├── workers/                      # (Sprint 2) FFmpeg worker queue & HLS packaging
└── web/                          # (Sprint 3) Next.js public web portal & Video.js player
```

## Core Module Boundaries

| Component Module | Directory | Description & Responsibilities |
| :--- | :--- | :--- |
| **AI Knowledge Base** | `.ai/` & `.agents/` | Canonical architectural memory, sprint states, ADRs, and agent rules. |
| **RepoBrain Engine** | `.repobrain/` | Dynamic Q&A context hub, conventions, module registry, and decision logs. |
| **System Docs** | `docs/` | PRD requirements, success criteria, and OSS evaluation reports. |
| **Container Stack** | `docker-compose.yml` | Container definitions for PostgreSQL, MinIO, Payload CMS, Next.js, and Caddy. |
| **CMS Subsystem** | `cms/` | Payload CMS application & PostgreSQL schemas for Articles, Videos, Categories, Tags, Users. |
| **Video Processing** | `workers/ffmpeg/` | Asynchronous worker pool handling HLS transcoding, thumbnail extraction, metadata generation. |
| **Web Frontend** | `web/` | Next.js App Router application, Tailwind CSS, Video.js player, auth & paywall UI. |
