import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import path from 'path';
import { fileURLToPath } from 'url';

import { Articles } from './src/collections/Articles.js';
import { Categories } from './src/collections/Categories.js';
import { Users } from './src/collections/Users.js';
import { Videos } from './src/collections/Videos.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_CMS_URL || 'https://cmmadmin.alamiaai.com',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Articles, Videos, Categories],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'dev_secret_key_change_in_production',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgres://postgres:postgres_dev_password@localhost:5432/alamia_ott',
    },
  }),
});
