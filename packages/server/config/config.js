module.exports = {
  development: {
    username: 'postgres',
    password: '',
    database: 'database_development',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: '',
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
