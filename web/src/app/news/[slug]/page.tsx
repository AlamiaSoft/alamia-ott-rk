import Link from 'next/link'
import { getArticleBySlug } from '@/app/actions/content'
import { ArrowLeft, Calendar, Tag, Lock, Crown } from 'lucide-react'
import { getCurrentUser } from '@/app/actions/auth'

export const dynamic = 'force-dynamic'

function renderLexicalContent(content: any) {
  if (!content) return null

  if (typeof content === 'string') {
    try {
      const parsed = JSON.parse(content)
      return renderLexicalContent(parsed)
    } catch {
      return <p className="leading-relaxed">{content}</p>
    }
  }

  if (content?.root?.children) {
    return content.root.children.map((paragraph: any, idx: number) => {
      const textContent = paragraph.children?.map((child: any) => child.text || '').join('') || ''
      if (!textContent.trim()) return null
      
      if (paragraph.type === 'heading') {
        const Tag = paragraph.tag as keyof JSX.IntrinsicElements
        return <Tag key={idx} className="font-bold text-white mt-8 mb-4">{textContent}</Tag>
      }
      
      return (
        <p key={idx} className="leading-relaxed mb-6">
          {textContent}
        </p>
      )
    })
  }

  return <p className="leading-relaxed">{String(content)}</p>
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const res = await getArticleBySlug(resolvedParams.slug)

  if (!res.success || !res.data) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Article Not Found</h1>
        <p className="text-brand-muted text-lg">The requested story could not be found or has been removed.</p>
        <Link href="/news" className="inline-block bg-brand-accent text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-accent/90 transition-all shadow-lg hover:-translate-y-1">
          Back to News Feed
        </Link>
      </div>
    )
  }

  const article = res.data
  const { user } = await getCurrentUser()
  const hasAccess = user && (user.role === 'admin' || user.role === 'subscriber')
  const showPaywall = article.isPremium && !hasAccess
  const categoryName = typeof article.category === 'object' ? (article.category?.name || article.category?.title || 'General') : (article.category || 'General')

  return (
    <article className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-muted hover:text-white transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to News Feed
      </Link>

      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-brand-accent font-bold uppercase tracking-wider flex items-center gap-1 bg-brand-accent/10 px-3 py-1 rounded-full border border-brand-accent/20">
            <Tag className="w-3.5 h-3.5" /> {categoryName}
          </span>
          {article.isPremium && (
            <span className="text-xs bg-brand-gold/10 border border-brand-gold/30 text-brand-gold px-3 py-1 rounded-full font-bold uppercase tracking-widest flex items-center gap-1">
              <Crown className="w-3.5 h-3.5" /> Premium Story
            </span>
          )}
          <span className="text-brand-muted text-xs flex items-center gap-1.5 border-l border-brand-border pl-3">
            <Calendar className="w-4 h-4" />
            {new Date(article.publishedAt || article.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="text-xl md:text-2xl text-brand-muted font-light leading-relaxed border-l-4 border-brand-accent pl-6 italic">
            {article.excerpt}
          </p>
        )}
      </div>

      {article.externalEmbedUrl ? (
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-brand-border bg-black relative">
          <iframe 
            src={(() => {
              const url = article.externalEmbedUrl;
              try {
                if (url.includes('youtube.com') || url.includes('youtu.be')) {
                  const videoId = url.includes('v=') ? new URL(url).searchParams.get('v') : url.split('youtu.be/')[1]?.split('?')[0];
                  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
                }
                if (url.includes('vimeo.com')) {
                  const videoId = url.split('vimeo.com/')[1]?.split('/')[0];
                  return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
                }
                return url;
              } catch(e) {
                return url;
              }
            })()}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : article.featuredImage ? (
        <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-brand-border bg-brand-dark">
          <img 
            src={article.featuredImage} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}

      {showPaywall ? (
        <div className="relative">
          <div className="prose prose-invert max-w-none text-gray-300 text-lg md:text-xl leading-relaxed font-serif opacity-30 select-none blur-[2px]">
            <p>This is a premium story exclusive to our Checkmate Pro subscribers. The content is securely protected and requires an active membership to view in its entirety. Our premium journalism brings you unparalleled insights, in-depth analysis, and exclusive interviews that you won't find anywhere else.</p>
            <p>Join the Checkmate Media community today to unlock this article and our entire library of premium content.</p>
          </div>
          
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center mt-12">
            <div className="bg-brand-card/90 backdrop-blur-md border border-brand-accent/50 rounded-3xl p-10 max-w-lg shadow-2xl shadow-brand-accent/20">
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-brand-accent" />
              </div>
              <h2 className="text-2xl font-black text-white mb-3">Premium Article</h2>
              <p className="text-brand-muted mb-8 leading-relaxed">
                This story is exclusive to Checkmate Pro subscribers. Upgrade your account to unlock full access to all premium articles and videos.
              </p>
              <Link href={`/premium?redirect=/news/${article.slug}`} className="block w-full text-center gold-gradient-bg text-black px-6 py-4 rounded-xl font-extrabold text-lg hover:-translate-y-1 transition-transform shadow-xl">
                Unlock with Checkmate Pro
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="prose prose-invert prose-brand max-w-none text-gray-300 text-lg md:text-xl leading-relaxed font-serif pt-4 pb-12 border-b border-brand-border">
          {renderLexicalContent(article.content)}
        </div>
      )}
    </article>
  )
}
