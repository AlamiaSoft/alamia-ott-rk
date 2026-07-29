import Link from 'next/link'
import { getPublishedArticles } from '@/app/actions/content'
import { FileText } from 'lucide-react'

export default async function ArticlesPage() {
  const res = await getPublishedArticles()
  const articles = res.success ? res.data : []

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <div className="border-b border-brand-border pb-4">
        <h1 className="text-3xl font-extrabold text-white">Articles & News</h1>
        <p className="text-brand-muted text-sm mt-1">
          Quality journalism, in-depth analysis, and breaking stories.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="bg-brand-card border border-brand-border rounded-xl p-12 text-center space-y-3">
          <FileText className="w-12 h-12 text-brand-muted opacity-40 mx-auto" />
          <p className="text-brand-muted text-sm">No articles published yet.</p>
          <Link
            href="/dashboard/articles/new"
            className="inline-block bg-brand-accent text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-rose-700 transition-colors"
          >
            Create First Article in Dashboard
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art: any) => (
            <Link key={art.id} href={`/articles/${art.slug}`}>
              <article className="h-full bg-brand-card border border-brand-border rounded-xl p-6 hover:border-brand-accent/50 transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-brand-accent font-semibold uppercase tracking-wider">
                      {art.category?.name || 'General'}
                    </span>
                    {art.isPremium && (
                      <span className="text-xs bg-brand-accent/10 border border-brand-accent/30 text-brand-accent px-2 py-0.5 rounded font-bold">
                        PREMIUM
                      </span>
                    )}
                  </div>
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
