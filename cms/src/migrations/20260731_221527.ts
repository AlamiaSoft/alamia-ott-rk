import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_videos_external_provider" AS ENUM('youtube', 'facebook', 'instagram', 'vimeo', 'other');
  CREATE TYPE "public"."enum_social_feeds_platform" AS ENUM('youtube', 'twitter', 'instagram', 'rss');
  CREATE TYPE "public"."enum_social_feeds_status" AS ENUM('active', 'inactive');
  CREATE TABLE "social_feeds" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"platform" "enum_social_feeds_platform" NOT NULL,
  	"source_url" varchar NOT NULL,
  	"status" "enum_social_feeds_status" DEFAULT 'active',
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'guest';
  ALTER TABLE "posts" ADD COLUMN "is_premium" boolean DEFAULT false;
  ALTER TABLE "posts" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_is_premium" boolean DEFAULT false;
  ALTER TABLE "_posts_v" ADD COLUMN "version_excerpt" varchar;
  ALTER TABLE "videos" ADD COLUMN "external_embed_url" varchar;
  ALTER TABLE "videos" ADD COLUMN "external_provider" "enum_videos_external_provider";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "social_feeds_id" integer;
  CREATE INDEX "social_feeds_updated_at_idx" ON "social_feeds" USING btree ("updated_at");
  CREATE INDEX "social_feeds_created_at_idx" ON "social_feeds" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_social_feeds_fk" FOREIGN KEY ("social_feeds_id") REFERENCES "public"."social_feeds"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_social_feeds_id_idx" ON "payload_locked_documents_rels" USING btree ("social_feeds_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "social_feeds" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "social_feeds" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_social_feeds_fk";
  
  DROP INDEX "payload_locked_documents_rels_social_feeds_id_idx";
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'subscriber';
  ALTER TABLE "posts" DROP COLUMN "is_premium";
  ALTER TABLE "posts" DROP COLUMN "excerpt";
  ALTER TABLE "_posts_v" DROP COLUMN "version_is_premium";
  ALTER TABLE "_posts_v" DROP COLUMN "version_excerpt";
  ALTER TABLE "videos" DROP COLUMN "external_embed_url";
  ALTER TABLE "videos" DROP COLUMN "external_provider";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "social_feeds_id";
  DROP TYPE "public"."enum_videos_external_provider";
  DROP TYPE "public"."enum_social_feeds_platform";
  DROP TYPE "public"."enum_social_feeds_status";`)
}
