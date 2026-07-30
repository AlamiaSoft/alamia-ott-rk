import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    create: () => true,
    update: ({ req: { user }, id }) => {
      if (user?.role === 'admin') return true;
      if (user?.id === id) return true;
      return false;
    }
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Subscriber', value: 'subscriber' },
        { label: 'Guest', value: 'guest' },
      ],
      defaultValue: 'guest',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
    },
  ],
};
