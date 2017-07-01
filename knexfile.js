// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      user: 'alexa',
      database: 'ren-serve',
      password: 'alexa',
      host: 'localhost',
      port: 5432,
      max: 10,
      idleTimeoutMillis: 3000
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },

  // production: {
  //   client: 'postgresql',
  //   connection: process.env.DATABASE_URL,
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
