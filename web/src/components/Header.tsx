import Link from 'next/link';
import Image from 'next/image';
import { PlaySquare, Newspaper, User, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-brand-dark/95 backdrop-blur border-b border-brand-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-xl font-black tracking-tight text-white">
          <img
            src="/checkmate-logo.jpg"
            alt="Checkmate Media Logo"
            className="w-9 h-9 rounded-md object-cover border border-amber-500/40 shadow-sm"
          />
          <div className="flex items-center gap-1.5">
            <span className="text-white uppercase tracking-wider font-extrabold">CHECKMATE</span>
            <span className="text-brand-accent uppercase tracking-wider font-extrabold">MEDIA</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-muted">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/news" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Newspaper className="w-4 h-4" /> News
          </Link>
          <Link href="/videos" className="hover:text-white transition-colors flex items-center gap-1.5">
            <PlaySquare className="w-4 h-4" /> Videos & OTT
          </Link>
          <Link href="/opinion" className="hover:text-white transition-colors">Opinion</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-brand-muted hover:text-white transition-colors rounded-full hover:bg-brand-card">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/login" className="flex items-center gap-2 text-sm font-medium bg-brand-card hover:bg-brand-border px-4 py-2 rounded-lg border border-brand-border text-white transition-colors">
            <User className="w-4 h-4" /> Log In
          </Link>
        </div>
      </div>
    </header>
  );
}
