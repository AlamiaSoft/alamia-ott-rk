import { getPayload } from 'payload'
import config from '../payload.config'
import fetch from 'node-fetch'

/**
 * Utility script to import posts from a public RSS feed or JSON API into Payload CMS.
 * Usage: npx tsx src/scripts/import-posts.ts
 */
async function run() {
  const payload = await getPayload({ config })
  
  console.log('Starting bulk import process...')

  // Placeholder logic for importing an RSS feed
  // In a real scenario, you'd use a library like 'rss-parser' to parse an XML feed.
  // Here we simulate fetching from a generic JSON API for demonstration.
  
  try {
    const feedsRes = await payload.find({
      collection: 'social-feeds' as any,
      where: {
        platform: { equals: 'rss' },
        status: { equals: 'active' }
      }
    })

    if (feedsRes.docs.length === 0) {
      console.log('No active RSS feeds found in SocialFeeds collection.')
      process.exit(0)
    }

    for (const feed of feedsRes.docs) {
      console.log(`Processing feed: ${feed.name} (${feed.sourceUrl})`)
      
      // Simulate fetching items
      // const items = await parseRSS(feed.sourceUrl)
      const mockItems = [
        {
          title: `Imported Story from ${feed.name}`,
          content: 'This is a sample imported content block.',
          slug: `imported-story-${Date.now()}`
        }
      ]

      for (const item of mockItems) {
        // Create in payload
        const created = await payload.create({
          collection: 'posts',
          data: {
            title: item.title,
            _status: 'published',
            isPremium: false,
            content: {
              root: {
                type: 'root',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    type: 'paragraph',
                    format: '',
                    indent: 0,
                    version: 1,
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: item.content,
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                ],
                direction: 'ltr',
              },
            }
          } as any
        })
        console.log(`Successfully created post: ${created.id}`)
      }
    }
  } catch (error) {
    console.error('Error during import:', error)
  }

  console.log('Bulk import complete.')
  process.exit(0)
}

run()
