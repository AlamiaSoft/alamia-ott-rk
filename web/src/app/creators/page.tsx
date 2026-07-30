import Link from 'next/link';
import { 
  Play, Video, FileText, Mic, Users, Tv, 
  ArrowRight, CheckCircle, Smartphone, BarChart3, 
  ShieldCheck, Globe, Youtube, Instagram, Facebook 
} from 'lucide-react';

export const metadata = {
  title: "For Creators | Alamia OTT",
  description: "Beyond a Channel. Build a Media Business.",
};

export default function CreatorsPage() {
  return (
    <div className="min-h-screen bg-brand-dark text-foreground">
      
      {/* 1. HERO SECTION */}
      <section className="relative px-6 py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-surface border border-brand-border text-brand-goldLight text-sm font-semibold tracking-wide uppercase shadow-lg">
            <Globe className="w-4 h-4" /> Pakistan's Next Independent Media Network
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold font-cinzel leading-tight tracking-tight">
            Beyond a Channel.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-goldLight via-brand-accent to-amber-700">
              Build a Media Business.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-brand-muted max-w-2xl leading-relaxed">
            Today's creators have millions of followers. But they don't own the platform. Algorithms change. Monetization changes. Reach disappears overnight.
          </p>

          <p className="text-lg font-bold text-white uppercase tracking-widest pt-4">
            Welcome to a new generation of independent media.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
            <Link href="#join" className="group inline-flex items-center justify-center gap-2 gold-gradient-bg hover:opacity-90 text-brand-dark px-8 py-4 rounded-xl font-extrabold text-lg transition-all gold-glow-hover w-full sm:w-auto">
              Join the Movement <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#features" className="inline-flex items-center justify-center gap-2 bg-brand-card hover:bg-brand-surface border border-brand-border text-white px-8 py-4 rounded-xl font-bold text-lg transition-all w-full sm:w-auto">
              Explore the Platform
            </Link>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION GRID */}
      <section id="features" className="px-6 py-20 bg-brand-surface/30 border-y border-brand-border">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">One Platform. Endless Possibilities.</h2>
            <p className="text-brand-muted text-lg">Imagine a platform where creators publish all under their own brand.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: Tv, label: 'Premium Video' },
              { icon: FileText, label: 'Journalism' },
              { icon: Mic, label: 'Podcasts' },
              { icon: Play, label: 'Documentaries' },
              { icon: Users, label: 'Live Events' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-brand-card border border-brand-border rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:border-brand-accent/50 hover:-translate-y-1 transition-all group shadow-lg">
                <div className="w-14 h-14 rounded-full bg-brand-surface flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-brand-accent" />
                </div>
                <span className="font-semibold text-white">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SPLIT PERSPECTIVES (VIEWERS VS CREATORS) */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* For Viewers */}
          <div className="bg-gradient-to-br from-brand-card to-brand-surface border border-brand-border rounded-3xl p-10 md:p-14 space-y-8 relative overflow-hidden group hover:border-brand-accent/30 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
            <h3 className="text-3xl font-extrabold text-white flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-400" /> For Viewers
            </h3>
            <ul className="space-y-6">
              {[
                'One destination for trusted voices.',
                'No endless scrolling.',
                'No algorithm deciding what matters.',
                'Simply follow the creators you trust and access quality journalism in one place.'
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-lg text-brand-muted leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* For Creators */}
          <div className="bg-gradient-to-br from-brand-card to-brand-surface border border-brand-accent/30 rounded-3xl p-10 md:p-14 space-y-8 relative overflow-hidden group hover:border-brand-accent/60 transition-colors shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 blur-[80px] rounded-full pointer-events-none" />
            <h3 className="text-3xl font-extrabold text-white flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-brand-accent" /> For Creators
            </h3>
            <ul className="space-y-6">
              {[
                'Your audience.',
                'Your brand.',
                'Your revenue.',
                'Unlock multiple income streams: memberships, live events, courses, and direct audience support.'
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-brand-accent shrink-0 mt-0.5" />
                  <span className="text-lg text-brand-muted leading-relaxed font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* 4. KEEP SOCIAL MEDIA, OWN YOUR FUTURE */}
      <section className="px-6 py-24 bg-brand-card border-y border-brand-border">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold text-white">Keep Social Media. <span className="text-brand-accent">Own Your Future.</span></h2>
            <p className="text-xl text-brand-muted">
              YouTube, Facebook, Instagram, TikTok. These remain powerful discovery platforms. But your own platform becomes your permanent digital home.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <Youtube className="w-16 h-16 hover:text-red-600 transition-colors cursor-pointer" />
            <Facebook className="w-14 h-14 hover:text-blue-600 transition-colors cursor-pointer" />
            <Instagram className="w-14 h-14 hover:text-pink-600 transition-colors cursor-pointer" />
            <Smartphone className="w-14 h-14 hover:text-white transition-colors cursor-pointer" /> {/* TikTok representation */}
          </div>
        </div>
      </section>

      {/* 5. GROWTH & ROADMAP */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-extrabold text-white font-cinzel">Built for Growth</h2>
            <p className="text-lg text-brand-muted">
              The platform is designed to evolve alongside your vision. What starts as one creator can become an entire media ecosystem.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {['Journalists', 'Analysts', 'Filmmakers', 'Educators', 'Commentators'].map((badge) => (
                <span key={badge} className="px-4 py-2 bg-brand-surface border border-brand-border rounded-lg text-sm font-bold text-white">
                  {badge}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-brand-card border border-brand-border rounded-3xl p-8 space-y-8">
            <div className="space-y-4">
              <h4 className="text-brand-accent font-bold uppercase tracking-widest text-sm flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Today</h4>
              <p className="text-white text-lg font-medium flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" /> A flagship creator platform
              </p>
            </div>
            
            <div className="h-px w-full bg-brand-border" />
            
            <div className="space-y-4">
              <h4 className="text-brand-goldDark font-bold uppercase tracking-widest text-sm flex items-center gap-2"><Smartphone className="w-4 h-4" /> Tomorrow</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Premium Memberships', 'Live Streaming', 'Mobile & Smart TV Apps', 
                  'AI Discovery', 'Creator Analytics', 'Advertising Marketplace'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-brand-muted font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-border" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section id="join" className="px-6 py-24 pb-32">
        <div className="max-w-5xl mx-auto rounded-3xl gold-gradient-bg p-12 md:p-20 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-extrabold text-brand-dark font-cinzel leading-tight">
              Join the Movement
            </h2>
            <p className="text-xl md:text-2xl text-brand-dark/80 font-medium max-w-3xl mx-auto">
              We're building a platform where trusted voices can inform, inspire, and build sustainable businesses around their work.
            </p>
            <div className="pt-8">
              <button className="bg-brand-dark hover:bg-black text-white px-10 py-5 rounded-xl font-extrabold text-lg transition-all shadow-xl hover:-translate-y-1">
                Start Your Independent Network
              </button>
            </div>
            <p className="text-brand-dark font-bold uppercase tracking-widest pt-4">
              Own your audience. Grow your brand.
            </p>
          </div>
        </div>
      </section>
      
    </div>
  );
}
