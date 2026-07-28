# Product Backlog & Definition of Done — RK Portal MVP

## 1. Prioritized Backlog

### P0 — Must Have (MVP Core Scope)
* [ ] Docker Stack (`docker-compose.yml` for PostgreSQL, MinIO, Payload CMS, Next.js, Caddy, Worker).
* [ ] Payload CMS schema initialization (Articles, Videos, Categories, Tags, Authors, Users).
* [ ] Video Upload UI (drag-and-drop upload, progress bar, metadata entry).
* [ ] Asynchronous FFmpeg Worker (HLS transcoding, duration extraction, thumbnail generation).
* [ ] Public Web Portal (Homepage, News Listing, Opinion Listing, Video Gallery, Article Reader, Video Viewer).
* [ ] HLS Video Player Integration (Video.js / hls.js with responsive video player UI).
* [ ] Authentication & Subscriber Paywall Simulation (Login, Register, JWT, protected routes, premium badges).
* [ ] Responsive UI for Desktop, Tablet, and Mobile screens.

### P1 — Should Have
* [ ] Full-text Content Search (Search across articles and videos).
* [ ] Featured Content Controls (Hero banner & curated homepage sections in CMS).
* [ ] Related Articles & Recommendations widget.
* [ ] Rich SEO metadata, OpenGraph tags, and sitemap generation.
* [ ] Author profiles page.

### P2 — Could Have
* [ ] User comments section.
* [ ] Push / Email notifications.
* [ ] AI transcription & automated closed captioning (VTT files via Whisper).
* [ ] Video playlists & watch later lists.

### P3 — Future Scope (Post-MVP Phase 2)
* [ ] Mobile Apps (React Native / Flutter).
* [ ] Smart TV Apps (Android TV, Apple TV, Fire TV).
* [ ] DRM (Digital Rights Management) integration.
* [ ] Live Stream Ingestion (RTMP / SRT -> HLS).
* [ ] Payment Gateway Integrations (JazzCash, EasyPaisa, NIFT ePay, Stripe).

---

## 2. Definition of Done (MVP Criteria)
The RK Portal MVP is considered **DONE** when all of the following conditions are met:
1. Editors can log into Payload CMS.
2. Editors can upload a raw video file with metadata.
3. Video is automatically transcoded into HLS playlists and thumbnails in the background.
4. Editors can publish news articles and embed transcoded videos into articles.
5. Homepage displays hero banners and real-time latest content.
6. Public visitors can browse news, opinion columns, and watch free HLS videos.
7. Subscriber-only content prompts unauthenticated users to log in / subscribe.
8. The entire infrastructure stack launches cleanly via Docker Compose.
