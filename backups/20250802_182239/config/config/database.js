const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');

  if (client === 'postgres') {
    const config = {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: env('DATABASE_URL'),
          ssl: env.bool('DATABASE_SSL', true) && {
            rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false)
          },
          pool: {
            min: env.int('DATABASE_POOL_MIN', 2),
            max: env.int('DATABASE_POOL_MAX', 10),
            idleTimeoutMillis: 30000,
            createTimeoutMillis: 30000,
            acquireTimeoutMillis: 30000
          }
        },
        debug: false,
        acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
      },
    };

    // Add connection error handling
    const knex = require('knex')(config.connection);
    knex.raw('SELECT 1')
      .then(() => {
        console.log('PostgreSQL connected');
      })
      .catch((e) => {
        console.error('PostgreSQL connection error:', e);
        process.exit(1);  // Exit if database connection fails
      });

    return config;
  }

  // Enhanced SQLite fallback with better file location
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', '.data', 'data.db'),
      },
      useNullAsDefault: true,
      debug: false,
    },
  };
};