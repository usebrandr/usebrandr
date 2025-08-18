import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 DEPLOYMENT DEBUG SCRIPT');
console.log('==========================');
console.log(`📁 Current working directory: ${process.cwd()}`);
console.log(`📁 __dirname: ${__dirname}`);
console.log('');

// Check common build locations
const possibleBuildPaths = [
  path.join(__dirname, 'dist'),
  path.join(__dirname, '..', 'dist'),
  path.join(__dirname, '..', '..', 'dist'),
  path.join(process.cwd(), 'dist'),
  path.join(process.cwd(), 'project', 'dist'),
  path.join(process.cwd(), 'src', 'project', 'dist')
];

console.log('🔍 Checking for build directories:');
for (const buildPath of possibleBuildPaths) {
  console.log(`\n📍 Checking: ${buildPath}`);
  if (fs.existsSync(buildPath)) {
    console.log(`✅ EXISTS: ${buildPath}`);
    try {
      const files = fs.readdirSync(buildPath);
      console.log(`   📄 Files: ${files.join(', ')}`);
      
      if (fs.existsSync(path.join(buildPath, 'index.html'))) {
        console.log(`   ✅ index.html found`);
      } else {
        console.log(`   ❌ index.html NOT found`);
      }
      
      if (fs.existsSync(path.join(buildPath, 'assets'))) {
        const assetFiles = fs.readdirSync(path.join(buildPath, 'assets'));
        console.log(`   📁 Assets: ${assetFiles.join(', ')}`);
      } else {
        console.log(`   ❌ assets folder NOT found`);
      }
    } catch (error) {
      console.log(`   ❌ Error reading directory: ${error.message}`);
    }
  } else {
    console.log(`❌ NOT FOUND: ${buildPath}`);
  }
}

console.log('\n🔍 Environment variables:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`   PORT: ${process.env.PORT}`);
console.log(`   PWD: ${process.env.PWD}`);

console.log('\n🔍 Process info:');
console.log(`   Platform: ${process.platform}`);
console.log(`   Architecture: ${process.arch}`);
console.log(`   Node version: ${process.version}`);

console.log('\n✅ Debug script completed');

