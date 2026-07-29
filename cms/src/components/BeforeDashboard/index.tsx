import React from 'react'

const BeforeDashboard: React.FC = () => {
  return (
    <div style={{ margin: '0 0 2rem 0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Platform Header */}
      <div style={{
        background: `linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%), url('/media/ott_streaming_bg.jpg') center/cover no-repeat`,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
        color: '#ffffff',
        marginBottom: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '16px', padding: '3px 10px', color: '#60a5fa', fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '8px' }}>
              ● MULTI-TENANT OTT PLATFORM OPERATIONS
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '2px 0 0 0', color: '#f8fafc', letterSpacing: '-0.01em' }}>
              Checkmate Media Platform Dashboard
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '13px', margin: '4px 0 0 0', maxWidth: '640px', fontWeight: 400 }}>
              Control center for headless content management, adaptive HLS video transcoding, and multi-tenant creator channel isolation.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              Open Web Portal ↗
            </a>
          </div>
        </div>
      </div>

      {/* Section 1: Multi-Tenant SaaS Overview */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
          Multi-Tenant Creator SaaS Metrics
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          
          {/* SaaS Metric 1: Active Tenants */}
          <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>Active Creator Channels</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', marginTop: '4px' }}>14 Studios</div>
            <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px', fontWeight: 500 }}>+3 new this month</div>
          </div>

          {/* SaaS Metric 2: Monthly Active Streams */}
          <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>Monthly Active Streamers</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', marginTop: '4px' }}>128,400 Streams</div>
            <div style={{ fontSize: '11px', color: '#60a5fa', marginTop: '4px', fontWeight: 500 }}>99.98% Stream Uptime</div>
          </div>

          {/* SaaS Metric 3: Tenant Storage */}
          <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>MinIO S3 Storage Pool</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', marginTop: '4px' }}>1.4 TB / 5 TB</div>
            <div style={{ fontSize: '11px', color: '#a78bfa', marginTop: '4px', fontWeight: 500 }}>28% Capacity Used</div>
          </div>

          {/* SaaS Metric 4: Subscription Tiers */}
          <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>Subscription Plan Tiers</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', marginTop: '4px' }}>4 Enterprise / 10 Pro</div>
            <div style={{ fontSize: '11px', color: '#f59e0b', marginTop: '4px', fontWeight: 500 }}>SaaS Revenue Active</div>
          </div>

        </div>
      </div>

      {/* Section 2: Platform Infrastructure Status Cards */}
      <div>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
          System Infrastructure & Microservices
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          
          <div style={{
            background: `linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%), url('/media/news_editorial_bg.jpg') center/cover no-repeat`,
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}>
            <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>HEADLESS CONTENT API</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', marginTop: '4px' }}>Payload 3.0 Engine</div>
            <div style={{ fontSize: '12px', color: '#34d399', marginTop: '4px', fontWeight: 500 }}>● Operational (200 OK)</div>
          </div>

          <div style={{
            background: `linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%), url('/media/ott_streaming_bg.jpg') center/cover no-repeat`,
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}>
            <div style={{ fontSize: '11px', color: '#60a5fa', fontWeight: 600 }}>HLS TRANSCODING WORKER</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', marginTop: '4px' }}>FFmpeg Multi-bitrate</div>
            <div style={{ fontSize: '12px', color: '#60a5fa', marginTop: '4px', fontWeight: 500 }}>● Ready for Encoding</div>
          </div>

          <div style={{
            background: `linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%), url('/media/media_storage_bg.jpg') center/cover no-repeat`,
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}>
            <div style={{ fontSize: '11px', color: '#a78bfa', fontWeight: 600 }}>OBJECT STORAGE POOL</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', marginTop: '4px' }}>MinIO S3 Microservice</div>
            <div style={{ fontSize: '12px', color: '#a78bfa', marginTop: '4px', fontWeight: 500 }}>● Bucket Mounted</div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default BeforeDashboard
