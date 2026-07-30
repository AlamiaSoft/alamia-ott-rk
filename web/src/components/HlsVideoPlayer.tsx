'use client'

import { useEffect, useRef, useState } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import Player from 'video.js/dist/types/player'
import { Lock } from 'lucide-react'
import Link from 'next/link'

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
  isPremium?: boolean
  previewDuration?: number
  hasAccess?: boolean
}

export default function HlsVideoPlayer({ options, isPremium = false, previewDuration = 30, hasAccess = false }: HlsVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const playerRef = useRef<Player | null>(null)
  const [showPaywall, setShowPaywall] = useState(false)

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = videoRef.current
      if (!videoElement) return

      playerRef.current = videojs(videoElement, options, () => {
        console.log('player is ready')
      })

      // Add Paywall listener
      if (isPremium && !hasAccess && playerRef.current) {
        playerRef.current.on('timeupdate', () => {
          const player = playerRef.current
          if (!player) return
          
          const currentTime = player.currentTime() || 0
          if (currentTime >= previewDuration) {
            player.pause()
            player.controls(false)
            if (player.isFullscreen()) {
              player.exitFullscreen()
            }
            setShowPaywall(true)
          }
        })
      }

    } else if (playerRef.current) {
      const player = playerRef.current
      player.autoplay(options.autoplay || false)
      player.src(options.sources)
      if (options.poster) player.poster(options.poster)
    }
  }, [options, isPremium, previewDuration, hasAccess, videoRef])

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
    <div className="relative rounded-xl overflow-hidden shadow-2xl border border-brand-border bg-black">
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered vjs-theme-city"
        />
      </div>

      {showPaywall && (
        <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md text-center p-6 space-y-6 animate-in fade-in duration-500">
          <div className="w-16 h-16 rounded-full bg-brand-surface border border-brand-accent/50 flex items-center justify-center shadow-lg gold-glow">
            <Lock className="w-8 h-8 text-brand-accent" />
          </div>
          
          <div className="space-y-2 max-w-md">
            <h3 className="text-3xl font-extrabold text-white tracking-tight">Premium Content</h3>
            <p className="text-brand-muted text-sm md:text-base leading-relaxed">
              Your free preview has ended. Sign in or upgrade your account to continue watching the full stream and support independent creators.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link href="/login" className="inline-flex items-center justify-center bg-brand-surface hover:bg-brand-surface/80 border border-brand-border text-white px-8 py-3 rounded-xl font-bold text-sm transition-all w-full sm:w-auto">
              Log In
            </Link>
            <Link href="/premium" className="inline-flex items-center justify-center gold-gradient-bg text-black px-8 py-3 rounded-xl font-extrabold text-sm transition-all gold-glow-hover w-full sm:w-auto shadow-lg hover:scale-105">
              Upgrade to Premium
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
