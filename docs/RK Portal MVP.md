# **RK Portal MVP**

## **Product Requirements Document (PRD)**

**Project:** RK Portal MVP  
**Purpose:** Demonstrate a production-grade hybrid News \+ Video platform for stakeholder approval.

---

# **1\. Objective**

Build a working MVP that demonstrates a modern digital media platform similar to BBC or Al Jazeera where editors can:

* Publish news articles  
* Upload videos  
* Embed videos inside articles  
* Organise content  
* Restrict premium content  
* Showcase a scalable architecture

This is **not** the final production platform. It is a high-quality MVP intended to validate product direction.

---

# **2\. Success Criteria**

At the meeting, RK should be able to see:

✓ Modern homepage

✓ News section

✓ Opinion section

✓ Video section

✓ Video player

✓ Admin dashboard

✓ Uploading a video

✓ Publishing an article

✓ Embedded video inside article

✓ Featured homepage content

✓ Free vs Subscriber content

---

# **3\. Functional Requirements**

## **Editorial CMS**

* Authentication  
* Roles  
  * Admin  
  * Editor  
* Categories  
* Tags  
* Authors  
* Rich text editor  
* Draft  
* Publish  
* Scheduled publishing (optional)

---

## **Video Management**

* Drag & Drop upload  
* Progress indicator  
* Metadata  
* Thumbnail  
* Duration  
* Categories  
* Featured flag

---

## **Video Processing**

Automatic:

* FFmpeg  
* HLS generation  
* Thumbnail generation

Future:

* DASH  
* Subtitle generation  
* AI transcription

---

## **Public Website**

Pages:

* Home  
* News  
* Opinion  
* Videos  
* Search  
* Article  
* Video  
* Login

---

## **Membership**

MVP:

* Guest  
* Subscriber

Content Visibility

FREE

MEMBER ONLY

Premium content should prompt login.

---

# **4\. Non-Functional Requirements**

* Docker-first  
* Portainer deployment  
* API-first  
* Responsive  
* Cloudflare-ready  
* Future mobile apps  
* Future TV apps

---

# **5\. Proposed Technology Stack**

Frontend

* Next.js  
* Tailwind CSS

CMS

* Payload CMS

Database

* PostgreSQL

Storage

* MinIO

Video

* FFmpeg  
* HLS

Player

* Video.js

Reverse Proxy

* Caddy

Infrastructure

* Docker  
* Portainer  
* Cloudflare Tunnel

---

# **6\. Out of Scope**

* Mobile apps  
* TV apps  
* Live streaming  
* AI recommendations  
* Payment gateways  
* DRM

These will be Phase 2\.

---

# **Sprint Plan**

## **Sprint 0 — Project Foundation**

Goal:  
Working development environment.

Tasks

* Initialise repository  
* Docker Compose  
* Portainer stack  
* PostgreSQL  
* MinIO  
* Payload CMS  
* Next.js  
* FFmpeg worker  
* Environment configuration  
* GitHub Actions (optional)

Deliverable

Developers can run the entire stack with one command.

---

## **Sprint 1 — CMS Foundation**

Goal

Editors can manage content.

Tasks

* Authentication  
* Roles  
* Categories  
* Tags  
* Authors  
* Articles collection  
* Videos collection  
* Homepage configuration  
* Rich editor

Deliverable

CMS operational.

---

## **Sprint 2 — Video Pipeline**

Goal

Editors upload videos.

Tasks

* Upload endpoint  
* MinIO integration  
* Queue  
* FFmpeg automation  
* HLS generation  
* Thumbnail generation  
* Metadata extraction

Deliverable

Playable HLS video.

---

## **Sprint 3 — Public Website**

Goal

Public portal.

Tasks

Homepage

News listing

Opinion listing

Video listing

Article page

Video page

Search

Responsive navigation

Footer

Deliverable

Complete website.

---

## **Sprint 4 — Membership**

Goal

Protected content.

Tasks

Login

Register

JWT

Protected routes

Subscriber middleware

Premium badges

Deliverable

Working paywall simulation.

---

## **Sprint 5 — Polish**

Goal

Demo-ready system.

Tasks

SEO

Loading states

404 page

Analytics

Featured content

Hero banner

Optimise images

Cloudflare configuration

Deliverable

Meeting-ready MVP.

---

# **Development DAG**

Sprint 0

Infrastructure

↓

Sprint 1

CMS

↓

Sprint 2

Video Upload

↓

FFmpeg

↓

HLS

↓

Storage

↓

Sprint 3

Frontend

↓

Sprint 4

Authentication

↓

Subscriber Logic

↓

Sprint 5

Optimisation

↓

Demo

---

# **Product Backlog (Prioritised)**

P0 (Must Have)

* Docker stack  
* Payload CMS  
* PostgreSQL  
* MinIO  
* Video upload  
* FFmpeg  
* Homepage  
* Articles  
* Videos  
* Authentication  
* Responsive UI

---

P1 (Should Have)

* Search  
* Featured content  
* Related articles  
* Rich SEO  
* Author profiles

---

P2 (Could Have)

* Comments  
* Notifications  
* AI transcription  
* AI summaries  
* Playlists

---

P3 (Future)

* Mobile apps  
* TV apps  
* DRM  
* Live streaming  
* Podcasts  
* Recommendation engine  
* Payment gateway integration  
* Analytics dashboard

---

# **Risks**

| Risk | Mitigation |
| ----- | ----- |
| Video transcoding complexity | Keep single HLS profile for MVP |
| Scope creep | Freeze MVP scope after Sprint 0 |
| UI delays | Use a professional admin theme and minimal customisation |
| Payment integration | Simulate subscriber status only |
| Performance | Optimise after feature completion |

---

# **Definition of Done**

The MVP is complete when:

* Editors can log in.  
* Editors can upload a video.  
* Video is automatically transcoded.  
* Editors can publish an article.  
* Articles can embed videos.  
* Homepage displays latest content.  
* Visitors can browse and watch free videos.  
* Subscriber-only content is protected.  
* Entire stack deploys through Docker/Portainer.  
* Demo runs reliably on the target VPS.

---

# **Recommended Build Order for Antigravity IDE**

1. Infrastructure  
2. CMS Schema  
3. Authentication  
4. Storage  
5. Upload Service  
6. FFmpeg Worker  
7. Public API  
8. Frontend  
9. Membership  
10. Optimisation  
11. Demo Content  
12. Final QA

