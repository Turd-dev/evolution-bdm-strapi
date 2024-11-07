const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function restoreContent() {
  try {
    // Pull latest from GitHub
    execSync('git pull origin main', { stdio: 'inherit' });

    // Find latest backup
    const backupDir = path.join(__dirname, '..', 'backups');
    const latestBackup = fs.readdirSync(backupDir)
      .filter(file => file.endsWith('.tar.gz'))
      .sort()
      .pop();

    if (!latestBackup) {
      throw new Error('No backup found');
    }

    // Import content
    execSync(`strapi import -f ${path.join(backupDir, latestBackup)}`, { stdio: 'inherit' });

    console.log('Restore completed successfully');
  } catch (error) {
    console.error('Restore failed:', error);
  }
}

restoreContent();