import { PayloadRequest } from 'payload'
import { syncSocialFeeds } from '../utilities/syncFeeds'

export async function syncFeedHandler(req: PayloadRequest) {
  const { payload, routeParams } = req
  const feedId = routeParams?.id as string

  if (!feedId) {
    return Response.json({ error: 'Feed ID is required' }, { status: 400 })
  }

  try {
    const importedCount = await syncSocialFeeds(payload, feedId)
    return Response.json({ success: true, imported: importedCount, message: `Successfully imported ${importedCount} items.` })
  } catch (error: any) {
    console.error('Error syncing feed:', error)
    return Response.json({ error: error.message || 'Failed to sync feed' }, { status: 500 })
  }
}
