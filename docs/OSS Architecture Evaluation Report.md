# **OSS Architecture Evaluation Report**

## **RK Platform (Hybrid OTT \+ News \+ Editorial Platform)**

Your requirements are **closer to BBC, Al Jazeera, DW, The Wire, or TRT World** than they are to Netflix or YouTube.

That distinction changes the recommendation significantly.

The platform is primarily:

* Editorial-first  
* Video-enhanced  
* Subscription-enabled  
* Secure streaming  
* API-driven  
* Future mobile/TV ready

It is **not** primarily a social video sharing site.

---

# **Executive Summary**

| Candidate | Verdict |
| ----- | ----- |
| Headless CMS \+ Video Pipeline | ⭐⭐⭐⭐⭐ Best overall |
| MediaCMS | ⭐⭐⭐⭐ Good turnkey option |
| PeerTube | ⭐⭐⭐ Good video platform but weak editorial |
| AVideo | ⭐⭐ Feature rich but aging architecture |
| ClipBucket | ⭐ Legacy choice |
| Jellyfin | ❌ Wrong product |

---

# **A. Standalone OSS Platform Evaluation**

## **1\. MediaCMS ⭐⭐⭐⭐**

**![Image][image1]**

**![Image][image2]**

**![Image][image3]**

### **Stack**

* Django  
* Python  
* React  
* PostgreSQL  
* FFmpeg  
* Celery  
* Docker

Very actively maintained.

Modern architecture.

Excellent code quality.

---

### **Native Features**

✅ Drag-drop uploads

✅ Background transcoding

✅ FFmpeg

✅ Multiple resolutions

✅ HLS

✅ Metadata

✅ Categories

✅ User roles

---

### **Missing**

❌ News CMS

No article publishing.

Needs integration with another CMS.

---

### **Monetization**

No subscriptions.

Must integrate:

* JazzCash  
* EasyPaisa  
* Stripe  
* NIFT

through custom middleware.

Very feasible because Django REST APIs are clean.

---

### **Pros**

* Modern stack  
* Docker  
* Nice UI  
* Good uploader  
* Proper transcoding  
* API

---

### **Cons**

* No editorial publishing  
* No paywall  
* No OTT apps

---

## **2\. PeerTube ⭐⭐⭐**

**![Image][image4]**

**![Image][image5]**

**![Image][image6]**

**![Image][image7]**

**![Image][image8]**

**![Image][image9]**

### **Stack**

* NodeJS  
* TypeScript  
* PostgreSQL

