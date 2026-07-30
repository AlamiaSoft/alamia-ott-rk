import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Videos } from './collections/Videos'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const usePostgres = Boolean(process.env.DATABASE_URI)

const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || (process.env.NODE_ENV === 'production' ? 'https://cmmadmin.alamiaai.com' : 'http://localhost:4000')
const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL || (process.env.NODE_ENV === 'production' ? 'https://cmm.alamiaai.com' : 'http://localhost:3000')

export default buildConfig({
  serverURL: cmsUrl,
  cors: [
    cmsUrl,
    portalUrl,
    'http://localhost:3000',
    'http://localhost:4000',
    'http://rk_web:3000',
    'http://rk_cms:4000',
    getServerSideURL(),
  ].filter(Boolean),
  csrf: [
    cmsUrl,
    portalUrl,
    'http://localhost:3000',
    'http://localhost:4000',
    'http://rk_web:3000',
    'http://rk_cms:4000',
  ],
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
      graphics: {
        Logo: '@/components/Logo/Logo#Logo',
        Icon: '@/components/Logo/Logo#Logo',
      },
    },
    meta: {
      titleSuffix: ' — Checkmate Media OTT Studio',
      icons: [{ rel: 'icon', type: 'image/jpeg', url: '/checkmate-logo.jpg' }],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: defaultLexical,
  db: usePostgres
    ? postgresAdapter({
      pool: {
        connectionString: process.env.DATABASE_URI || '',
      },
      push: process.env.PAYLOAD_DB_PUSH === 'true',
      migrationDir: path.resolve(dirname, 'migrations'),
    })
    : sqliteAdapter({
      client: {
        url: process.env.DATABASE_URL || `file:${path.resolve(dirname, 'payload.db')}`,
      },
      push: true,
    }),
  collections: [Posts, Videos, Categories, Media, Pages, Users],
  globals: [Header, Footer],
  plugins: [
    ...plugins,
  ],
  secret: process.env.PAYLOAD_SECRET || 'dev_secret_key_change_in_production',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
