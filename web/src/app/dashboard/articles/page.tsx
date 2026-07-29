'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Trash2, Eye } from 'lucide-react'
import { getEditorArticles, deleteArticle } from '@/app/actions/editor'

export default function ArticlesDashboardPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    loadArticles()
  }, [])

  async function loadArticles() {
    try {
      const result = await getEditorArticles()
      if (result.success) {
        setArticles(result.data || [])
      }
    } catch (error) {
      console.error('Error loading articles:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this article from Payload CMS?')) return

    setDeleting(id)
    try {
      const result = await deleteArticle(id)
      if (result.success) {
        setArticles((prev) => prev.filter((a) => a.id !== id))
      }
    } catch (error) {
      console.error('Error deleting article:', error)
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-5">
        <h1 className="text-3xl font-extrabold text-white">Articles</h1>
        <Link
          href="/dashboard/articles/new"
          className="flex items-center gap-2 bg-[#e50914] hover:bg-rose-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all"
        >
          <Plus className="w-4 h-4" /> New Article
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Loading articles from Payload CMS...</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="bg-[#101625] border border-gray-800 rounded-xl p-12 text-center space-y-4">
          <p className="text-gray-400">No articles found in Payload CMS</p>
          <Link
            href="/dashboard/articles/new"
            className="inline-flex items-center gap-2 bg-[#e50914] hover:bg-rose-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all"
          >
            Create First Article
          </Link>
        </div>
      ) : (
        <div className="bg-[#101625] border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-gray-800 bg-[#0d1322]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Title</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Type</th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-[#151d30] transition-colors">
                  <td className="px-6 py-4 text-white font-medium text-sm">{art.title}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                      art.isPremium
                        ? 'bg-[#e50914]/10 border border-[#e50914]/30 text-[#e50914]'
                        : 'bg-gray-800 text-gray-400'
                    }`}>
                      {art.isPremium ? 'Premium' : 'Free'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link href={`/news/${art.slug}`} className="inline-flex items-center p-2 text-gray-400 hover:text-white transition-colors">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(art.id)}
                      disabled={deleting === art.id}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
