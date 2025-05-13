// Simple deployment script for GitHub Pages
import fs from 'fs-extra';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('=== GitHub Pages Deployment Preparation ===');

async function deploy() {
  try {
    // Clean the dist directory
    await fs.remove(resolve(__dirname, 'dist'));
    console.log('✓ Cleaned dist directory');

    // Build with Vite
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✓ Built project');

    // Create CNAME file if needed (uncomment and modify if you have a custom domain)
    // await fs.writeFile(resolve(__dirname, 'dist', 'CNAME'), 'your-custom-domain.com');
    
    // Copy the dist directory to a temporary gh-pages directory
    await fs.remove(resolve(__dirname, 'gh-pages'));
    await fs.copy(resolve(__dirname, 'dist'), resolve(__dirname, 'gh-pages'));
    console.log('✓ Copied dist to gh-pages directory');
    
    console.log('\n✓ Ready for deployment!');
    console.log('The gh-pages directory is prepared and ready to be deployed.');
    console.log('\nNext steps:');
    console.log('1. Run "npm run deploy" to deploy to GitHub Pages');
    console.log('2. Wait a few minutes for GitHub to build your site');
    console.log('3. Check your site at: https://[your-username].github.io/[your-repo]/');
    
  } catch (error) {
    console.error('Error during deployment preparation:', error);
    process.exit(1);
  }
}

deploy(); 