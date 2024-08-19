require('dotenv').config();
const postgres = require('postgres');

const sql = postgres({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT || 5432, // Porta padrão
  ssl: 'require'
});

module.exports = sql;





