'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { Lock, Zap } from 'lucide-react'

interface PremiumGateProps {
  isPremium: boolean
  isAuthenticated: boolean
  children: ReactNode
  contentType: 'article' | 'video'
}

export function PremiumGate({
  isPremium,
  isAuthenticated,
  children,
  contentType,
}: PremiumGateProps) {
  if (!isPremium) {
    return <>{children}</>
  }

  if (isPremium && !isAuthenticated) {
    return (
      <div className="relative">
        <div className="blur-sm pointer-events-none select-none">{children}</div>

        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl">
          <div className="bg-brand-card border border-brand-border rounded-xl p-8 max-w-md text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-brand-accent/10 border border-brand-accent/30 rounded-xl">
                <Lock className="w-6 h-6 text-brand-accent" />
              </div>
            </div>

            <h3 className="text-xl font-extrabold text-white">
              Subscriber Exclusive {contentType === 'article' ? 'Story' : 'Video'}
            </h3>
            <p className="text-brand-muted text-sm">
              This {contentType} is locked for subscribers and editors. Sign in to access full coverage.
            </p>

            <div className="space-y-3 pt-2">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 bg-brand-accent hover:bg-rose-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-all"
              >
                <Zap className="w-4 h-4" /> Sign In to Unlock
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
