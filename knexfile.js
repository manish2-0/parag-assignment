// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {

      host: "bbj0vnnensjahzb1uay7-mysql.services.clever-cloud.com",
      user: "udghjk3sg7r3wy8l",
      password: "nPEwWiZSDKCQG5VxmiE0",
      database: "bbj0vnnensjahzb1uay7"

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
