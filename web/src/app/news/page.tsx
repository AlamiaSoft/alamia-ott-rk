import Link from 'next/link';

export default function NewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <h1 className="text-3xl font-extrabold text-white">News & Editorial Articles</h1>
      <p className="text-brand-muted">Browse published news stories, investigative reports, and editorial columns.</p>
      
      <div className="bg-brand-card border border-brand-border rounded-xl p-8 text-center space-y-4">
        <p className="text-brand-muted">Editorial articles managed directly via Payload CMS backend.</p>
        <Link href="/" className="inline-block bg-brand-accent text-white px-4 py-2 rounded-lg font-semibold text-sm">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
