'use server'

import { getCmsArticles, getCmsVideos, getCmsCategories, normalizeCmsUrl } from '@/lib/cms-client'

export async function getPublishedArticles(categoryId?: string) {
  try {
    const articles = await getCmsArticles({ publishedOnly: true, categoryId })
    const formatted = articles.map((a: any) => {
      const rawImg = typeof a.featuredImage === 'object' ? a.featuredImage?.url : a.featuredImage
      return {
        id: a.id,
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        featuredImage: normalizeCmsUrl(rawImg),
        isPremium: a.isPremium || false,
        externalEmbedUrl: a.externalEmbedUrl || null,
        externalProvider: a.externalProvider || null,
        externalImageUrl: a.externalImageUrl || null,
        publishedAt: a.publishedAt ? new Date(a.publishedAt) : new Date(a.createdAt),
        category: typeof a.category === 'object' ? a.category : undefined,
      }
    })

    return { success: true, data: formatted }
  } catch (error) {
    console.error('[CMS Content] Error fetching articles:', error)
    return { success: false, error: 'Failed to fetch articles' }
  }
}

function resolveVideoThumbnail(thumbnail: any, externalEmbedUrl?: string): string | null {
  const rawThumb = typeof thumbnail === 'object' ? thumbnail?.url : thumbnail
  let resolvedThumbUrl = normalizeCmsUrl(rawThumb)
  
  if (!resolvedThumbUrl && externalEmbedUrl) {
    const url = externalEmbedUrl.toLowerCase()
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      try {
        const videoId = externalEmbedUrl.includes('v=')
          ? new URL(externalEmbedUrl).searchParams.get('v')
          : externalEmbedUrl.split('youtu.be/')[1]?.split('?')[0]
        if (videoId) {
          return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        }
      } catch (e) {}
    } else if (url.includes('vimeo.com')) {
      try {
        const videoId = externalEmbedUrl.split('vimeo.com/')[1]?.split('/')[0]
        if (videoId) {
          return `https://vumbnail.com/${videoId}.jpg`
        }
      } catch (e) {}
    }
  }
  
  return resolvedThumbUrl || null
}

export async function getPublishedVideos(categoryId?: string) {
  try {
    const videos = await getCmsVideos({ publishedOnly: true, categoryId })
    const formatted = videos.map((v: any) => {
      const rawFile = typeof v.videoFile === 'object' ? v.videoFile?.url : v.videoFile
      return {
        id: v.id,
        title: v.title,
        slug: v.slug,
        description: v.description,
        thumbnailUrl: resolveVideoThumbnail(v.thumbnail, v.externalEmbedUrl),
        videoUrl: normalizeCmsUrl(rawFile),
        duration: v.durationSeconds,
        isPremium: v.isPremium || false,
        publishedAt: v.publishedAt ? new Date(v.publishedAt) : new Date(v.createdAt),
        category: typeof v.category === 'object' ? v.category : undefined,
      }
    })

    return { success: true, data: formatted }
  } catch (error) {
    console.error('[CMS Content] Error fetching videos:', error)
    return { success: false, error: 'Failed to fetch videos' }
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    const articles = await getCmsArticles({ publishedOnly: true })
    const articleData = articles.find((a: any) => a.slug === slug)

    if (!articleData) {
      return { success: false, error: 'Article not found' }
    }

    const rawImg = typeof articleData.featuredImage === 'object' ? articleData.featuredImage?.url : articleData.featuredImage

    return {
      success: true,
      data: {
        ...articleData,
        featuredImage: normalizeCmsUrl(rawImg),
        content: typeof articleData.content === 'string' ? articleData.content : JSON.stringify(articleData.content),
      },
    }
  } catch (error) {
    console.error('[CMS Content] Error fetching article:', error)
    return { success: false, error: 'Failed to fetch article' }
  }
}

export async function getVideoBySlug(slug: string) {
  try {
    const videos = await getCmsVideos({ publishedOnly: true })
    const videoData = videos.find((v: any) => v.slug === slug)

    if (!videoData) {
      return { success: false, error: 'Video not found' }
    }

    const rawFile = typeof videoData.videoFile === 'object' ? videoData.videoFile?.url : videoData.videoFile

    return {
      success: true,
      data: {
        ...videoData,
        thumbnailUrl: resolveVideoThumbnail(videoData.thumbnail, videoData.externalEmbedUrl),
        videoUrl: normalizeCmsUrl(rawFile),
        externalEmbedUrl: videoData.externalEmbedUrl || null,
        externalProvider: videoData.externalProvider || null,
      },
    }
  } catch (error) {
    console.error('[CMS Content] Error fetching video:', error)
    return { success: false, error: 'Failed to fetch video' }
  }
}

export async function getCategories() {
  try {
    const categories = await getCmsCategories()
    return { success: true, data: categories }
  } catch (error) {
    console.error('[CMS Content] Error fetching categories:', error)
    return { success: false, error: 'Failed to fetch categories' }
  }
}
