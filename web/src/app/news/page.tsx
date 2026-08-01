import Link from 'next/link'
import { getPublishedArticles } from '@/app/actions/content'
import { FileText, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function NewsFeedPage() {
  const res = await getPublishedArticles()
  const posts = res.success && res.data ? res.data : []

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-brand-border pb-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Checkmate News</h1>
          <p className="text-brand-muted text-lg mt-2">
            The latest insights, analyses, and breaking stories.
          </p>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="bg-brand-card/50 border border-brand-border/50 rounded-2xl p-16 text-center space-y-4">
          <div className="w-20 h-20 bg-brand-dark rounded-full flex items-center justify-center mx-auto shadow-inner">
            <FileText className="w-10 h-10 text-brand-muted opacity-50" />
          </div>
          <h3 className="text-xl font-bold text-white">No News Yet</h3>
          <p className="text-brand-muted text-sm max-w-sm mx-auto">Check back soon for the latest stories and updates from our editorial team.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => {
            let displayThumbnail = post.featuredImage
            if (!displayThumbnail && post.externalEmbedUrl) {
              const url = post.externalEmbedUrl
              if (url.includes('youtube.com') || url.includes('youtu.be')) {
                try {
                  const videoId = url.includes('v=') ? new URL(url).searchParams.get('v') : url.split('youtu.be/')[1]?.split('?')[0];
                  if (videoId) {
                    displayThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                  }
                } catch(e) {}
              }
            }

            return (
              <Link key={post.id} href={`/news/${post.slug}`} className="group">
                <article className="h-full bg-brand-card border border-brand-border rounded-2xl overflow-hidden hover:border-brand-accent/50 hover:shadow-2xl hover:shadow-brand-accent/10 transition-all duration-300 flex flex-col group-hover:-translate-y-1">
                  {displayThumbnail ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-brand-dark">
                      <img 
                        src={displayThumbnail} 
                        alt={post.title}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                      {post.isPremium && (
                        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-brand-accent text-brand-accent text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full z-10">
                          Premium
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative aspect-[16/10] bg-brand-dark flex items-center justify-center border-b border-brand-border/50">
                      <FileText className="w-12 h-12 text-brand-muted/30" />
                      {post.isPremium && (
                        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-brand-accent text-brand-accent text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full z-10">
                          Premium
                        </div>
                      )}
                    </div>
                  )}
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-brand-accent uppercase tracking-wider">
                        {post.category?.name || post.category?.title || 'General'}
                      </span>
                      <span className="text-brand-muted text-xs">
                        • {new Date(post.publishedAt || post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-white group-hover:text-brand-accent transition-colors line-clamp-3 leading-snug">
                      {post.title}
                    </h2>
                    
                    {post.excerpt && (
                      <p className="text-brand-muted text-sm line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-6 flex items-center text-sm font-bold text-brand-accent group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </article>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
