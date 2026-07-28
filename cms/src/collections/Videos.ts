export const Videos = {
  slug: 'videos',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending Transcode', value: 'pending' },
        { label: 'Processing HLS', value: 'processing' },
        { label: 'Ready', value: 'ready' },
        { label: 'Failed', value: 'failed' },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'visibility',
      type: 'select',
      options: [
        { label: 'Free', value: 'free' },
        { label: 'Subscriber Only', value: 'member_only' },
      ],
      defaultValue: 'free',
      required: true,
    },
    {
      name: 'hlsPlaylistUrl',
      type: 'text',
    },
    {
      name: 'thumbnailUrl',
      type: 'text',
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
  ],
};
