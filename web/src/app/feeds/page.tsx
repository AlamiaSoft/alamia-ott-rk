import { Share2, Rss } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getFeeds() {
  const CMS_BASE_URL = process.env.CMS_INTERNAL_URL || process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:4000'
  try {
    const res = await fetch(`${CMS_BASE_URL}/api/social-feeds?where[status][equals]=active`, { cache: 'no-store' })
    if (!res.ok) return []
    const json = await res.json()
    return json.docs || []
  } catch (e) {
    console.error('Failed to fetch feeds:', e)
    return []
  }
}

export default async function SocialFeedsPage() {
  const feeds = await getFeeds()

  const youtubeFeeds = feeds.filter((f: any) => f.platform === 'youtube')
  const twitterFeeds = feeds.filter((f: any) => f.platform === 'twitter')
  const instagramFeeds = feeds.filter((f: any) => f.platform === 'instagram')

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="border-b border-brand-border pb-8">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
          <Share2 className="w-10 h-10 text-brand-accent" /> Social Feeds
        </h1>
        <p className="text-brand-muted text-lg mt-2">
          Discover our curated feeds from across the web.
        </p>
      </div>

      {feeds.length === 0 ? (
        <div className="bg-brand-card/30 border border-brand-border/30 rounded-2xl p-16 text-center space-y-4">
          <div className="w-20 h-20 bg-brand-dark rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Rss className="w-10 h-10 text-brand-muted opacity-50" />
          </div>
          <h3 className="text-xl font-bold text-white">No Feeds Configured</h3>
          <p className="text-brand-muted text-sm max-w-sm mx-auto">Feeds will appear here once configured in the CMS.</p>
        </div>
      ) : (
        <div className="space-y-16">
          {youtubeFeeds.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-white border-l-4 border-[#FF0000] pl-3">YouTube Channels</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {youtubeFeeds.map((feed: any) => (
                  <div key={feed.id} className="bg-brand-card rounded-xl p-6 border border-brand-border hover:border-[#FF0000]/50 transition-colors">
                    <h3 className="text-xl font-bold text-white mb-2">{feed.name}</h3>
                    <p className="text-brand-muted text-sm mb-4">{feed.description || 'Follow our latest YouTube videos.'}</p>
                    <a href={feed.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center text-[#FF0000] font-bold text-sm hover:underline">
                      Visit Channel
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}

          {twitterFeeds.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-white border-l-4 border-[#1DA1F2] pl-3">Twitter Timelines</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {twitterFeeds.map((feed: any) => (
                  <div key={feed.id} className="bg-brand-card rounded-xl p-6 border border-brand-border hover:border-[#1DA1F2]/50 transition-colors">
                    <h3 className="text-xl font-bold text-white mb-2">{feed.name}</h3>
                    <p className="text-brand-muted text-sm mb-4">{feed.description || 'Follow our Twitter updates.'}</p>
                    <a href={feed.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center text-[#1DA1F2] font-bold text-sm hover:underline">
                      View Profile
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}

          {instagramFeeds.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-white border-l-4 border-[#E1306C] pl-3">Instagram Profiles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {instagramFeeds.map((feed: any) => (
                  <div key={feed.id} className="bg-brand-card rounded-xl p-6 border border-brand-border hover:border-[#E1306C]/50 transition-colors">
                    <h3 className="text-xl font-bold text-white mb-2">{feed.name}</h3>
                    <p className="text-brand-muted text-sm mb-4">{feed.description || 'Follow our Instagram photos and reels.'}</p>
                    <a href={feed.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center text-[#E1306C] font-bold text-sm hover:underline">
                      View Instagram
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
