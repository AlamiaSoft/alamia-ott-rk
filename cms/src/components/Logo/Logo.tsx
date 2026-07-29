import React from 'react'

interface LogoProps {
  loading?: string
  priority?: string
  className?: string
}

export function Logo({ loading, priority, className }: LogoProps = {}) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '2px 0' }}>
      <img
        src="/checkmate-logo.jpg"
        alt="Checkmate Media Logo"
        style={{ width: '28px', height: '28px', borderRadius: '4px', objectFit: 'cover', border: '1px solid rgba(255, 255, 255, 0.15)' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
        <span style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.02em' }}>
          CHECKMATE MEDIA
        </span>
        <span style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>
          Multi-Tenant OTT Platform
        </span>
      </div>
    </div>
  )
}

export default Logo
