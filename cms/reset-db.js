import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URI || 'postgres://postgres:postgres_dev_password@localhost:5432/alamia_ott',
});

async function reset() {
  try {
    await client.connect();
    console.log('Connected to database');
    await client.query('DROP SCHEMA public CASCADE;');
    console.log('Dropped schema public');
    await client.query('CREATE SCHEMA public;');
    console.log('Created schema public');
    await client.query('GRANT ALL ON SCHEMA public TO postgres;');
    await client.query('GRANT ALL ON SCHEMA public TO public;');
    console.log('Granted permissions');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

reset();
