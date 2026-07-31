import Link from 'next/link'
import { getPublishedArticles, getPublishedVideos } from '@/app/actions/content'
import { FileText, PlaySquare, ArrowRight, Search as SearchIcon } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await searchParams
  const query = resolvedParams.q?.trim().toLowerCase() || ''

  let articles: any[] = []
  let videos: any[] = []

  if (query) {
    const [articlesRes, videosRes] = await Promise.all([
      getPublishedArticles(),
      getPublishedVideos()
    ])

    if (articlesRes.success && articlesRes.data) {
      articles = articlesRes.data.filter((a: any) => 
        a.title?.toLowerCase().includes(query) || 
        a.excerpt?.toLowerCase().includes(query) ||
        (typeof a.category === 'object' ? a.category?.name?.toLowerCase().includes(query) : false)
      )
    }

    if (videosRes.success && videosRes.data) {
      videos = videosRes.data.filter((v: any) => 
        v.title?.toLowerCase().includes(query) || 
        v.description?.toLowerCase().includes(query) ||
        (typeof v.category === 'object' ? v.category?.name?.toLowerCase().includes(query) : false)
      )
    }
  }

  const hasResults = articles.length > 0 || videos.length > 0

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="border-b border-brand-border pb-8">
        <h1 className="text-4xl font-black text-white tracking-tight">Search Results</h1>
        <p className="text-brand-muted text-lg mt-2">
          {query ? `Showing results for "${query}"` : 'Enter a search term to find articles and videos.'}
        </p>
      </div>

      {!query ? (
        <div className="bg-brand-card/30 border border-brand-border/30 rounded-2xl p-16 text-center space-y-4">
          <div className="w-20 h-20 bg-brand-dark rounded-full flex items-center justify-center mx-auto shadow-inner">
            <SearchIcon className="w-10 h-10 text-brand-muted opacity-50" />
          </div>
          <h3 className="text-xl font-bold text-white">Start Searching</h3>
          <p className="text-brand-muted text-sm max-w-sm mx-auto">Use the search bar above to discover the latest stories, premium content, and videos.</p>
        </div>
      ) : !hasResults ? (
        <div className="bg-brand-card/30 border border-brand-border/30 rounded-2xl p-16 text-center space-y-4">
          <div className="w-20 h-20 bg-brand-dark rounded-full flex items-center justify-center mx-auto shadow-inner">
            <SearchIcon className="w-10 h-10 text-brand-muted opacity-50" />
          </div>
          <h3 className="text-xl font-bold text-white">No Results Found</h3>
          <p className="text-brand-muted text-sm max-w-sm mx-auto">We couldn't find any articles or videos matching "{query}". Try different keywords.</p>
        </div>
      ) : (
        <div className="space-y-16">
          {videos.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <PlaySquare className="w-6 h-6 text-brand-accent" /> Videos
                </h2>
                <span className="text-sm font-bold bg-brand-dark border border-brand-border px-3 py-1 rounded-full text-brand-muted">
                  {videos.length} results
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {videos.map((video: any) => (
                  <Link key={video.id} href={`/videos/${video.slug}`} className="group">
                    <article className="h-full bg-brand-card border border-brand-border rounded-xl overflow-hidden hover:border-brand-accent/50 transition-all flex flex-col">
                      <div className="relative aspect-video bg-brand-dark">
                        <img src={video.thumbnailUrl || '/api/placeholder/400/225'} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        {video.isPremium && (
                          <div className="absolute top-2 right-2 bg-brand-accent text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow">
                            Premium
                          </div>
                        )}
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded">
                          {video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}` : 'Video'}
                        </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-white font-bold group-hover:text-brand-accent transition-colors line-clamp-2 text-sm">
                            {video.title}
                          </h3>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {articles.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-6 h-6 text-brand-accent" /> Articles
                </h2>
                <span className="text-sm font-bold bg-brand-dark border border-brand-border px-3 py-1 rounded-full text-brand-muted">
                  {articles.length} results
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles.map((post: any) => (
                  <Link key={post.id} href={`/news/${post.slug}`} className="group">
                    <article className="h-full bg-brand-card border border-brand-border rounded-xl overflow-hidden hover:border-brand-accent/50 transition-all flex flex-col">
                      {post.featuredImage && (
                        <div className="relative aspect-[16/10] overflow-hidden bg-brand-dark">
                          <img 
                            src={post.featuredImage} 
                            alt={post.title}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          />
                        </div>
                      )}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          <h3 className="text-lg font-bold text-white group-hover:text-brand-accent transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-brand-muted text-sm line-clamp-2 leading-relaxed">
                              {post.excerpt}
                            </p>
                          )}
                        </div>
                        <div className="mt-4 flex items-center text-xs font-bold text-brand-accent">
                          Read <ArrowRight className="w-3 h-3 ml-1" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
