import { getPayload } from 'payload'
import config from '../payload.config'
import fetch from 'node-fetch'
import Parser from 'rss-parser'

/**
 * Utility script to import posts from a public RSS feed or JSON API into Payload CMS.
 * Usage: npx tsx src/scripts/import-posts.ts
 */
async function run() {
  const payload = await getPayload({ config })
  const parser = new Parser()
  
  console.log('Starting bulk import process...')
  
  try {
    const feedsRes = await payload.find({
      collection: 'social-feeds' as any,
      where: {
        status: { equals: 'active' }
      }
    })

    if (feedsRes.docs.length === 0) {
      console.log('No active feeds found in SocialFeeds collection.')
      process.exit(0)
    }

    for (const feed of feedsRes.docs) {
      console.log(`Processing feed: ${feed.name} (${feed.sourceUrl})`)
      
      try {
        const parsedFeed = await parser.parseURL(feed.sourceUrl)
        console.log(`Fetched ${parsedFeed.items.length} items from ${feed.name}`)

        // Limit to 10 latest to avoid spamming the DB on each run
        const latestItems = parsedFeed.items.slice(0, 10)

        for (const item of latestItems) {
          // Check if post already exists based on title to avoid duplicates
          const existing = await payload.find({
            collection: 'posts',
            where: {
              title: { equals: item.title }
            },
            limit: 1
          })

          if (existing.docs.length > 0) {
            console.log(`Post already exists: ${item.title} (Skipping)`)
            continue
          }

          // Extract excerpt from contentSnippet or description
          let excerpt = item.contentSnippet || item.description || ''
          if (excerpt.length > 150) {
            excerpt = excerpt.substring(0, 147) + '...'
          }

          // Detect video provider for RSS item
          let externalEmbedUrl: string | undefined = undefined
          let externalProvider: string | undefined = undefined

          const linkUrl = item.link || ''
          const urlLower = linkUrl.toLowerCase()
          if (feed.platform === 'youtube' || urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
            externalEmbedUrl = linkUrl
            externalProvider = 'youtube'
          } else if (urlLower.includes('vimeo.com')) {
            externalEmbedUrl = linkUrl
            externalProvider = 'vimeo'
          }

          // Robust RSS thumbnail parsing (saved as external URL hotlink to avoid large disk space usage)
          let imageUrl = ''

          if (item.enclosure && item.enclosure.url && item.enclosure.type?.startsWith('image/')) {
            imageUrl = item.enclosure.url
          } else {
            const mediaContent = (item as any)['media:content'] || (item as any)['media:thumbnail']
            if (mediaContent) {
              if (Array.isArray(mediaContent)) {
                const firstImage = mediaContent.find((m: any) => m.$?.url || m.url)
                if (firstImage) imageUrl = firstImage.$?.url || firstImage.url
              } else {
                imageUrl = mediaContent.$?.url || mediaContent.url
              }
            }
          }

          // Build structured Lexical content nodes supporting hyperlinked original link
          const lexicalParagraphChildren: any[] = [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: item.content || item.contentSnippet || item.description || '',
              type: 'text',
              version: 1,
            }
          ]

          if (item.link) {
            lexicalParagraphChildren.push({
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: '\n\nOriginal link: ',
              type: 'text',
              version: 1,
            })

            lexicalParagraphChildren.push({
              type: 'link',
              version: 2,
              fields: {
                url: item.link,
                newTab: true,
                linkType: 'custom',
              },
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: item.link,
                  type: 'text',
                  version: 1,
                }
              ]
            })
          }

          // Create in payload
          const created = await payload.create({
            collection: 'posts',
            draft: false,
            data: {
              title: item.title || 'Untitled Post',
              _status: 'published',
              isPremium: false,
              excerpt: excerpt,
              publishedAt: item.isoDate || item.pubDate || new Date().toISOString(),
              externalEmbedUrl: externalEmbedUrl,
              externalProvider: externalProvider,
              externalImageUrl: imageUrl || null,
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
                      children: lexicalParagraphChildren,
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
      } catch (feedError) {
        console.error(`Failed to parse feed ${feed.name}:`, feedError)
      }
    }
  } catch (error) {
    console.error('Error during import:', error)
  }

  console.log('Bulk import complete.')
  process.exit(0)
}

run()
