import { postgresAdapter } from '@payloadcms/db-postgres';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import path from 'path';
import { fileURLToPath } from 'url';

import { Articles } from './collections/Articles';
import { Categories } from './collections/Categories';
import { Media } from './collections/Media';
import { Users } from './collections/Users';
import { Videos } from './collections/Videos';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const usePostgres = Boolean(process.env.DATABASE_URI);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:4000',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Alamia OTT Admin',
    },
    theme: 'dark',
  },
  collections: [Users, Articles, Videos, Categories, Media],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'dev_secret_key_change_in_production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: usePostgres
    ? postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI || '',
        },
      })
    : sqliteAdapter({
        client: {
          url: `file:${path.resolve(dirname, 'payload.db')}`,
        },
        push: true,
      }),
});
