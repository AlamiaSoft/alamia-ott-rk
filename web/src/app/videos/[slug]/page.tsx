import { notFound } from 'next/navigation'
import { getVideoBySlug } from '@/app/actions/content'
import HlsVideoPlayer from '@/components/HlsVideoPlayer'

export const dynamic = 'force-dynamic'

interface VideoPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function VideoPage(props: VideoPageProps) {
  const params = await props.params
  const { slug } = params
  const res = await getVideoBySlug(slug)

  if (!res.success || !res.data) {
    notFound()
  }

  const video = res.data

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: video.hlsPlaylistUrl || '',
        type: 'application/x-mpegURL',
      },
    ],
    poster: video.thumbnailUrl,
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold text-white">{video.title}</h1>
        {video.isPremium && (
          <span className="inline-block bg-brand-accent/20 border border-brand-accent text-brand-accent text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            Premium Content
          </span>
        )}
      </div>

      <div className="bg-black/50 border border-brand-border rounded-xl p-2 md:p-4">
        {video.status === 'ready' && video.hlsPlaylistUrl ? (
          <HlsVideoPlayer 
            options={videoJsOptions} 
            isPremium={video.isPremium || false}
            previewDuration={video.durationSeconds || 30}
          />
        ) : (
          <div className="aspect-video w-full flex flex-col items-center justify-center space-y-4 bg-brand-card/50 rounded-lg">
            <p className="text-brand-muted text-sm">
              {video.status === 'pending' || video.status === 'processing'
                ? 'Video is currently processing and will be available soon.'
                : 'This video is currently unavailable.'}
            </p>
          </div>
        )}
      </div>

      <div className="bg-brand-card border border-brand-border rounded-xl p-6 md:p-8 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">About this stream</h3>
          <div className="text-brand-muted text-sm leading-relaxed whitespace-pre-wrap">
            {video.description || 'No description provided.'}
          </div>
        </div>
      </div>
    </div>
  )
}
