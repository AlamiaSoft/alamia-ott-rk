import Link from 'next/link';

export default function VideosPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <h1 className="text-3xl font-extrabold text-white">Videos & OTT Streaming Library</h1>
      <p className="text-brand-muted">Explore high-definition HLS video streams, interviews, and documentaries.</p>
      
      <div className="bg-brand-card border border-brand-border rounded-xl p-8 text-center space-y-4">
        <p className="text-brand-muted">Videos automatically transcoded to HLS via FFmpeg background worker.</p>
        <Link href="/" className="inline-block bg-brand-accent text-white px-4 py-2 rounded-lg font-semibold text-sm">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
