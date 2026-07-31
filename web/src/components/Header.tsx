import Link from 'next/link';
import { PlaySquare, Newspaper, User, Search, Crown } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { getCurrentUser } from '@/app/actions/auth';
import AuthButtons from './AuthButtons';
import MobileMenu from './MobileMenu';
import SearchInput from './SearchInput';

export default async function Header() {
  const { user } = await getCurrentUser();

  return (
    <>
      <div className="h-[73px]" />
      <header className="fixed top-0 w-full z-50 bg-brand-dark border-b border-brand-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-xl font-black tracking-tight text-white">
            <img
              src="/checkmate-logo.jpg"
              alt="Checkmate Media Logo"
              className="w-9 h-9 rounded-md object-cover border border-brand-accent/50 shadow-sm"
            />
            <div className="flex items-center gap-1.5 font-sans">
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
            <PlaySquare className="w-4 h-4" /> Video
          </Link>
          <Link href="/creators" className="hover:text-brand-accent transition-colors flex items-center gap-1.5 font-bold text-white">
            <User className="w-4 h-4 text-brand-accent" /> For Creators
          </Link>
          <Link href="/premium" className="hover:text-brand-goldLight transition-colors flex items-center gap-1.5 font-bold text-brand-accent">
            <Crown className="w-4 h-4" /> Premium
          </Link>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden md:flex items-center gap-3 sm:gap-4">
            <ThemeToggle />
            <SearchInput />
            <AuthButtons user={user} />
          </div>
          <div className="md:hidden">
            <MobileMenu user={user} />
          </div>
        </div>
        </div>
      </header>
    </>
  );
}
