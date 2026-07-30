import Link from 'next/link';
import { Play, Flame, ShieldAlert, Award } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden bg-brand-card border border-brand-border p-8 md:p-12">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-brand-accent text-xs font-semibold">
            <Flame className="w-3.5 h-3.5" /> FEATURED STORY & OTT STREAM
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            Global Digital Media Architecture: Hybrid News & Streaming Platform
          </h1>
          <p className="text-brand-muted text-base md:text-lg">
            Experience real-time news coverage, opinion analysis, and seamlessly embedded high-definition HLS video streams.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/videos" className="flex items-center gap-2 bg-brand-accent hover:bg-rose-700 text-white px-6 py-3 rounded-lg font-semibold transition-all">
              <Play className="w-4 h-4 fill-current" /> Watch OTT Stream
            </Link>
            <Link href="/news" className="flex items-center gap-2 bg-brand-card hover:bg-brand-border text-foreground px-6 py-3 rounded-lg font-semibold border border-brand-border transition-all">
              Read Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Grid Content Showcase */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-brand-border pb-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Award className="w-6 h-6 text-brand-accent" /> Latest News & Video Streams
          </h2>
          <Link href="/news" className="text-sm font-semibold text-brand-accent hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-brand-card border border-brand-border rounded-xl overflow-hidden hover:border-brand-accent/50 transition-all group">
            <div className="h-48 bg-gray-800 relative flex items-center justify-center">
              <Play className="w-12 h-12 text-white/80 group-hover:text-brand-accent transition-colors" />
              <span className="absolute top-3 left-3 bg-brand-accent text-white text-xs px-2 py-1 rounded font-bold">HLS STREAM</span>
            </div>
            <div className="p-5 space-y-2">
              <span className="text-xs text-brand-muted uppercase tracking-wider font-semibold">Technology & Media</span>
              <h3 className="font-bold text-lg text-foreground group-hover:text-brand-accent transition-colors">
                Decoupled Headless CMS & Custom Transcoding Pipelines
              </h3>
              <p className="text-brand-muted text-sm line-clamp-2">
                Evaluation of modern digital news platforms matching BBC and Al Jazeera publishing standards.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-brand-card border border-brand-border rounded-xl overflow-hidden hover:border-brand-accent/50 transition-all group">
            <div className="h-48 bg-gray-800 relative flex items-center justify-center">
              <ShieldAlert className="w-12 h-12 text-brand-accent/80" />
              <span className="absolute top-3 left-3 bg-brand-border text-white text-xs px-2 py-1 rounded font-bold">SUBSCRIBER ONLY</span>
            </div>
            <div className="p-5 space-y-2">
              <span className="text-xs text-brand-muted uppercase tracking-wider font-semibold">Opinion & Politics</span>
              <h3 className="font-bold text-lg text-foreground group-hover:text-brand-accent transition-colors">
                Monetization & Membership Paywall Gate
              </h3>
              <p className="text-brand-muted text-sm line-clamp-2">
                Simulating membership tiers and signed URL protection for premium editorial content.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-brand-card border border-brand-border rounded-xl overflow-hidden hover:border-brand-accent/50 transition-all group">
            <div className="h-48 bg-gray-800 relative flex items-center justify-center">
              <Play className="w-12 h-12 text-white/80 group-hover:text-brand-accent transition-colors" />
              <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs px-2 py-1 rounded font-bold">FREE WATCH</span>
            </div>
            <div className="p-5 space-y-2">
              <span className="text-xs text-brand-muted uppercase tracking-wider font-semibold">Live Analysis</span>
              <h3 className="font-bold text-lg text-foreground group-hover:text-brand-accent transition-colors">
                Portainer Stack & Cloudflare Tunnel Architecture
              </h3>
              <p className="text-brand-muted text-sm line-clamp-2">
                Deploying production container stacks directly from GitHub to Oracle VPS infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
