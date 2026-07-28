# AI Knowledge Base Master Index

Welcome to the canonical AI knowledge base for this project. This system is designed to minimize context loss and preserve architectural intent.

## The AI Bootstrap Read Order
If you are an AI Agent entering a fresh conversation, you **must** read the following documents in order before inspecting the source code:

1. `00-project-overview.md` (You are here: `README.md`)
2. `transient/sprint/00-current-state.md`
3. `permanent/architecture/01-system-architecture.md`
4. `indexes/repository.md`
5. `permanent/standards/01-coding-standards.md`

---

## Directory Structure

### Permanent Knowledge (Lives for Years)
* **`permanent/architecture/`**: High-level design intent, tradeoffs, component boundaries, and failure modes.
* **`permanent/adr/`**: Architecture Decision Records. Contains `README.md` index of accepted, rejected, and deprecated decisions.
* **`permanent/glossary/`**: The single source of truth for project terminology.
* **`permanent/standards/`**: Coding conventions, API standards, and security invariants.

### Transient Knowledge (Lives for Days)
* **`transient/sprint/`**: The current sprint's focus, deliverables, and objectives.
* **`transient/handoffs/`**: Session handoffs summarizing immediate deltas between chats.
* **`transient/backlog/`**: Prioritized product backlog (P0-P3) and Definition of Done.
* **`transient/repository-health.md`**: Tracking architecture drift and documentation coverage.

### History & Meta
* **`history/`**: Architecture timeline. Records additions and sprint progress.
* **`indexes/`**: 
  * `repository.md`: Maps high-level architecture concepts to source code paths.
  * `dependency-map.md`: Mermaid graph of system components and data flow.
* **`lessons/`**: Operational knowledge, debugging outcomes, and failed experiments.
