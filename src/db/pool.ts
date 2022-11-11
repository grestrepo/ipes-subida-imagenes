import { Pool } from 'pg';

export const pool = new Pool({
  user: process.env.DB_POSTGRES_USER as string,
  host: process.env.DB_POSTGRES_HOST as string,
  password: process.env.DB_POSTGRES_PASSWORD as string,
  database: process.env.DB_POSTGRES_DATABASE as string,
  port: parseInt(process.env.DB_POSTGRES_PORT as string),
  // ssl: true
});
