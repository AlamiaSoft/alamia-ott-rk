import Link from 'next/link'
import { Home, FileText, Video, FolderOpen, ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Editor Dashboard — Alamia OTT',
  description: 'Editor dashboard powered by Payload CMS 3',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#090d16] text-gray-100 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-[#0d1322] border-r border-gray-800 p-6 flex flex-col justify-between">
          <div>
            <Link href="/dashboard" className="flex items-center space-x-3 mb-8">
              <div className="w-8 h-8 bg-[#e50914] rounded-lg flex items-center justify-center font-bold text-white text-sm">
                RK
              </div>
              <span className="text-lg font-bold tracking-tight text-white">Editor Studio</span>
            </Link>

            <nav className="space-y-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <Home className="w-4 h-4 text-gray-400" />
                Overview
              </Link>
              <Link
                href="/dashboard/articles"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <FileText className="w-4 h-4 text-gray-400" />
                Articles
              </Link>
              <Link
                href="/dashboard/videos"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <Video className="w-4 h-4 text-gray-400" />
                Videos
              </Link>
              <Link
                href="/dashboard/categories"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <FolderOpen className="w-4 h-4 text-gray-400" />
                Categories
              </Link>
            </nav>
          </div>

          <div className="pt-6 border-t border-gray-800">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-[#e50914] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Exit to Public Web Portal
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
