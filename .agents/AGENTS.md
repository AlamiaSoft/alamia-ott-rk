# AI Workspace Instructions (AGENTS.md)

This file contains the foundational rules for all AI agents working in this repository. It is automatically injected into the context of every new conversation.

## 1. The AI Bootstrap Sequence
If you are entering a fresh conversation and do not have full context of this project, you **MUST NOT** immediately inspect the source code or reverse engineer the repository. 

Instead, you must strictly follow this read order:
1. Read .ai/README.md (Master Index)
2. Read .ai/transient/sprint/00-current-state.md
3. Read .ai/permanent/architecture/01-system-architecture.md
4. Read .ai/indexes/repository.md to map concepts to code.
5. Only then may you inspect the source code.

## 2. Documentation Ownership (Knowledge Manager)
- The documentation in .ai/ is strictly maintained by the **Knowledge Manager** agent. 
- If you (the Developer agent) modify the architecture, database models, workflows, or APIs, you must either update the docs yourself, or delegate to the Knowledge Manager.
- Never summarize source code in documentation. Document *intent, invariants, tradeoffs, and failure modes*.

## 3. End-of-Session RepoBrain Handoff & Refresh Workflow
At the end of every task or session prior to handing off to the user, AI agents **MUST** execute the following RepoBrain refresh sequence:
1. **Update Transient Sprint State**: Document completed tasks and next-session objectives in `.ai/transient/sprint/00-current-state.md`.
2. **Record Architecture Decisions**: Log major ADRs in `.repobrain/decisions/log.md`.
3. **Execute RepoBrain Memory Capture**: Run `npx --yes repobrain@latest extract-commit` to extract durable lessons from git history into `.brain/`.
4. **Push Knowledge Base**: Commit and push `.ai/`, `.repobrain/`, and `.brain/` to GitHub `main` branch.
