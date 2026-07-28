# AI Workspace Instructions (AGENTS.md)

This file contains foundational workspace rules and knowledge routing for AI agents working in this repository.

## 1. The AI Bootstrap Sequence
If you are entering a fresh conversation and do not have full context of this project, follow this read order:
1. Read [.ai/README.md](file:///d:/MyApps/alamia-ott-rk/.ai/README.md) (Master Index)
2. Read [.ai/transient/sprint/00-current-state.md](file:///d:/MyApps/alamia-ott-rk/.ai/transient/sprint/00-current-state.md) (Current Sprint Focus)
3. Read [.ai/permanent/architecture/01-system-architecture.md](file:///d:/MyApps/alamia-ott-rk/.ai/permanent/architecture/01-system-architecture.md) (System Architecture)
4. Read [.ai/indexes/repository.md](file:///d:/MyApps/alamia-ott-rk/.ai/indexes/repository.md) (Concept & Code Map)

---

## 2. RepoBrain Knowledge Layer (Standalone / Static Mode)

This repository uses **RepoBrain** in **Standalone Static Mode**. AI agents read grounded context directly from the `.repobrain/` directory:

- [.repobrain/conventions.md](file:///d:/MyApps/alamia-ott-rk/.repobrain/conventions.md) — Tech stack, frameworks, coding conventions, and standards.
- [.repobrain/structure.md](file:///d:/MyApps/alamia-ott-rk/.repobrain/structure.md) — File tree, directory layouts, and module boundaries.
- [.repobrain/module_registry.md](file:///d:/MyApps/alamia-ott-rk/.repobrain/module_registry.md) — Subsystem module responsibilities.
- [.repobrain/map.md](file:///d:/MyApps/alamia-ott-rk/.repobrain/map.md) — Module keyword and routing map.
- [.repobrain/decisions/log.md](file:///d:/MyApps/alamia-ott-rk/.repobrain/decisions/log.md) — Architecture decision records (ADRs).
- [.repobrain/rules.md](file:///d:/MyApps/alamia-ott-rk/.repobrain/rules.md) — Dynamic context guidelines.

---

## 3. Documentation Ownership & Rules
- Maintain `.ai/` documentation integrity. Never delete architectural intent, invariants, or failure modes.
- Keep codebase modifications aligned with the **BBC Model** hybrid OTT & News platform requirements in `docs/`.
