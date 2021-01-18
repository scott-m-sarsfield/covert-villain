module.exports = {
  "development": {
    "username": "mussolini",
    "password": "c0v3rt",
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.PROD_DB_USERNAME,
    "password": process.env.PROD_DB_PASSWORD,
    "database": process.env.PROD_DB_DATABASE,
    "host": process.env.PROD_DB_HOSTNAME,
    "port": process.env.PROD_DB_PORT,
    "dialect": "postgres",
    "ssl": true,
    "dialectOptions": {
      "ssl": true
    }
  }
}
