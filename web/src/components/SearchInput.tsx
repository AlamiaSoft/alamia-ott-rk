'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export default function SearchInput() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
      setQuery('')
    }
  }

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-brand-muted hover:text-white transition-colors rounded-full hover:bg-brand-card"
        title="Search"
      >
        <Search className="w-5 h-5" />
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          autoFocus
          onBlur={() => {
            if (!query.trim()) setIsOpen(false)
          }}
          className="w-48 sm:w-64 bg-brand-dark/50 border border-brand-accent/50 text-white px-4 py-1.5 rounded-full text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
        />
        <button type="submit" className="absolute right-3 text-brand-muted hover:text-brand-accent">
          <Search className="w-4 h-4" />
        </button>
      </div>
    </form>
  )
}
