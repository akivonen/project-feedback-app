import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

let client: postgres.Sql | null = null;

export function getDb() {
  if (!client) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not defined');
    }
    const connectionString = process.env.DATABASE_URL.includes('?')
      ? `${process.env.DATABASE_URL}&pgbouncer=true`
      : `${process.env.DATABASE_URL}?pgbouncer=true&sslmode=require`;
    client = postgres(connectionString, {
      connect_timeout: 20,
      idle_timeout: 20,
      ssl: 'require',
      max: 5,
      prepare: true,
    });
  }
  return drizzle(client, { schema });
}

export default getDb();
