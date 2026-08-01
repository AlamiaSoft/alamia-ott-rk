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
          const cleanTitle = item.title || 'Untitled Post'
          const computedSlug = cleanTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') || `post-${Date.now()}`

          const existing = await payload.find({
            collection: 'posts',
            where: {
              or: [
                { title: { equals: cleanTitle } },
                { slug: { equals: computedSlug } }
              ]
            },
            limit: 1,
          })

          if (existing.docs.length > 0) continue

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
          } else if (urlLower.includes('facebook.com')) {
            externalEmbedUrl = linkUrl
            externalProvider = 'facebook'
          } else if (urlLower.includes('instagram.com')) {
            externalEmbedUrl = linkUrl
            externalProvider = 'instagram'
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

          await payload.create({
            collection: 'posts',
            draft: false,
            data: {
              title: cleanTitle,
              slug: computedSlug,
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
            } as any,
            context: {
              disableRevalidate: true
            }
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
