'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { createArticle, getEditorCategories } from '@/app/actions/editor'

export default function NewArticlePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    categoryId: '',
    isPremium: false,
  })

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    try {
      const res = await getEditorCategories()
      if (res.success) setCategories(res.data || [])
    } catch (e) {
      console.error('Error loading categories:', e)
    }
  }

  function handleTitleChange(title: string) {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    setFormData((prev) => ({ ...prev, title, slug }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.title || !formData.content) {
      alert('Please provide a title and content')
      return
    }

    setLoading(true)
    try {
      const result = await createArticle(formData)
      if (result.success) {
        router.push('/dashboard/articles')
      } else {
        alert(result.error || 'Failed to create article')
      }
    } catch (error) {
      console.error('Error submitting article:', error)
      alert('Failed to create article')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 border-b border-gray-800 pb-5">
        <Link href="/dashboard/articles" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-extrabold text-white">Create New Article</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#101625] border border-gray-800 rounded-xl p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. Global Digital Media Architecture: Hybrid News & Streaming Platform"
            required
            className="w-full bg-[#151d30] border border-gray-800 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e50914]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">URL Slug *</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
            placeholder="global-digital-media-architecture"
            required
            className="w-full bg-[#151d30] border border-gray-800 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e50914]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Category</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData((prev) => ({ ...prev, categoryId: e.target.value }))}
              className="w-full bg-[#151d30] border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e50914]"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="isPremium"
              checked={formData.isPremium}
              onChange={(e) => setFormData((prev) => ({ ...prev, isPremium: e.target.checked }))}
              className="w-5 h-5 rounded border-gray-800 text-[#e50914] focus:ring-[#e50914] bg-[#151d30]"
            />
            <label htmlFor="isPremium" className="text-sm font-semibold text-gray-300 cursor-pointer">
              Premium / Member Only Article
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Excerpt / Summary</label>
          <textarea
            rows={2}
            value={formData.excerpt}
            onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
            placeholder="Brief summary for homepage preview..."
            className="w-full bg-[#151d30] border border-gray-800 rounded-lg p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e50914]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Content *</label>
          <textarea
            rows={10}
            value={formData.content}
            onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
            placeholder="Full article body..."
            required
            className="w-full bg-[#151d30] border border-gray-800 rounded-lg p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e50914]"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-800">
          <Link
            href="/dashboard/articles"
            className="px-5 py-2.5 rounded-lg border border-gray-800 text-gray-400 hover:text-white font-semibold text-sm transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#e50914] hover:bg-rose-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all disabled:opacity-50"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Publish to Payload CMS
          </button>
        </div>
      </form>
    </div>
  )
}
