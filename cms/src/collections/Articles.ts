export const Articles = {
  slug: 'articles',
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
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
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
      name: 'featuredVideo',
      type: 'relationship',
      relationTo: 'videos',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
  ],
};
