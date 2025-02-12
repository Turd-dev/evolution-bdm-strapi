module.exports = ({ env }) => ({
  host: '0.0.0.0',
  port: parseInt(process.env['PORT']) || 1337,
  url: 'https://5df40516-7ebb-4cef-8951-eb51f979a304-00-1rwefe4dkftm0.janeway.replit.dev/',
  app: {
    keys: process.env['APP_KEYS'].split(','),
  },
  admin: {
    auth: {
      secret: process.env['ADMIN_JWT_SECRET'],
      providers: {
        local: {
          maxAttempts: 5,
          timeWindow: 15 * 60 * 1000, // 15 minutes
          lockoutTime: 30 * 60 * 1000, // 30 minutes
        },
      },
    },
    url: '/admin',
    autoOpen: false,
    serveAdminPanel: true,
    watchIgnoreFiles: [
      '/node_modules/',
      '/.git/',
      '/.tmp/',
      '/build/',
      '/dist/',
    ],
    // Add security headers for admin panel
    security: {
      poweredBy: false,
      csrf: true
    }
  },
  proxy: true,
  session: {
    secure: true, // Changed to true since Replit uses HTTPS
    sameSite: 'strict', // Changed from 'lax' to 'strict' for better security
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    // Add additional cookie security options
    domain: env('COOKIE_DOMAIN', undefined),
    path: '/',
  },
  middlewares: {
    settings: {
      security: {
        hsts: {
          enabled: true,
          maxAge: 31536000,
          includeSubDomains: true,
          preload: true
        },
        xframe: {
          enabled: true,
          value: 'SAMEORIGIN'
        },
        xss: {
          enabled: true,
          mode: 'block' // Add explicit mode
        },
        nosniff: {
          enabled: true
        },
        // Add additional security headers
        csrf: {
          enabled: true,
          key: '_csrf',
          secret: env('CSRF_SECRET', 'csrf_secret_key')
        },
        csp: {
          enabled: true,
          policy: {
            'default-src': ["'self'"],
            'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            'style-src': ["'self'", "'unsafe-inline'"],
            'img-src': ["'self'", 'data:', 'blob:'],
            'connect-src': ["'self'"],
            'font-src': ["'self'"],
            'object-src': ["'none'"],
            'frame-ancestors': ["'self'"]
          }
        },
        referrerPolicy: {
          enabled: true,
          policy: 'strict-origin-when-cross-origin'
        }
      },
      cors: {
        enabled: true,
        origin: env.array('CORS_ORIGIN', ['https://*.replit.dev']),
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
        headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
        credentials: true
      },
      rateLimit: {
        enabled: true,
        interval: 15 * 60 * 1000, // 15 minutes
        max: 100 // max requests per interval
      }
    }
  }
});