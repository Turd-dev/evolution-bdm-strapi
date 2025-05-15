module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  flags: {
    // Enable content-type builder even in production
    contentTypeBuilder: true,
  },
  // Keep the admin panel accessible
  url: '/admin',
  autoOpen: false,
  watchIgnoreFiles: [
    '**/config/sync/**',
  ],
});