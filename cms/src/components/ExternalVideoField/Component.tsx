'use client'

import React, { useEffect, useState } from 'react'
import { useField, TextInput } from '@payloadcms/ui'

export const ExternalVideoField: React.FC<{ path: string }> = ({ path }) => {
  const { value = '', setValue } = useField<string>({ path })
  const [provider, setProvider] = useState<string | null>(null)
  const { value: storedProvider, setValue: setStoredProvider } = useField<string>({ path: 'externalProvider' })

  // Auto-detect provider
  useEffect(() => {
    if (!value) {
      setProvider(null)
      return
    }
    const url = value.toLowerCase()
    let detected = null
    if (url.includes('youtube.com') || url.includes('youtu.be')) detected = 'youtube'
    else if (url.includes('facebook.com')) detected = 'facebook'
    else if (url.includes('instagram.com')) detected = 'instagram'
    else if (url.includes('vimeo.com')) detected = 'vimeo'
    
    setProvider(detected)
    if (detected && detected !== storedProvider) {
      setStoredProvider(detected)
    }
  }, [value, storedProvider, setStoredProvider])

  const handleProviderSelect = (p: string) => {
    setProvider(p)
    setStoredProvider(p)
  }

  // Extract embed url for iframe preview
  const getEmbedUrl = () => {
    if (!value || !provider) return null
    try {
      if (provider === 'youtube') {
        const videoId = value.includes('v=') ? new URL(value).searchParams.get('v') : value.split('youtu.be/')[1]?.split('?')[0]
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null
      }
      if (provider === 'vimeo') {
        const videoId = value.split('vimeo.com/')[1]?.split('/')[0]
        return videoId ? `https://player.vimeo.com/video/${videoId}` : null
      }
      // Facebook and Instagram are harder to embed via simple iframe without access tokens or sdk, so we'll just show the raw link preview or simple message
    } catch (e) {
      return null
    }
    return null
  }

  const embedUrl = getEmbedUrl()

  return (
    <div className="field-type text" style={{ marginBottom: '20px' }}>
      <label className="field-label">External Embed URL</label>
      <div style={{ marginBottom: '10px' }}>
        <TextInput 
          path={path}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          value={value as string}
          placeholder="Paste YouTube, Vimeo, Facebook, or Instagram URL here..."
        />
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
        {['youtube', 'vimeo', 'facebook', 'instagram'].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => handleProviderSelect(p)}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: '1px solid ' + (provider === p ? '#f2c94c' : '#333'),
              backgroundColor: provider === p ? 'rgba(242, 201, 76, 0.1)' : 'transparent',
              color: provider === p ? '#f2c94c' : '#ccc',
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontWeight: provider === p ? 'bold' : 'normal'
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {embedUrl && (
        <div style={{ marginTop: '10px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}>
          <iframe 
            src={embedUrl}
            width="100%"
            height="300"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
      
      {value && !embedUrl && provider && (
        <div style={{ padding: '15px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '14px' }}>
          Valid {provider} link detected. The frontend player will handle the native embed for this platform.
        </div>
      )}
    </div>
  )
}
