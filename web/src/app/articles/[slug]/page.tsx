import Link from 'next/link'
import { getArticleBySlug } from '@/app/actions/content'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'

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
      return (
        <p key={idx} className="leading-relaxed mb-4">
          {textContent}
        </p>
      )
    })
  }

  return <p className="leading-relaxed">{String(content)}</p>
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const res = await getArticleBySlug(params.slug)

  if (!res.success || !res.data) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-white">Article Not Found</h1>
        <p className="text-brand-muted">The requested article could not be found.</p>
        <Link href="/articles" className="inline-block bg-brand-accent text-white px-5 py-2.5 rounded-lg font-semibold text-sm">
          Back to Articles
        </Link>
      </div>
    )
  }

  const article = res.data
  const categoryName = typeof article.category === 'object' ? (article.category?.name || article.category?.title || 'General') : (article.category || 'General')

  return (
    <article className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <Link href="/articles" className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Articles
      </Link>

      <div className="space-y-4 border-b border-brand-border pb-6">
        <div className="flex items-center gap-3">
          <span className="text-xs text-brand-accent font-semibold uppercase tracking-wider flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> {categoryName}
          </span>
          {article.isPremium && (
            <span className="text-xs bg-brand-accent/10 border border-brand-accent/30 text-brand-accent px-2 py-0.5 rounded font-bold">
              PREMIUM ARTICLE
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="text-xl text-brand-muted italic">
            {article.excerpt}
          </p>
        )}

        <div className="flex items-center gap-2 text-xs text-brand-muted pt-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none text-gray-200 text-lg leading-relaxed">
        {renderLexicalContent(article.content)}
      </div>
    </article>
  )
}
