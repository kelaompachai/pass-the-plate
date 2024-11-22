const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PGDATABASE,
  max: 10,
});


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};


