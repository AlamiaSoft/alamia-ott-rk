import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { slugField } from 'payload'

export const Videos: CollectionConfig<'videos'> = {
  slug: 'videos',
  labels: {
    singular: 'OTT Video & Stream',
    plural: 'OTT Videos & Streams',
  },
  access: {
    create: anyone,
    delete: anyone,
    read: anyone,
    update: anyone,
  },
  admin: {
    group: '🎬 OTT Streaming & Video',
    defaultColumns: ['title', 'status', 'isPremium', 'publishedAt', 'updatedAt'],
    useAsTitle: 'title',
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
      defaultValue: 'ready',
      required: true,
    },
    {
      name: 'isPremium',
      type: 'checkbox',
      defaultValue: false,
      label: 'Premium / Member Only Video',
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
