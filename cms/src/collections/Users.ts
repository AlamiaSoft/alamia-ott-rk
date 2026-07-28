export const Users = {
  slug: 'users',
  auth: true,
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
      defaultValue: 'subscriber',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
    },
  ],
};
