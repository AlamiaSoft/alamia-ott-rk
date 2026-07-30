'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserPlus, Loader2 } from 'lucide-react'
import { registerUser } from '@/app/actions/auth'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError('')
    setLoading(true)

    const res = await registerUser(formData)

    if (res.success) {
      router.push('/')
      router.refresh()
    } else {
      setError(res.error || 'Failed to register')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="w-16 h-16 bg-brand-card border border-brand-accent/30 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
            <UserPlus className="w-8 h-8 text-brand-accent" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-foreground">Create an account</h2>
          <p className="mt-2 text-sm text-brand-muted">
            Or{' '}
            <Link href="/login" className="font-medium text-brand-accent hover:text-brand-goldLight transition-colors">
              log in to your existing account
            </Link>
          </p>
        </div>

        <form action={handleSubmit} className="bg-brand-card/80 backdrop-blur-xl border border-brand-border rounded-3xl p-8 shadow-2xl space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-sm p-4 rounded-xl text-center font-medium">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Full Name</label>
              <input
                name="name"
                type="text"
                required
                className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Email Address</label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Password</label>
              <input
                name="password"
                type="password"
                required
                className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                required
                className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-goldLight text-black font-extrabold py-3.5 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-brand-accent/20"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}
