'use client'

import { useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import Player from 'video.js/dist/types/player'

interface HlsVideoPlayerProps {
  options: {
    autoplay?: boolean
    controls?: boolean
    responsive?: boolean
    fluid?: boolean
    sources: {
      src: string
      type: string
    }[]
    poster?: string
  }
}

export default function HlsVideoPlayer({ options }: HlsVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const playerRef = useRef<Player | null>(null)

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = videoRef.current
      if (!videoElement) return

      playerRef.current = videojs(videoElement, options, () => {
        console.log('player is ready')
      })
    } else if (playerRef.current) {
      const player = playerRef.current
      player.autoplay(options.autoplay || false)
      player.src(options.sources)
      if (options.poster) player.poster(options.poster)
    }
  }, [options, videoRef])

  useEffect(() => {
    const player = playerRef.current
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [])

  return (
    <div data-vjs-player className="rounded-xl overflow-hidden shadow-2xl border border-brand-border">
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered vjs-theme-city"
      />
    </div>
  )
}
