import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not defined');
}
const client = postgres(process.env.DATABASE_URL);

const db = drizzle(client, { schema });

export default db;
