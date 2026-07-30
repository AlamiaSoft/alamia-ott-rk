'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, LogOut, ChevronDown } from 'lucide-react'
import { logoutUser } from '@/app/actions/auth'

export default function AuthButtons({ user }: { user: any }) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleLogout() {
    await logoutUser()
    setMenuOpen(false)
    router.refresh()
  }

  if (!user) {
    return (
      <Link href="/login" className="flex items-center gap-2 text-sm font-semibold gold-gradient-bg text-brand-dark px-4 py-2 rounded-md gold-glow gold-glow-hover transition-all">
        <User className="w-4 h-4" /> Log In
      </Link>
    )
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-2 bg-brand-surface border border-brand-border px-3 py-1.5 rounded-full hover:border-brand-accent/50 transition-colors"
      >
        <div className="w-6 h-6 rounded-full bg-brand-accent/20 flex items-center justify-center">
          <User className="w-3.5 h-3.5 text-brand-accent" />
        </div>
        <span className="text-sm font-medium text-white max-w-[100px] truncate">
          {user.name || user.email}
        </span>
        <ChevronDown className="w-4 h-4 text-brand-muted" />
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-brand-card border border-brand-border rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-2 border-b border-brand-border/50 mb-2">
            <p className="text-xs text-brand-muted uppercase tracking-wider font-bold">Role</p>
            <p className="text-sm text-brand-accent font-medium capitalize">{user.role}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-brand-surface transition-colors"
          >
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      )}
    </div>
  )
}
