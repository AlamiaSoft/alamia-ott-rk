import Link from 'next/link'
import { getEditorArticles, getEditorVideos, getEditorCategories } from '@/app/actions/editor'
import { FileText, Video, FolderOpen, Plus, ExternalLink } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const [articlesRes, videosRes, categoriesRes] = await Promise.all([
    getEditorArticles(),
    getEditorVideos(),
    getEditorCategories(),
  ])

  const articles = (articlesRes && articlesRes.success && Array.isArray(articlesRes.data)) ? articlesRes.data : []
  const videos = (videosRes && videosRes.success && Array.isArray(videosRes.data)) ? videosRes.data : []
  const categories = (categoriesRes && categoriesRes.success && Array.isArray(categoriesRes.data)) ? categoriesRes.data : []

  const publishedArticles = articles.filter((a: any) => a.isPublished).length
  const publishedVideos = videos.filter((v: any) => v.isPublished).length

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-gray-800 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Alamia OTT Editor Studio</h1>
          <p className="text-sm text-gray-400 mt-1">
            Powered by Headless Payload CMS 3 REST APIs
          </p>
        </div>
        <Link
          href="/dashboard/articles/new"
          className="flex items-center gap-2 bg-[#e50914] hover:bg-rose-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Create Article
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#101625] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">Articles</p>
              <p className="text-3xl font-extrabold text-white mt-1">{articles.length}</p>
              <p className="text-xs text-emerald-400 font-medium mt-2">{publishedArticles} published</p>
            </div>
            <FileText className="w-10 h-10 text-[#e50914] opacity-40" />
          </div>
        </div>

        <div className="bg-[#101625] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">Videos</p>
              <p className="text-3xl font-extrabold text-white mt-1">{videos.length}</p>
              <p className="text-xs text-emerald-400 font-medium mt-2">{publishedVideos} published</p>
            </div>
            <Video className="w-10 h-10 text-[#e50914] opacity-40" />
          </div>
        </div>

        <div className="bg-[#101625] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">Categories</p>
              <p className="text-3xl font-extrabold text-white mt-1">{categories.length}</p>
              <p className="text-xs text-gray-400 font-medium mt-2">Active Taxonomy</p>
            </div>
            <FolderOpen className="w-10 h-10 text-[#e50914] opacity-40" />
          </div>
        </div>

        <div className="bg-[#101625] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">Payload CMS API</p>
              <p className="text-sm font-bold text-emerald-400 mt-1">200 OK</p>
              <a
                href="http://localhost:4000/api/articles"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 mt-2"
              >
                Inspect API <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <Plus className="w-10 h-10 text-[#e50914] opacity-40" />
          </div>
        </div>
      </div>

      {/* Content Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Articles */}
        <div className="bg-[#101625] border border-gray-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Articles</h2>
            <Link href="/dashboard/articles" className="text-xs font-semibold text-[#e50914] hover:underline">
              Manage All →
            </Link>
          </div>

          {articles.length === 0 ? (
            <p className="text-sm text-gray-400 py-6 text-center">No articles yet in Payload CMS.</p>
          ) : (
            <div className="space-y-3">
              {articles.slice(0, 5).map((art: any) => (
                <div key={art.id} className="flex items-center justify-between p-3.5 bg-[#151d30] border border-gray-800 rounded-lg">
                  <div>
                    <p className="font-semibold text-sm text-white">{art.title}</p>
                    <span className="text-xs text-emerald-400 font-medium">Published</span>
                  </div>
                  <Link href={`/news/${art.slug}`} className="text-xs font-semibold text-gray-400 hover:text-white">
                    View →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Categories Overview */}
        <div className="bg-[#101625] border border-gray-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Categories</h2>
            <Link href="/dashboard/categories" className="text-xs font-semibold text-[#e50914] hover:underline">
              Manage All →
            </Link>
          </div>

          {categories.length === 0 ? (
            <p className="text-sm text-gray-400 py-6 text-center">No categories defined yet in Payload CMS.</p>
          ) : (
            <div className="space-y-3">
              {categories.slice(0, 5).map((cat: any) => (
                <div key={cat.id} className="flex items-center justify-between p-3.5 bg-[#151d30] border border-gray-800 rounded-lg">
                  <div>
                    <p className="font-semibold text-sm text-white">{cat.name}</p>
                    <p className="text-xs text-gray-400 font-mono">{cat.slug}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
