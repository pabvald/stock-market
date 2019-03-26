const { Pool } = require('pg')

export const db = new Pool({
    host: 'localhost',
    database: 'stockexchange',
    user: 'stock_nodejs',
    password: 'Feynman42',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });