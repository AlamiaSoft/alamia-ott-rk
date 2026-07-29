'use client'

import { useState, useEffect } from 'react'
import { Plus, Loader2, FolderOpen } from 'lucide-react'
import { getEditorCategories, createCategory } from '@/app/actions/editor'

export default function CategoriesDashboardPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [formData, setFormData] = useState({ name: '', slug: '', description: '' })

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    try {
      const res = await getEditorCategories()
      if (res.success) setCategories(res.data || [])
    } catch (e) {
      console.error('Error loading categories:', e)
    } finally {
      setLoading(false)
    }
  }

  function handleNameChange(name: string) {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    setFormData((prev) => ({ ...prev, name, slug }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.name || !formData.slug) return

    setCreating(true)
    try {
      const res = await createCategory(formData)
      if (res.success && res.data) {
        setCategories((prev) => [...prev, res.data])
        setFormData({ name: '', slug: '', description: '' })
      } else {
        alert(res.error || 'Failed to create category')
      }
    } catch (error) {
      console.error('Error creating category:', error)
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-800 pb-5">
        <h1 className="text-3xl font-extrabold text-white">Categories</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="bg-[#101625] border border-gray-800 rounded-xl p-6 h-fit space-y-4">
          <h2 className="text-lg font-bold text-white">Add New Category</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. World News"
                required
                className="w-full bg-[#151d30] border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e50914]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Slug *</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="world-news"
                required
                className="w-full bg-[#151d30] border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e50914]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Category description..."
                className="w-full bg-[#151d30] border border-gray-800 rounded-lg p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e50914]"
              />
            </div>

            <button
              type="submit"
              disabled={creating}
              className="w-full flex items-center justify-center gap-2 bg-[#e50914] hover:bg-rose-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all disabled:opacity-50"
            >
              {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Save to Payload CMS
            </button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading categories...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="bg-[#101625] border border-gray-800 rounded-xl p-12 text-center">
              <FolderOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No categories defined in Payload CMS</p>
            </div>
          ) : (
            <div className="bg-[#101625] border border-gray-800 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="border-b border-gray-800 bg-[#0d1322]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Slug</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-[#151d30] transition-colors">
                      <td className="px-6 py-4 text-white font-medium text-sm">{cat.name}</td>
                      <td className="px-6 py-4 text-xs font-mono text-gray-400">{cat.slug}</td>
                      <td className="px-6 py-4 text-xs text-gray-400">{cat.description || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
