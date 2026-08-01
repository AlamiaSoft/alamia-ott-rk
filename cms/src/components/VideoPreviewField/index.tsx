'use client'

import React, { useEffect, useState } from 'react'
import { useField, useFormFields, TextInput } from '@payloadcms/ui'

export const VideoPreviewField: React.FC<{ path: string }> = ({ path }) => {
  const { value: externalEmbedUrl = '', setValue: setExternalEmbedUrl } = useField<string>({ path })
  const { value: storedProvider, setValue: setStoredProvider } = useField<string>({ path: 'externalProvider' })

  // Use useFormFields to watch videoFile and hlsPlaylistUrl from the rest of the form
  const videoFileField = useFormFields(([fields]) => fields.videoFile)
  const hlsPlaylistUrlField = useFormFields(([fields]) => fields.hlsPlaylistUrl)

  const videoFileId = videoFileField?.value as string
  const hlsPlaylistUrl = hlsPlaylistUrlField?.value as string

  const [rawVideoUrl, setRawVideoUrl] = useState<string | null>(null)
  const [loadingMedia, setLoadingMedia] = useState(false)
  const [provider, setProvider] = useState<string | null>(null)

  // Auto-detect external provider when externalEmbedUrl changes
  useEffect(() => {
    if (!externalEmbedUrl) {
      setProvider(null)
      return
    }

    const url = externalEmbedUrl.toLowerCase()
    let detected: string | null = null

    if (url.includes('youtube.com') || url.includes('youtu.be')) detected = 'youtube'
    else if (url.includes('facebook.com')) detected = 'facebook'
    else if (url.includes('instagram.com')) detected = 'instagram'
    else if (url.includes('vimeo.com')) detected = 'vimeo'

    setProvider(detected)
    if (detected && detected !== storedProvider) {
      setStoredProvider(detected)
    }
  }, [externalEmbedUrl, storedProvider, setStoredProvider])

  // Fetch raw media URL from API when videoFileId changes
  useEffect(() => {
    if (!videoFileId) {
      setRawVideoUrl(null)
      return
    }

    setLoadingMedia(true)
    let active = true

    fetch(`/api/media/${videoFileId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch media details')
        return res.json()
      })
      .then((data) => {
        if (active && data && data.url) {
          setRawVideoUrl(data.url)
        }
      })
      .catch((err) => {
        console.error('[Preview] Error fetching raw video details:', err)
      })
      .finally(() => {
        if (active) setLoadingMedia(false)
      })

    return () => {
      active = false
    }
  }, [videoFileId])

  const getEmbedUrl = () => {
    if (!externalEmbedUrl || !provider) return null
    try {
      if (provider === 'youtube') {
        const videoId = externalEmbedUrl.includes('v=')
          ? new URL(externalEmbedUrl).searchParams.get('v')
          : externalEmbedUrl.split('youtu.be/')[1]?.split('?')[0]
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null
      }
      if (provider === 'vimeo') {
        const videoId = externalEmbedUrl.split('vimeo.com/')[1]?.split('/')[0]
        return videoId ? `https://player.vimeo.com/video/${videoId}` : null
      }
    } catch (e) {
      return null
    }
    return null
  }

  const embedUrl = getEmbedUrl()

  const showExternalEmbed = Boolean(externalEmbedUrl && embedUrl)
  const showRawPlayer = Boolean(!showExternalEmbed && (hlsPlaylistUrl || rawVideoUrl))

  return (
    <div className="field-type" style={{ marginBottom: '25px' }}>
      <label className="field-label" style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>
        External Embed URL
      </label>
      <div style={{ marginBottom: '10px' }}>
        <TextInput
          path={path}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExternalEmbedUrl(e.target.value)}
          value={externalEmbedUrl}
          placeholder="Paste YouTube, Vimeo, Facebook, or Instagram URL here..."
        />
      </div>

      {/* Manual provider buttons for override */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
        {['youtube', 'vimeo', 'facebook', 'instagram'].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => {
              setProvider(p)
              setStoredProvider(p)
            }}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: '1px solid ' + (provider === p ? '#f2c94c' : '#333'),
              backgroundColor: provider === p ? 'rgba(242, 201, 76, 0.1)' : 'transparent',
              color: provider === p ? '#f2c94c' : '#ccc',
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontSize: '12px',
              fontWeight: provider === p ? 'bold' : 'normal',
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Unified Preview Box */}
      <div
        style={{
          padding: '12px',
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: '8px',
          backgroundColor: 'var(--theme-elevation-50)',
        }}
      >
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--theme-text-muted)', marginBottom: '8px', fontWeight: 'bold' }}>
          Live Player Preview
        </div>

        {showExternalEmbed && (
          <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--theme-elevation-200)' }}>
            <iframe
              src={embedUrl!}
              width="100%"
              height="240"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div style={{ padding: '6px 10px', fontSize: '11px', color: 'var(--theme-text-muted)', backgroundColor: 'var(--theme-elevation-100)' }}>
              Playing external {provider} embed source
            </div>
          </div>
        )}

        {showRawPlayer && (
          <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--theme-elevation-200)' }}>
            <video
              src={hlsPlaylistUrl || rawVideoUrl!}
              controls
              style={{ width: '100%', maxHeight: '240px', backgroundColor: '#000' }}
              poster="/checkmate-logo.jpg"
            />
            <div style={{ padding: '6px 10px', fontSize: '11px', color: 'var(--theme-text-muted)', backgroundColor: 'var(--theme-elevation-100)' }}>
              {hlsPlaylistUrl ? 'Playing transcoded HLS stream (.m3u8)' : 'Playing raw uploaded video file'}
            </div>
          </div>
        )}

        {loadingMedia && (
          <div style={{ padding: '15px', textAlign: 'center', color: 'var(--theme-text-muted)', fontSize: '12px' }}>
            Loading raw media file details...
          </div>
        )}

        {!showExternalEmbed && !showRawPlayer && !loadingMedia && (
          <div
            style={{
              padding: '20px 10px',
              textAlign: 'center',
              color: 'var(--theme-text-muted)',
              fontSize: '12px',
              border: '1px dashed var(--theme-elevation-200)',
              borderRadius: '6px',
            }}
          >
            Enter a YouTube/Vimeo link or upload a video file to view the preview player.
          </div>
        )}
      </div>
    </div>
  )
}
