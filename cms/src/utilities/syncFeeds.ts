import { Payload } from 'payload'
import Parser from 'rss-parser'

export async function syncSocialFeeds(payload: Payload, feedId?: string) {
  const parser = new Parser()
  let importedCount = 0

  const whereClause: any = {
    status: { equals: 'active' },
  }
  if (feedId) {
    whereClause.id = { equals: feedId }
  }

  try {
    const feedsRes = await payload.find({
      collection: 'social-feeds' as any,
      where: whereClause,
    })

    for (const feed of feedsRes.docs) {
      if (!feed.sourceUrl) continue
      try {
        const parsedFeed = await parser.parseURL(feed.sourceUrl)
        const latestItems = parsedFeed.items.slice(0, 10)

        for (const item of latestItems) {
          const existing = await payload.find({
            collection: 'posts',
            where: { title: { equals: item.title } },
            limit: 1,
          })

          if (existing.docs.length > 0) continue

          let excerpt = item.contentSnippet || item.description || ''
          if (excerpt.length > 150) {
            excerpt = excerpt.substring(0, 147) + '...'
          }

          let contentText = item.content || item.contentSnippet || item.description || ''
          if (item.link) {
            contentText += `\n\nOriginal link: ${item.link}`
          }

          await payload.create({
            collection: 'posts',
            data: {
              title: item.title || 'Untitled Post',
              _status: 'published',
              isPremium: false,
              excerpt: excerpt,
              publishedAt: item.isoDate || item.pubDate || new Date().toISOString(),
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
                          text: contentText,
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
          importedCount++
        }
      } catch (feedError) {
        console.error(`Failed to sync feed ${feed.name}:`, feedError)
      }
    }
    return importedCount
  } catch (error) {
    console.error('Error in syncSocialFeeds:', error)
    throw error
  }
}
