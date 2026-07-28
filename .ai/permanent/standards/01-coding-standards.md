# Coding Standards & Engineering Invariants — Alamia OTT / RK Portal

## 1. Core Engineering Principles

### 1.1. Docker-First Containerization
* All application components (Payload CMS, PostgreSQL, MinIO, Next.js frontend, FFmpeg workers, Caddy proxy) MUST be containerized using **Docker** and orchestrated via `docker-compose.yml`.
* Developers must be able to spin up the complete local environment with a single command (`docker compose up -d`).
* Never rely on locally installed binary dependencies (e.g. system-level ffmpeg or postgres) outside of container environments.

### 1.2. API-First Architecture
* The frontend application MUST NOT directly couple with backend database drivers.
* All data exchange between the Next.js frontend and Payload CMS / Video Upload Service MUST occur over clean **REST** or **GraphQL** contracts.
* Shared TypeScript types MUST be derived from Payload CMS schema definitions.

---

## 2. Code Quality & Conventions

### 2.1. TypeScript & JavaScript Standards
* Use **strict TypeScript mode** across all codebase directories (`web/`, `cms/`, `workers/`).
* Avoid using `any`; define explicit interfaces/types for API request payloads, database collections, and component props.
* Asynchronous operations must use `async/await` rather than unhandled promise chains.

### 2.2. Design System & Frontend Standards
* **Framework**: Next.js (App Router) with Tailwind CSS / Vanilla CSS modules.
* **Aesthetics**: Premium, modern digital news outlet theme (dark mode options, rich color palettes, smooth hover transitions, typography via Google Fonts like Inter/Outfit).
* **Components**: Responsive grid layouts for news cards, video preview cards, author bio sections, hero banners, and adaptive video player containers.
* **Media Loading**: Images must use Next.js `Image` component with explicit dimensions or fill attributes to prevent layout shifts (CLS).

### 2.3. Asynchronous Transcoding Worker Conventions
* FFmpeg worker tasks must be idempotent: running a job twice on the same raw file must yield identical HLS playlist outputs or overwrite cleanly.
* Output HLS directory structure:
  ```
  hls-media/<video-id>/
  ├── playlist.m3u8
  ├── segment_000.ts
  ├── segment_001.ts
  └── thumbnail.jpg
  ```
* Transcoder failures must explicitly log stdout/stderr to task context and update video metadata status in Payload CMS to `FAILED`.

---

## 3. Security & Access Control Invariants

### 3.1. Secrets & Configuration
* NEVER commit `.env` files, API keys, database credentials, or secret keys to version control.
* Provide an `.env.example` file documenting all required environment variables for development.

### 3.2. Authentication & Paywall Protection
* Authenticated routes and subscriber-only media access MUST be verified using JWT bearer tokens.
* Video URLs for `MEMBER_ONLY` content MUST be generated via short-lived signed URLs or token authorization middleware (Cloudflare R2 signed URL or Caddy token auth).
