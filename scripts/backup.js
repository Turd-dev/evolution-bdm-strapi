// strapi-project/scripts/backup.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function createBackup() {
  try {
    // Create timestamp for backup
    const date = new Date();
    const timestamp = date.toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(__dirname, '..', 'backups', date.toISOString().split('T')[0]);

    // Create backup directory if it doesn't exist
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Export Strapi content
    console.log('Exporting Strapi content...');
    execSync('npm run strapi export -- --no-encrypt', { stdio: 'inherit' });

    // Move export file to backup directory
    const exportFile = fs.readdirSync('.').find(file => file.startsWith('export_'));
    if (exportFile) {
      const backupPath = path.join(backupDir, `backup_${timestamp}.tar.gz`);
      fs.renameSync(exportFile, backupPath);
      console.log(`Backup created at: ${backupPath}`);

      // Git commands
      console.log('Committing to git...');
      execSync('git add backups/', { stdio: 'inherit' });
      execSync(`git commit -m "Backup ${timestamp}"`, { stdio: 'inherit' });
      execSync('git push origin main', { stdio: 'inherit' });
      console.log('Backup pushed to GitHub');
    }
  } catch (error) {
    console.error('Backup failed:', error);
    process.exit(1);
  }
}

createBackup();