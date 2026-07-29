import React from 'react'

const BeforeDashboard: React.FC = () => {
  return (
    <div style={{ margin: '0 0 2rem 0', fontFamily: 'system-ui, sans-serif' }}>
      {/* Studio Header Card */}
      <div style={{
        background: 'linear-gradient(135deg, #101625 0%, #151d30 100%)',
        border: '1px solid rgba(229, 9, 20, 0.3)',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        color: '#ffffff',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(229, 9, 20, 0.15)', border: '1px solid rgba(229, 9, 20, 0.4)', borderRadius: '20px', padding: '4px 12px', color: '#e50914', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              ● LIVE STREAMING STUDIO
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '4px 0 0 0', color: '#ffffff' }}>
              RK Media OTT Creator Studio
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: '4px 0 0 0' }}>
              Headless Content Management & HLS Video Transcoding Operations
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
                padding: '10px 18px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '13px',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              Open Web Portal ↗
            </a>
          </div>
        </div>

        {/* Studio Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ background: '#0d1322', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>CONTENT ENGINE</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>Payload 3.0 API</div>
            <div style={{ fontSize: '12px', color: '#10b981', marginTop: '4px', fontWeight: 600 }}>● Active & Healthy</div>
          </div>

          <div style={{ background: '#0d1322', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>VIDEO PIPELINE</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>FFmpeg + HLS</div>
            <div style={{ fontSize: '12px', color: '#38bdf8', marginTop: '4px', fontWeight: 600 }}>Multi-bitrate Ready</div>
          </div>

          <div style={{ background: '#0d1322', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>MEDIA STORAGE</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>MinIO S3</div>
            <div style={{ fontSize: '12px', color: '#a855f7', marginTop: '4px', fontWeight: 600 }}>Object Bucket Active</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BeforeDashboard
