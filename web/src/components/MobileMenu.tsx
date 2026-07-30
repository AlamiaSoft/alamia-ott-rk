'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, PlaySquare, Newspaper, User, Search, Crown, LogOut } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import { logoutUser } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'

export default function MobileMenu({ user }: { user: any }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    await logoutUser()
    setOpen(false)
    router.refresh()
  }

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="p-2 text-brand-muted hover:text-white transition-colors rounded-full hover:bg-brand-card"
      >
        <Menu className="w-6 h-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
            <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
              <img src="/checkmate-logo.jpg" alt="Logo" className="w-9 h-9 rounded-md object-cover" />
            </Link>
            <button 
              onClick={() => setOpen(false)}
              className="p-2 text-brand-muted hover:text-white transition-colors rounded-full hover:bg-brand-card"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-80px)]">
            <nav className="flex flex-col gap-6 text-lg font-bold">
              <Link href="/" onClick={() => setOpen(false)} className="text-white hover:text-brand-accent transition-colors">Home</Link>
              <Link href="/news" onClick={() => setOpen(false)} className="text-white hover:text-brand-accent transition-colors flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-brand-muted" /> News
              </Link>
              <Link href="/videos" onClick={() => setOpen(false)} className="text-white hover:text-brand-accent transition-colors flex items-center gap-2">
                <PlaySquare className="w-5 h-5 text-brand-muted" /> Videos & OTT
              </Link>
              <Link href="/creators" onClick={() => setOpen(false)} className="text-white hover:text-brand-accent transition-colors flex items-center gap-2">
                <User className="w-5 h-5 text-brand-muted" /> For Creators
              </Link>
              <Link href="/premium" onClick={() => setOpen(false)} className="text-brand-accent hover:text-brand-goldLight transition-colors flex items-center gap-2">
                <Crown className="w-5 h-5" /> Premium
              </Link>
            </nav>

            <div className="h-px bg-brand-border w-full" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-brand-muted">Theme</span>
                <ThemeToggle />
              </div>

              {!user ? (
                <Link 
                  href="/login" 
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center gap-2 text-sm font-semibold gold-gradient-bg text-brand-dark px-4 py-3 rounded-xl gold-glow"
                >
                  <User className="w-4 h-4" /> Log In
                </Link>
              ) : (
                <div className="space-y-4">
                  <div className="bg-brand-card rounded-xl p-4 flex items-center gap-3 border border-brand-border">
                    <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-brand-accent" />
                    </div>
                    <div>
                      <p className="text-white font-bold">{user.name || user.email}</p>
                      <p className="text-brand-accent text-xs uppercase tracking-wider font-bold">{user.role}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
