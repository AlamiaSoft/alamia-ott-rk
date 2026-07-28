# System Dependency Map

```mermaid
graph LR
    subgraph Data_Storage["Data & Storage Dependencies"]
        PG[("PostgreSQL")]
        MINIO[("MinIO / R2 Storage")]
    end

    subgraph Core_Services["Core Services"]
        CMS["Payload CMS"]
        WEB["Next.js Web Portal"]
        WORKER["FFmpeg Transcoder Worker"]
        QUEUE["Task Queue (RabbitMQ/Redis)"]
    end

    subgraph External_Network["Edge & Ingress"]
        CADDY["Caddy Reverse Proxy"]
        CDN["Cloudflare CDN"]
    end

    %% Dependencies
    CMS --> PG
    CMS --> MINIO
    WORKER --> QUEUE
    WORKER --> MINIO
    WORKER --> CMS
    WEB --> CMS
    WEB --> CDN
    CDN --> MINIO
    CADDY --> CMS
    CADDY --> WEB
```

### Dependency Invariants
1. **Payload CMS** depends directly on **PostgreSQL** for persistence and **MinIO** for raw upload storage.
2. **FFmpeg Worker** consumes jobs from **Task Queue**, reads raw video files from **MinIO**, writes HLS outputs to **MinIO**, and updates metadata in **Payload CMS**.
3. **Next.js Web Portal** depends on **Payload CMS APIs** for content rendering and **Cloudflare CDN / MinIO** for HLS stream delivery.
