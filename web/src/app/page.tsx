import Link from 'next/link';
import { Play, Flame, ShieldAlert, Award, Clock, Lock } from 'lucide-react';
import { getPublishedVideos } from '@/app/actions/content';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const result = await getPublishedVideos();
  const videos = result.success && result.data ? result.data.slice(0, 3) : []; // Show latest 3

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
          <Link href="/videos" className="text-sm font-semibold text-brand-accent hover:underline">
            View All →
          </Link>
        </div>

        {videos.length === 0 ? (
           <div className="text-center py-10 text-brand-muted border border-brand-border rounded-xl">
             No videos published yet.
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video: any) => (
              <Link
                href={`/videos/${video.slug}`}
                key={video.id}
                className="bg-brand-card border border-brand-border rounded-xl overflow-hidden hover:border-brand-accent/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 bg-black/80 relative flex items-center justify-center overflow-hidden">
                    {video.thumbnailUrl ? (
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <Play className="w-12 h-12 text-white/80 group-hover:text-brand-accent transition-colors" />
                    )}

                    <span className="absolute top-3 left-3 bg-brand-accent text-white text-xs px-2 py-1 rounded font-bold">
                      HLS STREAM
                    </span>
                    
                    {video.isPremium && (
                      <div className="absolute top-3 right-3 bg-amber-500/90 text-black px-2.5 py-1 rounded text-xs font-extrabold flex items-center gap-1">
                        <Lock className="w-3 h-3" /> PREMIUM
                      </div>
                    )}
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-xs text-brand-muted uppercase tracking-wider font-semibold">
                      {video.category?.name || video.category?.title || 'Video'}
                    </span>
                    <h3 className="font-bold text-lg text-foreground group-hover:text-brand-accent transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-brand-muted text-sm line-clamp-2">
                      {video.description || 'Watch the latest streaming content on our platform.'}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
