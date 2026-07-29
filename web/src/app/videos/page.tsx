import Link from 'next/link';
import { getPublishedVideos } from '@/app/actions/content';
import { Play, Clock, Lock } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function VideosPage() {
  const result = await getPublishedVideos();
  const videos = result.success && result.data ? result.data : [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white font-cinzel">Videos & OTT Streaming Library</h1>
        <p className="text-brand-muted mt-2">Explore high-definition HLS video streams, interviews, and documentaries.</p>
      </div>

      {videos.length === 0 ? (
        <div className="bg-brand-card border border-brand-border rounded-xl p-12 text-center space-y-4">
          <p className="text-brand-muted">No videos found. Upload a video in Payload CMS Admin to publish it here.</p>
          <Link href="/" className="inline-block gold-gradient-bg text-brand-dark px-5 py-2.5 rounded-lg font-bold text-sm gold-glow">
            Return to Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video: any) => (
            <div
              key={video.id}
              className="bg-brand-card border border-brand-border rounded-xl overflow-hidden shadow-lg hover:border-brand-accent/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video bg-black/60 overflow-hidden flex items-center justify-center">
                  {video.thumbnailUrl ? (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-card to-brand-surface flex items-center justify-center">
                      <Play className="w-12 h-12 text-brand-accent/80 group-hover:scale-110 transition-transform" />
                    </div>
                  )}

                  {video.isPremium && (
                    <div className="absolute top-3 right-3 bg-amber-500/90 text-black px-2.5 py-1 rounded text-xs font-extrabold flex items-center gap-1">
                      <Lock className="w-3 h-3" /> PREMIUM
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center text-brand-dark shadow-lg">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  {video.category && (
                    <span className="text-xs font-bold text-brand-accent uppercase tracking-wider">
                      {video.category.name || video.category.title}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-goldLight transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-sm text-brand-muted line-clamp-2">{video.description}</p>
                  )}
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-brand-border/40 text-xs text-brand-muted">
                {video.duration ? (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-accent" />
                    {Math.floor(video.duration / 60)}m {video.duration % 60}s
                  </span>
                ) : (
                  <span>HD Stream</span>
                )}
                <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
