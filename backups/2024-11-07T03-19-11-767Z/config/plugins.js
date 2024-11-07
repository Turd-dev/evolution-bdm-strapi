// config/plugins.js
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-provider-upload-github',
      providerOptions: {
        token: env('GITHUB_TOKEN'),
        repo: env('GITHUB_REPO', 'Turd-dev/evolution-bdm-strapi'),
        branch: env('GITHUB_BRANCH', 'main'),
        baseUrl: env('GITHUB_BASE_URL', 'https://raw.githubusercontent.com'),
        path: 'uploads'
      }
    }
  }
});

// Create a new file: scripts/backup-to-github.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function backupContent() {
  try {
    // Create backup directories if they don't exist
    const backupDir = path.join(__dirname, '..', 'backups');
    const contentDir = path.join(backupDir, 'content');
    const componentsDir = path.join(backupDir, 'components');

    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);
    if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir);
    if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir);

    // Export content
    execSync('strapi export --no-encrypt', { stdio: 'inherit' });

    // Commit and push to GitHub
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Content backup ' + new Date().toISOString() + '"', { stdio: 'inherit' });
    execSync('git push origin main', { stdio: 'inherit' });

    console.log('Backup completed successfully');
  } catch (error) {
    console.error('Backup failed:', error);
  }
}

backupContent();