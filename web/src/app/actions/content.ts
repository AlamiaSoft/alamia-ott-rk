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

export async function getPublishedVideos(categoryId?: string) {
  try {
    const videos = await getCmsVideos({ publishedOnly: true, categoryId })
    const formatted = videos.map((v: any) => {
      const rawThumb = typeof v.thumbnail === 'object' ? v.thumbnail?.url : v.thumbnail
      const rawFile = typeof v.videoFile === 'object' ? v.videoFile?.url : v.videoFile
      return {
        id: v.id,
        title: v.title,
        slug: v.slug,
        description: v.description,
        thumbnailUrl: normalizeCmsUrl(rawThumb),
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

    const rawThumb = typeof videoData.thumbnail === 'object' ? videoData.thumbnail?.url : videoData.thumbnail
    const rawFile = typeof videoData.videoFile === 'object' ? videoData.videoFile?.url : videoData.videoFile

    return {
      success: true,
      data: {
        ...videoData,
        thumbnailUrl: normalizeCmsUrl(rawThumb),
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
