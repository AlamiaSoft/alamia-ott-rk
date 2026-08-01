import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_external_provider" AS ENUM('youtube', 'facebook', 'instagram', 'vimeo', 'other');
  CREATE TYPE "public"."enum__posts_v_version_external_provider" AS ENUM('youtube', 'facebook', 'instagram', 'vimeo', 'other');
  ALTER TABLE "posts" ADD COLUMN "external_embed_url" varchar;
  ALTER TABLE "posts" ADD COLUMN "external_provider" "enum_posts_external_provider";
  ALTER TABLE "_posts_v" ADD COLUMN "version_external_embed_url" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_external_provider" "enum__posts_v_version_external_provider";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" DROP COLUMN "external_embed_url";
  ALTER TABLE "posts" DROP COLUMN "external_provider";
  ALTER TABLE "_posts_v" DROP COLUMN "version_external_embed_url";
  ALTER TABLE "_posts_v" DROP COLUMN "version_external_provider";
  DROP TYPE "public"."enum_posts_external_provider";
  DROP TYPE "public"."enum__posts_v_version_external_provider";`)
}
