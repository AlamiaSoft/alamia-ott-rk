import Link from 'next/link'
import { getPublishedArticles } from '@/app/actions/content'
import { MessageSquareQuote } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function OpinionPage() {
  const res = await getPublishedArticles()
  const articles = (res && res.success && Array.isArray(res.data)) ? res.data : []

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <div className="border-b border-brand-border pb-4">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <MessageSquareQuote className="w-8 h-8 text-brand-accent" /> Opinion & Analysis
        </h1>
        <p className="text-brand-muted text-sm mt-1">
          Expert commentary, editorial analysis, and global perspectives.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="bg-brand-card border border-brand-border rounded-xl p-12 text-center space-y-3">
          <MessageSquareQuote className="w-12 h-12 text-brand-muted opacity-40 mx-auto" />
          <p className="text-brand-muted text-sm">No opinion articles published yet.</p>
          <Link
            href="/"
            className="inline-block gold-gradient-bg text-brand-dark px-4 py-2 rounded-lg font-bold text-sm gold-glow"
          >
            Return to Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art: any) => (
            <Link key={art.id} href={`/articles/${art.slug}`}>
              <article className="h-full bg-brand-card border border-brand-border rounded-xl p-6 hover:border-brand-accent/50 transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <span className="text-xs text-brand-accent font-semibold uppercase tracking-wider">
                    Opinion & Column
                  </span>
                  <h2 className="text-xl font-bold text-white group-hover:text-brand-accent transition-colors line-clamp-2">
                    {art.title}
                  </h2>
                  {art.excerpt && (
                    <p className="text-brand-muted text-sm line-clamp-3">
                      {art.excerpt}
                    </p>
                  )}
                </div>
                <div className="pt-4 text-xs text-brand-muted">
                  {new Date(art.publishedAt).toLocaleDateString()}
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
