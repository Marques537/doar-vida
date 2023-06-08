import knex from 'knex';
import 'dotenv/config';

const pg = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  searchPath: ['knex', 'public'],
  useNullAsDefault: true,
});

export default pg;