One of the healthiest OSS video projects today with frequent development and an active community. ([OpenAltFinder](https://openaltfinder.com/compare/owncast-vs-peertube?utm_source=chatgpt.com))

---

### **Native Features**

Excellent:

* uploads  
* HLS  
* transcoding  
* live streaming  
* playlists  
* channels  
* embeds

---

### **Editorial**

Weak.

Descriptions only.

No proper article CMS.

---

### **Monetization**

No native subscription system.

Requires custom implementation.

---

### **Security**

Supports:

* private videos  
* authentication

Still requires:

* Cloudflare signed URLs  
* Bunny tokens  
* DRM integration

---

### **Pros**

Excellent streaming.

Excellent API.

Stable.

---

### **Cons**

Federation is unnecessary for RK Platform.

Editorial support is minimal.

Discovery model is YouTube-like rather than BBC-like. ([EuropeanStack](https://europeanstack.com/software/peertube?utm_source=chatgpt.com))

---

## **3\. AVideo (YouPHPTube)**

### **Stack**

PHP

MySQL

FFmpeg

Plugin architecture.

---

### **Native Features**

Lots.

* uploads  
* transcoding  
* memberships  
* live  
* ads  
* subscriptions

---

### **Problems**

Architecture feels dated.

Large plugin dependency.

Modern development velocity is lower than MediaCMS or PeerTube, and many advanced capabilities depend on commercial plugins. ([Softstribe](https://softstribe.com/webdesign/best-10-php-scripts-start-video-sharing-site?utm_source=chatgpt.com))

---

### **Pros**

Nearly everything exists.

---

### **Cons**

Large legacy codebase.

Plugin ecosystem.

Harder maintenance.

---

## **4\. ClipBucket**

Baseline comparison.

### **Pros**

* mature  
* upload  
* FFmpeg

---

### **Cons**

Old PHP architecture.

Smaller active ecosystem.

Not ideal for long-term investment. ([Patrick Uhlmann](https://patrickuhlmann.ch/posts/2025_02_02_self_hosted_video_streaming/?utm_source=chatgpt.com))

---

## **5\. Jellyfin**

Not recommended.

Reason:

Jellyfin is a personal media server.

It is designed for:

* movies  
* TV  
* libraries

NOT

* articles  
* publishing  
* subscriptions  
* OTT news

---

## **6\. Owncast**

Fantastic...

if RK wanted livestreams.

Not a VOD platform.

---

## **7\. TubeArchivist**

Fantastic...

if archiving YouTube.

Not publishing original content.

---

# **B. Best-of-Breed Headless Architecture ⭐⭐⭐⭐⭐**

This is the architecture I would build today.

Editors

        │

        ▼

Payload CMS / Strapi

        │

        ├────────────── Articles

        │

        ├────────────── Video Metadata

        │

        ▼

Upload Service

        │

        ▼

MinIO

        │

        ▼

FFmpeg Workers

        │

        ▼

HLS

        │

        ▼

Cloudflare R2

        │

        ▼

Cloudflare CDN

        │

        ▼

Signed URLs

        │

        ▼

Web / PWA

Android

iOS

Android TV

Apple TV

---

## **CMS Choices**

### **Payload CMS ⭐⭐⭐⭐⭐**

Modern.

NextJS.

TypeScript.

Excellent developer experience.

Highly customizable.

---

### **Strapi 5 ⭐⭐⭐⭐⭐**

Most mature headless CMS.

Rich API.

Roles.

Permissions.

Articles.

Media.

---

### **Directus ⭐⭐⭐⭐**

Excellent admin UI.

Database-first.

Less opinionated.

---

# **Video Storage**

Recommended

MinIO

↓

Cloudflare R2

↓

Cloudflare CDN

↓

Signed URLs

---

Advantages

Unlimited scaling.

Cheap.

S3 compatible.

---

# **Video Processing**

Worker queue

↓

RabbitMQ

↓

Celery

↓

FFmpeg

↓

HLS generation

↓

Thumbnail generation

↓

Subtitle extraction

↓

AI transcription

---

# **Payment Flow**

User

↓

Subscribe

↓

Frontend

↓

Payment Service

↓

JazzCash

EasyPaisa

Stripe

↓

Webhook

↓

Subscription DB

↓

JWT

↓

Video API

↓

Signed URL

↓

Cloudflare

---

# **Paywall**

Very simple.

Video table

visibility

FREE

MEMBER

PREMIUM

Middleware

if premium:

verify subscription

issue signed URL

return player

---

# **Security**

Recommended

✅ Cloudflare Signed URLs

✅ Bunny Token Authentication

✅ HLS AES encryption

✅ Referrer validation

✅ Domain locking

✅ Watermark overlay (optional)

✅ JWT authorization

Avoid trying to prevent all downloading—determined users can always screen-record or intercept decrypted playback. The goal is to make unauthorized redistribution significantly harder, not impossible.

---

# **App Ecosystem**

This architecture naturally supports:

* Website  
* PWA  
* Android  
* iOS  
* Android TV  
* Apple TV  
* Fire TV

because everything talks through REST/GraphQL APIs.

---

# **Developer Effort**

| Architecture | Difficulty | Long-term |
| ----- | ----- | ----- |
| MediaCMS | Low | Medium |
| PeerTube | Low | Medium |
| Strapi \+ FFmpeg | Medium | Excellent |
| Payload \+ FFmpeg | Medium | Excellent |

---

# **Hidden Risks**

## **PeerTube**

Federation is unnecessary complexity.

Hard to mold into BBC.

---

## **MediaCMS**

Needs another CMS.

---

## **AVideo**

Plugin lock-in.

Legacy PHP.

---

## **ClipBucket**

Maintenance uncertainty.

---

## **Jellyfin**

Wrong product.

---

# **C. Final Recommendation Matrix**

| Candidate | Maintainability | Feature Match | Payment Integration | MVP Speed | Total (/20) |
| ----- | ----- | ----- | ----- | ----- | ----- |
| **Payload CMS \+ Custom Video Pipeline** | 5 | 5 | 5 | 4 | **19** |
| **Strapi 5 \+ Custom Video Pipeline** | 5 | 5 | 5 | 4 | **19** |
| **MediaCMS \+ Headless CMS** | 4 | 4 | 4 | 5 | **17** |
| **PeerTube \+ Custom Editorial Layer** | 4 | 3 | 3 | 5 | **15** |

---

# **Final Architecture Recommendation**

For **RK's Platform**, I would **not** build on ClipBucket, Jellyfin, or AVideo.

Instead, I would use:

* **Payload CMS** (or **Strapi 5**) as the unified editorial and content management system  
* **MinIO** (development) with **Cloudflare R2** (production) for object storage  
* Dedicated **FFmpeg worker(s)** for HLS/DASH transcoding, thumbnails, subtitles, and future AI transcription  
* **Cloudflare CDN** with signed URLs, HLS encryption, and edge caching  
* A custom subscription/paywall service integrating JazzCash, EasyPaisa, NIFT ePay, and Stripe via webhooks  
* A frontend built with **Next.js**, consuming APIs from the CMS and video service

This approach best matches the "BBC model": articles and videos share a single content platform, editors use one administrative interface, monetization is tailored to your business rules, and the same backend can power the website, PWA, mobile apps, and future Smart TV applications with minimal architectural changes.