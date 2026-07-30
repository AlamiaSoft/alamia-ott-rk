import type { CollectionConfig } from 'payload'

export const WorkerLogs: CollectionConfig = {
  slug: 'worker-logs',
  labels: {
    singular: 'Worker Log',
    plural: 'System Diagnosis',
  },
  admin: {
    group: 'System & Utilities',
    defaultColumns: ['level', 'message', 'videoId', 'createdAt'],
    useAsTitle: 'message',
    description: 'System diagnosis and FFmpeg transcoding logs emitted by background workers.',
  },
  access: {
    // Anyone (including the worker without auth) can create logs.
    // In production, we should lock this down with an API key, but for MVP it is open.
    create: () => true,
    read: () => true,
    update: () => false,
    delete: () => true,
  },
  fields: [
    {
      name: 'level',
      type: 'select',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warn' },
        { label: 'Error', value: 'error' },
      ],
      defaultValue: 'info',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'videoId',
      type: 'text',
      admin: {
        description: 'Optional Video ID this log pertains to',
        position: 'sidebar',
      },
    },
    {
      name: 'jobId',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'metadata',
      type: 'json',
      admin: {
        description: 'Additional diagnostic data like stack traces or ffmpeg progress objects',
      },
    },
  ],
}
