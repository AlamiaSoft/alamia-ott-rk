'use server'

import {
  getCmsArticles,
  createCmsArticle,
  deleteCmsArticle,
  getCmsVideos,
  createCmsVideo,
  deleteCmsVideo,
  getCmsCategories,
  createCmsCategory,
} from '@/lib/cms-client'
import { revalidatePath } from 'next/cache'

// Article Operations
export async function createArticle(data: {
  title: string
  slug: string
  content: string
  excerpt?: string
  featuredImageId?: string
  categoryId?: string
  isPremium: boolean
}) {
  try {
    const res = await createCmsArticle({
      ...data,
      status: 'published',
    })

    if (!res.success) {
      return { success: false, error: res.error || 'Failed to create article in Payload CMS' }
    }

    revalidatePath('/dashboard/articles')
    revalidatePath('/news')
    revalidatePath('/articles')
    revalidatePath('/')
    return { success: true, data: res.data }
  } catch (error: any) {
    console.error('[web] Error creating article:', error)
    return { success: false, error: error?.message || 'Failed to create article' }
  }
}

export async function deleteArticle(id: string) {
  try {
    const success = await deleteCmsArticle(id)
    if (success) {
      revalidatePath('/dashboard/articles')
      revalidatePath('/news')
      revalidatePath('/articles')
      revalidatePath('/')
      return { success: true }
    }
    return { success: false, error: 'Failed to delete article' }
  } catch (error) {
    console.error('[web] Error deleting article:', error)
    return { success: false, error: 'Failed to delete article' }
  }
}

export async function getEditorArticles() {
  try {
    const articles = await getCmsArticles()
    const formatted = articles.map((a: any) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      featuredImage: typeof a.featuredImage === 'object' ? a.featuredImage?.url : a.featuredImage,
      isPremium: a.isPremium || false,
      isPublished: a.status === 'published',
      publishedAt: a.publishedAt ? new Date(a.publishedAt) : new Date(a.createdAt),
      createdAt: a.createdAt,
    }))

    return { success: true, data: formatted }
  } catch (error) {
    console.error('[web] Error fetching editor articles:', error)
    return { success: false, error: 'Failed to fetch articles' }
  }
}

// Video Operations
export async function createVideo(data: {
  title: string
  slug: string
  description?: string
  videoFileId?: string
  thumbnailId?: string
  durationSeconds?: number
  categoryId?: string
  isPremium: boolean
  hlsPlaylistUrl?: string
}) {
  try {
    const res = await createCmsVideo(data)
    if (!res.success) {
      return { success: false, error: res.error || 'Failed to create video in Payload CMS' }
    }

    revalidatePath('/dashboard/videos')
    revalidatePath('/videos')
    revalidatePath('/')
    return { success: true, data: res.data }
  } catch (error: any) {
    console.error('[web] Error creating video:', error)
    return { success: false, error: error?.message || 'Failed to create video' }
  }
}

export async function deleteVideo(id: string) {
  try {
    const success = await deleteCmsVideo(id)
    if (success) {
      revalidatePath('/dashboard/videos')
      revalidatePath('/videos')
      revalidatePath('/')
      return { success: true }
    }
    return { success: false, error: 'Failed to delete video' }
  } catch (error) {
    console.error('[web] Error deleting video:', error)
    return { success: false, error: 'Failed to delete video' }
  }
}

export async function getEditorVideos() {
  try {
    const videos = await getCmsVideos()
    const formatted = videos.map((v: any) => ({
      id: v.id,
      title: v.title,
      slug: v.slug,
      description: v.description,
      thumbnailUrl: typeof v.thumbnail === 'object' ? v.thumbnail?.url : v.thumbnail,
      duration: v.durationSeconds,
      isPremium: v.isPremium || false,
      isPublished: v.status === 'ready',
      publishedAt: v.publishedAt ? new Date(v.publishedAt) : new Date(v.createdAt),
      createdAt: v.createdAt,
    }))

    return { success: true, data: formatted }
  } catch (error) {
    console.error('[web] Error fetching editor videos:', error)
    return { success: false, error: 'Failed to fetch videos' }
  }
}

// Category Operations
export async function createCategory(data: {
  name: string
  slug: string
  description?: string
}) {
  try {
    const res = await createCmsCategory(data)
    if (!res.success) {
      return { success: false, error: res.error || 'Failed to create category in Payload CMS' }
    }

    revalidatePath('/dashboard/categories')
    return { success: true, data: res.data }
  } catch (error: any) {
    console.error('[web] Error creating category:', error)
    return { success: false, error: error?.message || 'Failed to create category' }
  }
}

export async function getEditorCategories() {
  try {
    const categories = await getCmsCategories()
    return { success: true, data: categories }
  } catch (error) {
    console.error('[web] Error fetching categories:', error)
    return { success: false, error: 'Failed to fetch categories' }
  }
}
