import type { CollectionConfig } from 'payload'

export const SocialFeeds: CollectionConfig = {
  slug: 'social-feeds',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'platform', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Feed Name',
    },
    {
      name: 'platform',
      type: 'select',
      required: true,
      options: [
        { label: 'YouTube Channel', value: 'youtube' },
        { label: 'Twitter Profile', value: 'twitter' },
        { label: 'Instagram Profile', value: 'instagram' },
        { label: 'RSS Feed', value: 'rss' },
      ],
    },
    {
      name: 'sourceUrl',
      type: 'text',
      required: true,
      label: 'Source URL (e.g., https://twitter.com/elonmusk)',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    }
  ],
}
