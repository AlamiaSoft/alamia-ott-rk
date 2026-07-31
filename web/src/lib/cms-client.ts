const CMS_BASE_URL =
  (typeof window === 'undefined'
    ? process.env.CMS_INTERNAL_URL || process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:4000'
    : process.env.NEXT_PUBLIC_CMS_URL) || 'http://localhost:4000';

export function normalizeCmsUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('/')) {
    return `${CMS_BASE_URL}${url}`;
  }
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return url.replace(/https?:\/\/[^\/]+/, CMS_BASE_URL);
  }
  return url;
}

export interface CmsCategory {
  id: string;
  name?: string;
  title?: string;
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
  heroImage?: string | CmsMedia;
  category?: string | CmsCategory;
  categories?: (string | CmsCategory)[];
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
  externalEmbedUrl?: string;
  externalProvider?: string;
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
    return (data.docs || []).map((cat: any) => ({
      ...cat,
      name: cat.name || cat.title,
    }));
  } catch (error) {
    console.error('[CMS Client] Error fetching categories:', error);
    return [];
  }
}

export async function createCmsCategory(data: { name: string; slug: string; description?: string }): Promise<{ success: boolean; data?: CmsCategory; error?: string }> {
  try {
    const payload = {
      title: data.name,
      slug: data.slug,
      description: data.description || undefined,
    };
    const res = await fetch(`${CMS_BASE_URL}/api/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) {
      const msg = json.errors?.[0]?.message || 'Failed to create category in Payload CMS';
      return { success: false, error: msg };
    }
    const doc = json.doc || json;
    return { success: true, data: { ...doc, name: doc.title || doc.name } };
  } catch (error: any) {
    console.error('[CMS Client] Error creating category:', error);
    return { success: false, error: error?.message || 'Connection to Payload CMS failed' };
  }
}

// Articles / Posts API
export async function getCmsArticles(options?: { publishedOnly?: boolean; categoryId?: string }): Promise<CmsArticle[]> {
  try {
    const queryParams = new URLSearchParams();
    queryParams.set('limit', '100');
    queryParams.set('sort', '-createdAt');

    if (options?.publishedOnly) {
      queryParams.set('where[_status][equals]', 'published');
    }
    if (options?.categoryId) {
      queryParams.set('where[categories][equals]', options.categoryId);
    }

    // Try /api/posts first (official template endpoint), fallback to /api/articles
    let res = await fetch(`${CMS_BASE_URL}/api/posts?${queryParams.toString()}`, { cache: 'no-store' });
    if (!res.ok) {
      res = await fetch(`${CMS_BASE_URL}/api/articles?${queryParams.toString()}`, { cache: 'no-store' });
    }
    if (!res.ok) return [];
    const data = await res.json();
    return (data.docs || []).map((doc: any) => ({
      ...doc,
      featuredImage: doc.heroImage || doc.featuredImage,
      category: doc.categories?.[0] || doc.category,
      status: doc._status || doc.status || 'published',
    }));
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
}): Promise<{ success: boolean; data?: CmsArticle; error?: string }> {
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
      excerpt: data.excerpt || undefined,
      _status: 'published',
      isPremium: Boolean(data.isPremium),
    };

    if (data.featuredImageId && data.featuredImageId.trim() !== '') {
      payload.heroImage = data.featuredImageId;
      payload.featuredImage = data.featuredImageId;
    }
    if (data.categoryId && data.categoryId.trim() !== '') {
      payload.categories = [data.categoryId];
      payload.category = data.categoryId;
    }

    // Try /api/posts first, fallback to /api/articles
    let res = await fetch(`${CMS_BASE_URL}/api/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.status === 404) {
      res = await fetch(`${CMS_BASE_URL}/api/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    const json = await res.json();

    if (!res.ok) {
      const msg = json.errors?.[0]?.message || 'Failed to create post in Payload CMS';
      console.error('[CMS Client] Create article failed:', json);
      return { success: false, error: msg };
    }

    const doc = json.doc || json;
    return {
      success: true,
      data: {
        ...doc,
        featuredImage: doc.heroImage || doc.featuredImage,
        category: doc.categories?.[0] || doc.category,
      },
    };
  } catch (error: any) {
    console.error('[CMS Client] Error creating article:', error);
    return { success: false, error: error?.message || 'Connection to Payload CMS failed' };
  }
}

export async function deleteCmsArticle(id: string): Promise<boolean> {
  try {
    let res = await fetch(`${CMS_BASE_URL}/api/posts/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      res = await fetch(`${CMS_BASE_URL}/api/articles/${id}`, { method: 'DELETE' });
    }
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
}): Promise<{ success: boolean; data?: CmsVideo; error?: string }> {
  try {
    const payload: any = {
      title: data.title,
      slug: data.slug,
      description: data.description || undefined,
      durationSeconds: data.durationSeconds || undefined,
      status: data.hlsPlaylistUrl ? 'ready' : 'pending',
      isPremium: Boolean(data.isPremium),
      hlsPlaylistUrl: data.hlsPlaylistUrl || undefined,
    };

    if (data.videoFileId && data.videoFileId.trim() !== '') payload.videoFile = data.videoFileId;
    if (data.thumbnailId && data.thumbnailId.trim() !== '') payload.thumbnail = data.thumbnailId;
    if (data.categoryId && data.categoryId.trim() !== '') payload.category = data.categoryId;

    const res = await fetch(`${CMS_BASE_URL}/api/videos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (!res.ok) {
      const msg = json.errors?.[0]?.message || 'Failed to create video in Payload CMS';
      return { success: false, error: msg };
    }

    return { success: true, data: json.doc || json };
  } catch (error: any) {
    console.error('[CMS Client] Error creating video:', error);
    return { success: false, error: error?.message || 'Connection to Payload CMS failed' };
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
