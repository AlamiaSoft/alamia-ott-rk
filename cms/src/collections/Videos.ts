import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { slugField } from 'payload'

export const Videos: CollectionConfig<'videos'> = {
  slug: 'videos',
  labels: {
    singular: 'Video',
    plural: 'Videos & Streams',
  },
  access: {
    create: anyone,
    delete: anyone,
    read: anyone,
    update: anyone,
  },
  admin: {
    group: 'Editorial',
    defaultColumns: ['title', 'status', 'isPremium', 'publishedAt', 'updatedAt'],
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation }) => {
        if (
          (operation === 'create' || operation === 'update') &&
          doc.status === 'pending' &&
          doc.videoFile &&
          (!previousDoc || previousDoc.status !== 'pending' || previousDoc.videoFile !== doc.videoFile)
        ) {
          const { videoQueue } = await import('../queue')
          await videoQueue.add('transcode', { videoId: doc.id })
          console.log(`[CMS] Enqueued video transcode job for videoId: ${doc.id}`)
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'durationSeconds',
      type: 'number',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending Transcode', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Ready / Published', value: 'ready' },
        { label: 'Failed', value: 'failed' },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'isPremium',
      type: 'checkbox',
      defaultValue: false,
      label: 'Premium / Member Only Video',
    },
    {
      name: 'externalEmbedUrl',
      type: 'text',
      admin: {
        components: {
          Field: '@/components/VideoPreviewField#VideoPreviewField'
        }
      }
    },
    {
      name: 'externalProvider',
      type: 'select',
      options: [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Facebook', value: 'facebook' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'Vimeo', value: 'vimeo' },
        { label: 'Other', value: 'other' }
      ],
      admin: {
        // We hide this from the UI since the custom field controls it, but it's saved to the DB
        hidden: true,
      }
    },
    {
      name: 'hlsPlaylistUrl',
      type: 'text',
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
    },
    slugField(),
  ],
}
