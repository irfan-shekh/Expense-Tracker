import { neon } from '@neondatabase/serverless'; // Ensure this import is present
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'

// Change neonp to neon
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);

export const db = drizzle(sql, { schema });