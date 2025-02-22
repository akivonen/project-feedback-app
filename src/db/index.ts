import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const client = postgres(
  'postgresql://neondb_owner:npg_qV7Wjl3kGsuE@ep-holy-bush-a9myhfzd-pooler.gwc.azure.neon.tech/neondb?sslmode=require'
);

const db = drizzle(client, { schema });

export default db;
