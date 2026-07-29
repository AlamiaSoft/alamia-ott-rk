import React from 'react'

export function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.025em' }}>
      <span style={{ backgroundColor: '#e50914', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontWeight: 900 }}>
        RK
      </span>
      <span style={{ color: '#ffffff' }}>MEDIA</span>
      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7, marginLeft: '4px', fontWeight: 600 }}>
        OTT Studio
      </span>
    </div>
  )
}

export default Logo
