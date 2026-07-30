'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Check, Crown, Zap, Loader2, CreditCard, Lock, X } from 'lucide-react'
import { getCurrentUser, upgradeToPremium } from '@/app/actions/auth'
import { useEffect, useState } from 'react'

export default function PremiumPage() {
  const [isSubscriber, setIsSubscriber] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    getCurrentUser().then(res => {
      setUser(res.user)
      if (res.user && (res.user.role === 'subscriber' || res.user.role === 'admin')) {
        setIsSubscriber(true)
      }
    })
  }, [])

  function handleSubscribeClick() {
    if (!user) {
      router.push('/login')
      return
    }
    setShowModal(true)
  }

  async function handleMockPayment(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await upgradeToPremium()
    
    if (res.success) {
      setIsSubscriber(true)
      setShowModal(false)
      router.refresh()
    } else {
      alert(res.error || 'Upgrade failed.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-brand-dark py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-20">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-brand-accent/20 border border-brand-accent/50 text-brand-accent px-4 py-2 rounded-full font-bold uppercase tracking-wider text-sm mb-4">
            <Crown className="w-4 h-4" /> VIP Access
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Unlock the Full <span className="text-brand-accent">Checkmate</span> Experience.
          </h1>
          <p className="text-lg md:text-xl text-brand-muted leading-relaxed">
            Support independent creators and get unlimited access to all premium streams, ad-free viewing, and exclusive community features.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto">
          <div className="bg-brand-card border-2 border-brand-accent rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(229,168,35,0.15)] relative">
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 gold-gradient-bg text-black px-6 py-2 rounded-full font-bold text-sm shadow-lg whitespace-nowrap">
              Most Popular
            </div>

            <div className="text-center space-y-4 mb-8">
              <h3 className="text-2xl font-bold text-white">Checkmate Pro</h3>
              <div className="flex items-end justify-center gap-1">
                <span className="text-5xl font-extrabold text-white">$9.99</span>
                <span className="text-brand-muted mb-1">/month</span>
              </div>
              <p className="text-brand-muted text-sm">Cancel anytime. No hidden fees.</p>
            </div>

            <ul className="space-y-4 mb-10">
              {[
                'Unlimited access to all Premium Videos',
                'Ad-free viewing experience',
                'Early access to new series & streams',
                'Exclusive "Pro" badge in comments',
                'Directly support independent creators',
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-brand-accent/20 rounded-full p-1">
                    <Check className="w-4 h-4 text-brand-accent" />
                  </div>
                  <span className="text-brand-muted">{feature}</span>
                </li>
              ))}
            </ul>

            {isSubscriber ? (
              <div className="text-center p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <p className="text-emerald-500 font-bold flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" /> You are already subscribed!
                </p>
              </div>
            ) : (
              <button 
                onClick={handleSubscribeClick}
                className="w-full flex items-center justify-center gap-2 gold-gradient-bg hover:bg-brand-goldLight text-black px-8 py-4 rounded-xl font-extrabold text-lg transition-all gold-glow-hover shadow-xl hover:-translate-y-1"
              >
                <Zap className="w-5 h-5" /> Subscribe Now
              </button>
            )}
            
            <p className="text-center text-xs text-brand-muted mt-6">
              * By clicking "Subscribe Now" a secure mock checkout will initiate.
            </p>
          </div>
        </div>

      </div>

      {/* Mock Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          
          <div className="relative bg-brand-card border border-brand-border rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-brand-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center">
                  <Crown className="w-4 h-4 text-brand-accent" />
                </div>
                <h3 className="text-xl font-bold text-white">Complete Payment</h3>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 text-brand-muted hover:text-white rounded-full hover:bg-brand-surface transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleMockPayment} className="p-6 space-y-6">
              <div className="bg-brand-surface border border-brand-border rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-white">Checkmate Pro Subscription</p>
                  <p className="text-xs text-brand-muted">Billed monthly</p>
                </div>
                <div className="text-lg font-extrabold text-white">$9.99</div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-brand-muted mb-2 uppercase tracking-wider">Card Number</label>
                  <div className="relative">
                    <CreditCard className="w-5 h-5 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      required
                      placeholder="0000 0000 0000 0000" 
                      defaultValue="4242 4242 4242 4242"
                      className="w-full bg-brand-surface border border-brand-border rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-brand-muted mb-2 uppercase tracking-wider">Expiry</label>
                    <input 
                      type="text" 
                      required
                      placeholder="MM/YY" 
                      defaultValue="12/28"
                      className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-brand-muted mb-2 uppercase tracking-wider">CVC</label>
                    <input 
                      type="text" 
                      required
                      placeholder="123" 
                      defaultValue="123"
                      className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors font-mono"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-brand-muted mb-2 uppercase tracking-wider">Name on Card</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe" 
                    defaultValue={user?.name || "Jane Doe"}
                    className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 gold-gradient-bg hover:bg-brand-goldLight text-black px-6 py-4 rounded-xl font-extrabold text-lg transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <><Lock className="w-4 h-4" /> Pay $9.99 & Subscribe</>
                  )}
                </button>
                <p className="text-center text-xs text-brand-muted mt-4">
                  This is a secure mock payment. No real card is charged.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
