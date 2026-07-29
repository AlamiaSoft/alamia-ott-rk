'use server'

import { getCmsArticles, getCmsVideos, getCmsCategories } from '@/lib/cms-client'

export async function getPublishedArticles(categoryId?: string) {
  try {
    const articles = await getCmsArticles({ publishedOnly: true, categoryId })
    const formatted = articles.map((a: any) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      featuredImage: typeof a.featuredImage === 'object' ? a.featuredImage?.url : a.featuredImage,
      isPremium: a.isPremium || false,
      publishedAt: a.publishedAt ? new Date(a.publishedAt) : new Date(a.createdAt),
      category: typeof a.category === 'object' ? a.category : undefined,
    }))

    return { success: true, data: formatted }
  } catch (error) {
    console.error('[CMS Content] Error fetching articles:', error)
    return { success: false, error: 'Failed to fetch articles' }
  }
}

export async function getPublishedVideos(categoryId?: string) {
  try {
    const videos = await getCmsVideos({ publishedOnly: true, categoryId })
    const formatted = videos.map((v: any) => ({
      id: v.id,
      title: v.title,
      slug: v.slug,
      description: v.description,
      thumbnailUrl: typeof v.thumbnail === 'object' ? v.thumbnail?.url : v.thumbnail,
      duration: v.durationSeconds,
      isPremium: v.isPremium || false,
      publishedAt: v.publishedAt ? new Date(v.publishedAt) : new Date(v.createdAt),
      category: typeof v.category === 'object' ? v.category : undefined,
    }))

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

    return {
      success: true,
      data: {
        ...articleData,
        featuredImage: typeof articleData.featuredImage === 'object' ? articleData.featuredImage?.url : articleData.featuredImage,
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

    return {
      success: true,
      data: {
        ...videoData,
        thumbnailUrl: typeof videoData.thumbnail === 'object' ? videoData.thumbnail?.url : videoData.thumbnail,
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
