import React from 'react'

const BeforeDashboard: React.FC = () => {
  return (
    <div style={{ margin: '0 0 2.5rem 0', fontFamily: 'system-ui, sans-serif' }}>
      {/* Studio Banner Header */}
      <div style={{
        background: `linear-gradient(135deg, rgba(8, 11, 18, 0.95) 0%, rgba(16, 22, 37, 0.9) 100%), url('/media/ott_streaming_bg.jpg') center/cover no-repeat`,
        border: '1px solid rgba(229, 9, 20, 0.35)',
        borderRadius: '16px',
        padding: '28px',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(229, 9, 20, 0.2)', border: '1px solid rgba(229, 9, 20, 0.5)', borderRadius: '20px', padding: '4px 14px', color: '#e50914', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
              ● LIVE STREAMING & BROADCAST STUDIO
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, margin: '4px 0 0 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
              Checkmate Media OTT Creator Studio
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: '6px 0 0 0', maxWidth: '600px' }}>
              Headless Content Management Engine & Adaptive HLS Video Transcoding Control Center
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: '#e50914',
                color: '#ffffff',
                padding: '12px 22px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '13px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(229, 9, 20, 0.4)',
                transition: 'all 0.2s',
              }}
            >
              Open Web Portal ↗
            </a>
          </div>
        </div>

        {/* Studio Cards with Custom Background Images */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>

          {/* Card 1: News & Editorial Engine */}
          <div style={{
            background: `linear-gradient(180deg, rgba(13, 19, 34, 0.85) 0%, rgba(10, 14, 26, 0.95) 100%), url('/media/news_editorial_bg.jpg') center/cover no-repeat`,
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}>
            <div style={{ fontSize: '11px', color: '#38bdf8', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.8px' }}>
              📰 NEWS & EDITORIAL ENGINE
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
              Payload 3.0 API
            </div>
            <div style={{ fontSize: '12px', color: '#10b981', marginTop: '6px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>●</span> Headless REST Endpoint Active
            </div>
          </div>

          {/* Card 2: Video Transcoding Pipeline */}
          <div style={{
            background: `linear-gradient(180deg, rgba(13, 19, 34, 0.85) 0%, rgba(10, 14, 26, 0.95) 100%), url('/media/ott_streaming_bg.jpg') center/cover no-repeat`,
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(229, 9, 20, 0.25)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}>
            <div style={{ fontSize: '11px', color: '#e50914', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.8px' }}>
              🎬 VIDEO STREAMING PIPELINE
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
              FFmpeg HLS Pipeline
            </div>
            <div style={{ fontSize: '12px', color: '#e50914', marginTop: '6px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>●</span> Adaptive Bitrate Transcode
            </div>
          </div>

          {/* Card 3: MinIO S3 Media Storage */}
          <div style={{
            background: `linear-gradient(180deg, rgba(13, 19, 34, 0.85) 0%, rgba(10, 14, 26, 0.95) 100%), url('/media/media_storage_bg.jpg') center/cover no-repeat`,
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(168, 85, 247, 0.25)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}>
            <div style={{ fontSize: '11px', color: '#a855f7', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.8px' }}>
              ☁️ MEDIA STORAGE BUCKET
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
              MinIO S3 Bucket
            </div>
            <div style={{ fontSize: '12px', color: '#a855f7', marginTop: '6px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>●</span> High-Performance Object Storage
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BeforeDashboard
