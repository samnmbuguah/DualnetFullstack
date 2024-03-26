const { execSync } = require('child_process');

// Get a list of changed files since last commit
const result = execSync('git diff --name-only HEAD').toString();

// Check if any of the changed files are in the FrontendDualnet directory
const hasChanges = result.split('\n').some(file => file.startsWith('FrontendDualnet/'));

if (hasChanges) {
  // If there are changes in the FrontendDualnet directory, run the build command
  console.log('Changes detected in FrontendDualnet. Running build...');
  execSync('npm run build --prefix FrontendDualnet', { stdio: 'inherit' });
} else {
  console.log('No changes detected in FrontendDualnet. Skipping build.');
}