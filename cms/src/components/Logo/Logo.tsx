import React from 'react'

export function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.025em' }}>
      <img
        src="/checkmate-logo.jpg"
        alt="Checkmate Media Logo"
        style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover', border: '1px solid rgba(255, 215, 0, 0.4)' }}
      />
      <span style={{ color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.02em', fontWeight: 900 }}>
        CHECKMATE <span style={{ color: '#e50914' }}>MEDIA</span>
      </span>
      <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', fontWeight: 600 }}>
        OTT Studio
      </span>
    </div>
  )
}

export default Logo
