import Link from 'next/link';
import { PlaySquare, Newspaper, User, Search, Crown } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { getCurrentUser } from '@/app/actions/auth';
import AuthButtons from './AuthButtons';

export default async function Header() {
  const { user } = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 bg-brand-dark/95 backdrop-blur border-b border-brand-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-xl font-black tracking-tight text-white">
          <img
            src="/checkmate-logo.jpg"
            alt="Checkmate Media Logo"
            className="w-9 h-9 rounded-md object-cover border border-brand-accent/50 shadow-sm"
          />
          <div className="hidden sm:flex items-center gap-1.5 font-sans">
            <span className="text-white uppercase tracking-wider font-bold">CHECKMATE</span>
            <span className="text-brand-accent uppercase tracking-wider font-bold">MEDIA</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-muted">
          <Link href="/" className="hover:text-brand-goldLight transition-colors">Home</Link>
          <Link href="/news" className="hover:text-brand-goldLight transition-colors flex items-center gap-1.5">
            <Newspaper className="w-4 h-4" /> News
          </Link>
          <Link href="/videos" className="hover:text-brand-goldLight transition-colors flex items-center gap-1.5">
            <PlaySquare className="w-4 h-4" /> Videos & OTT
          </Link>
          <Link href="/creators" className="hover:text-brand-accent transition-colors flex items-center gap-1.5 font-bold text-white">
            <User className="w-4 h-4 text-brand-accent" /> For Creators
          </Link>
          <Link href="/premium" className="hover:text-brand-goldLight transition-colors flex items-center gap-1.5 font-bold text-brand-accent">
            <Crown className="w-4 h-4" /> Premium
          </Link>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />

          <button className="p-2 text-brand-muted hover:text-white transition-colors rounded-full hover:bg-brand-card">
            <Search className="w-5 h-5" />
          </button>
          
          <AuthButtons user={user} />
        </div>
      </div>
    </header>
  );
}
