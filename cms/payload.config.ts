import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import path from 'path';

import { Articles } from './src/collections/Articles';
import { Categories } from './src/collections/Categories';
import { Users } from './src/collections/Users';
import { Videos } from './src/collections/Videos';

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Articles, Videos, Categories],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'dev_secret_key_change_in_production',
  typescript: {
    outputFile: path.resolve(__dirname, 'src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgres://postgres:postgres_dev_password@localhost:5432/alamia_ott',
    },
  }),
});
