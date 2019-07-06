const { Pool } = require('pg')

export const db = new Pool({
    host: 'postgres',
    database: 'postgres',
    user: 'postgres',
    password: 'postgres',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });