// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: "157.230.126.39",
      user: "manish-parag",
      password: "Mkanish@20",
      database: "parag_assignment"

    },
    migrations: {
      directory: './migrations',
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: (conn, done) => {
        conn.on('error', (err) => {
          if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was lost. Reconnecting...');
          } else {
            console.error('Database connection error:', err);
          }
        });
        done(null, conn);
      },
    },
    acquireConnectionTimeout: 10000,


  },

};
