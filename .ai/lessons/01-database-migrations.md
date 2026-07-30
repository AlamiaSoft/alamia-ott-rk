# Lesson 01: Database Migrations & Staging Resets

## Context & Problem
When deploying Payload CMS v3 to a staging environment (Oracle VPS with Docker) from a low-end developer laptop (where local Docker and PostgreSQL are not available), generating Drizzle/Payload database migrations locally is impossible because Drizzle requires a live connection to a PostgreSQL database to generate the migration file (`migrate:create`).

Furthermore, Payload explicitly disables the `db push` schema synchronization feature when `NODE_ENV=production`. This creates a catch-22:
1. You can't generate the migration file locally.
2. The staging container won't auto-push the schema on boot because it's running in production mode.
3. If the staging database is not perfectly fresh (e.g., lingering Docker named volumes), dropping tables manually will cause Payload to crash because Drizzle's internal state expects them to exist.

## The Foolproof Reset & Migration Workflow
To surgically resolve database schema desyncs and generate the official migration file directly on the staging server, follow this procedure:

### 1. Wipe the Staging Database
If Portainer named volumes (`pgdata`) are not deleted properly when tearing down the stack, the database state will persist. Instead of fighting Docker volumes, use the `reset-db.js` script to completely drop and recreate the PostgreSQL `public` schema from inside the container:

1. In Portainer, deploy the `rk_cms` container.
2. Open the **Console** (`>_`) for `rk_cms` (Ensure the command is set to `sh`, not `bash`).
3. Connect as `root` and run:
   ```sh
   node reset-db.js
   ```
   *You should see output confirming the schema was dropped and recreated.*

### 2. Generate the Official Migration File
Now that the staging database is completely empty, you can generate the official `.ts` migration file directly inside the container, as it has the proper `DATABASE_URI` connection.

1. While still inside the `rk_cms` console (`sh`), run:
   ```sh
   # Create the migrations folder if it doesn't exist
   mkdir -p src/migrations
   
   # Generate the migration file
   npm run payload -- migrate:create initial
   ```
2. Payload will inspect the empty database, compare it to your `payload.config.ts`, and create a file in `/app/src/migrations/`.

### 3. Apply the Migration
1. Apply the freshly generated migration immediately:
   ```sh
   npm run payload -- migrate
   ```
2. **Restart** the `rk_cms` container from the Portainer dashboard. The CMS will now boot successfully.

### 4. Optional: Save to Source Control
To ensure this migration applies to all future environments, you should extract the generated file from the staging container and commit it to your repository:
1. In the `rk_cms` console, run `cat src/migrations/*initial*.ts`.
2. Copy the output.
3. Create an identical file locally in `cms/src/migrations/` and push it to Git.
