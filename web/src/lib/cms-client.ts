const CMS_BASE_URL =
  (typeof window === 'undefined'
    ? process.env.CMS_INTERNAL_URL || process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:4000'
    : process.env.NEXT_PUBLIC_CMS_URL) || 'http://localhost:4000';

export interface CmsCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface CmsMedia {
  id: string;
  url: string;
  filename?: string;
  alt?: string;
}

export interface CmsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: any;
  featuredImage?: string | CmsMedia;
  category?: string | CmsCategory;
  status: 'draft' | 'published';
  isPremium: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CmsVideo {
  id: string;
  title: string;
  slug: string;
  description?: string;
  videoFile?: string | CmsMedia;
  thumbnail?: string | CmsMedia;
  durationSeconds?: number;
  category?: string | CmsCategory;
  status: 'pending' | 'processing' | 'ready' | 'failed';
  isPremium: boolean;
  hlsPlaylistUrl?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Media Upload Helper
export async function uploadCmsMedia(file: File | Blob, filename: string): Promise<CmsMedia | null> {
  try {
    const formData = new FormData();
    formData.append('file', file, filename);

    const res = await fetch(`${CMS_BASE_URL}/api/media`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      console.error('[CMS Client] Media upload failed:', await res.text());
      return null;
    }

    const json = await res.json();
    return json.doc || json;
  } catch (error) {
    console.error('[CMS Client] Error uploading media:', error);
    return null;
  }
}

// Categories API
export async function getCmsCategories(): Promise<CmsCategory[]> {
  try {
    const res = await fetch(`${CMS_BASE_URL}/api/categories?limit=100`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.docs || [];
  } catch (error) {
    console.error('[CMS Client] Error fetching categories:', error);
    return [];
  }
}

export async function createCmsCategory(data: { name: string; slug: string; description?: string }): Promise<CmsCategory | null> {
  try {
    const res = await fetch(`${CMS_BASE_URL}/api/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.doc || json;
  } catch (error) {
    console.error('[CMS Client] Error creating category:', error);
    return null;
  }
}

// Articles API
export async function getCmsArticles(options?: { publishedOnly?: boolean; categoryId?: string }): Promise<CmsArticle[]> {
  try {
    const queryParams = new URLSearchParams();
    queryParams.set('limit', '100');
    queryParams.set('sort', '-createdAt');

    if (options?.publishedOnly) {
      queryParams.set('where[status][equals]', 'published');
    }
    if (options?.categoryId) {
      queryParams.set('where[category][equals]', options.categoryId);
    }

    const res = await fetch(`${CMS_BASE_URL}/api/articles?${queryParams.toString()}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.docs || [];
  } catch (error) {
    console.error('[CMS Client] Error fetching articles:', error);
    return [];
  }
}

export async function createCmsArticle(data: {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImageId?: string;
  categoryId?: string;
  status?: 'draft' | 'published';
  isPremium?: boolean;
}): Promise<CmsArticle | null> {
  try {
    const payload: any = {
      title: data.title,
      slug: data.slug,
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
                  text: data.content || '',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
            },
          ],
          direction: 'ltr',
        },
      },
      excerpt: data.excerpt,
      status: data.status || 'draft',
      isPremium: Boolean(data.isPremium),
    };

    if (data.featuredImageId) payload.featuredImage = data.featuredImageId;
    if (data.categoryId) payload.category = data.categoryId;

    const res = await fetch(`${CMS_BASE_URL}/api/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error('[CMS Client] Create article failed:', await res.text());
      return null;
    }

    const json = await res.json();
    return json.doc || json;
  } catch (error) {
    console.error('[CMS Client] Error creating article:', error);
    return null;
  }
}

export async function deleteCmsArticle(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${CMS_BASE_URL}/api/articles/${id}`, { method: 'DELETE' });
    return res.ok;
  } catch (error) {
    console.error('[CMS Client] Error deleting article:', error);
    return false;
  }
}

// Videos API
export async function getCmsVideos(options?: { publishedOnly?: boolean; categoryId?: string }): Promise<CmsVideo[]> {
  try {
    const queryParams = new URLSearchParams();
    queryParams.set('limit', '100');
    queryParams.set('sort', '-createdAt');

    if (options?.publishedOnly) {
      queryParams.set('where[status][equals]', 'ready');
    }
    if (options?.categoryId) {
      queryParams.set('where[category][equals]', options.categoryId);
    }

    const res = await fetch(`${CMS_BASE_URL}/api/videos?${queryParams.toString()}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.docs || [];
  } catch (error) {
    console.error('[CMS Client] Error fetching videos:', error);
    return [];
  }
}

export async function createCmsVideo(data: {
  title: string;
  slug: string;
  description?: string;
  videoFileId?: string;
  thumbnailId?: string;
  durationSeconds?: number;
  categoryId?: string;
  isPremium?: boolean;
  hlsPlaylistUrl?: string;
}): Promise<CmsVideo | null> {
  try {
    const payload: any = {
      title: data.title,
      slug: data.slug,
      description: data.description,
      durationSeconds: data.durationSeconds,
      status: data.hlsPlaylistUrl ? 'ready' : 'pending',
      isPremium: Boolean(data.isPremium),
      hlsPlaylistUrl: data.hlsPlaylistUrl,
    };

    if (data.videoFileId) payload.videoFile = data.videoFileId;
    if (data.thumbnailId) payload.thumbnail = data.thumbnailId;
    if (data.categoryId) payload.category = data.categoryId;

    const res = await fetch(`${CMS_BASE_URL}/api/videos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return null;
    const json = await res.json();
    return json.doc || json;
  } catch (error) {
    console.error('[CMS Client] Error creating video:', error);
    return null;
  }
}

export async function deleteCmsVideo(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${CMS_BASE_URL}/api/videos/${id}`, { method: 'DELETE' });
    return res.ok;
  } catch (error) {
    console.error('[CMS Client] Error deleting video:', error);
    return false;
  }
}
