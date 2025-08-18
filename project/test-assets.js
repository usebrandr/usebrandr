import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 TESTING ASSET PATHS');
console.log('========================');
console.log(`📁 Current working directory: ${process.cwd()}`);
console.log(`📁 __dirname: ${__dirname}`);
console.log('');

// Test the same logic as the server
const possibleAssetPaths = [
  path.join(__dirname, 'dist', 'assets'),
  path.join(__dirname, '..', 'dist', 'assets'),
  path.join(__dirname, '..', '..', 'dist', 'assets'),
  path.join(process.cwd(), 'dist', 'assets')
];

console.log('🔍 Checking for assets directory:');
let assetsPath = null;
for (const assetPath of possibleAssetPaths) {
  console.log(`\n📍 Checking: ${assetPath}`);
  if (fs.existsSync(assetPath)) {
    console.log(`✅ EXISTS: ${assetPath}`);
    assetsPath = assetPath;
    
    try {
      const files = fs.readdirSync(assetPath);
      console.log(`   📄 Files: ${files.join(', ')}`);
      
      // Look for the specific files mentioned in the error
      const targetFiles = ['index-4418f37c.css', 'vendor-eff2f5a2.js', 'ui-852b7b48.js'];
      
      for (const targetFile of targetFiles) {
        const filePath = path.join(assetPath, targetFile);
        if (fs.existsSync(filePath)) {
          console.log(`   ✅ Found: ${targetFile}`);
        } else {
          console.log(`   ❌ Missing: ${targetFile}`);
        }
      }
    } catch (error) {
      console.log(`   ❌ Error reading directory: ${error.message}`);
    }
    break;
  } else {
    console.log(`❌ NOT FOUND: ${assetPath}`);
  }
}

if (!assetsPath) {
  console.log('\n⚠️  No assets directory found!');
  console.log('This means the build failed or assets are in an unexpected location.');
  
  // Let's check if there are any dist folders anywhere
  console.log('\n🔍 Searching for any dist folders...');
  const searchPaths = [
    __dirname,
    path.join(__dirname, '..'),
    path.join(__dirname, '..', '..'),
    process.cwd()
  ];
  
  for (const searchPath of searchPaths) {
    console.log(`\n📍 Searching in: ${searchPath}`);
    try {
      const items = fs.readdirSync(searchPath);
      const distFolders = items.filter(item => item === 'dist');
      
      if (distFolders.length > 0) {
        console.log(`   ✅ Found dist folder in: ${searchPath}`);
        const distPath = path.join(searchPath, 'dist');
        const distContents = fs.readdirSync(distPath);
        console.log(`   📄 Dist contents: ${distContents.join(', ')}`);
        
        if (distContents.includes('assets')) {
          const assetsPath = path.join(distPath, 'assets');
          const assetFiles = fs.readdirSync(assetsPath);
          console.log(`   🎯 Assets: ${assetFiles.join(', ')}`);
        }
      }
    } catch (error) {
      console.log(`   ❌ Error reading: ${error.message}`);
    }
  }
}

console.log('\n✅ Asset path test completed');

