import path from 'path';

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  migrations: {
    directory: path.resolve(
      __dirname,
      'src',
      'modules',
      'database',
      'migrations'
    ),
  },
  useNullAsDefault: true,
};
