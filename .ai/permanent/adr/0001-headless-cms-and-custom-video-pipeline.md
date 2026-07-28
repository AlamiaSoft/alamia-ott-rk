# ADR-0001: Selection of Headless Payload CMS & Custom FFmpeg Video Pipeline

## Status
**ACCEPTED**

## Context & Problem Statement
The RK Platform is a modern hybrid digital media platform combining news publishing, opinion pieces, video OTT on-demand streaming, and membership paywalls (similar to BBC / Al Jazeera).

We evaluated standalone open-source video platforms (MediaCMS, PeerTube, AVideo, ClipBucket, Jellyfin) as well as best-of-breed headless architecture alternatives (Payload CMS + custom video pipeline vs Strapi 5).

## Decision Drivers
1. **Editorial-First Requirement**: Editors must publish articles, manage authors, organize categories, and embed videos into news articles. Standalone video tools like MediaCMS or PeerTube lack article CMS functionality.
2. **Streaming Flexibility & Security**: Need clean REST/GraphQL APIs, HLS packaging, MinIO/R2 object storage, signed URLs, and custom paywall logic (JazzCash, EasyPaisa, Stripe simulation).
3. **Developer Experience**: Modern TypeScript ecosystem (Next.js, Payload CMS) allowing rapid development and future mobile/TV app expansion.

## Decision
We choose **Payload CMS + PostgreSQL** for unified content management paired with a **Custom FFmpeg Video Processing Pipeline** (Upload Service -> MinIO -> FFmpeg HLS Transcoder).

## Options Evaluated

1. **Payload CMS + Custom FFmpeg Pipeline (Selected)**: Score 19/20. Unified editorial control, optimal DX, complete paywall flexibility.
2. **MediaCMS**: Score 17/20. Great video engine, but missing article CMS entirely.
3. **PeerTube**: Score 15/20. Excellent streaming, but zero editorial features and unnecessary P2P federation bloat.
4. **Jellyfin**: Rejected. Designed for home media server libraries, wrong product fit.

## Consequences
* **Positive**: Single administrative interface for editors (articles + video metadata). Clean separation of concerns. Scalable to Cloudflare R2 and CDN.
* **Negative**: Requires maintaining a lightweight background video transcoding worker service (FFmpeg + HLS).
