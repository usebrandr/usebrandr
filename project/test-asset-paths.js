import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 TESTING ASSET PATH LOGIC');
console.log('============================');
console.log(`📁 Current working directory: ${process.cwd()}`);
console.log(`📁 __dirname: ${__dirname}`);
console.log('');

// Simulate the same logic as the server
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
    break;
  } else {
    console.log(`❌ NOT FOUND: ${assetPath}`);
  }
}

if (!assetsPath) {
  console.log('\n⚠️  No assets directory found!');
  process.exit(1);
}

console.log(`\n🎯 Assets path: ${assetsPath}`);

// Test the exact paths from the error logs
const testRequests = [
  'assets/vendor-eff2f5a2.js',
  'assets/index-5355f4ec.js',
  'assets/index-4418f37c.css',
  'assets/ui-852b7b48.js'
];

console.log('\n🧪 Testing asset path resolution:');
for (const request of testRequests) {
  console.log(`\n📝 Request: ${request}`);
  
  // Simulate the server logic
  let fileName = request.substring(1); // Remove leading slash
  
  if (fileName.startsWith('assets/')) {
    fileName = fileName.replace('assets/', '');
    console.log(`   🔄 Removed 'assets/' prefix, looking for: ${fileName}`);
  }
  
  // Try multiple possible locations
  const possibleAssetPaths = [
    path.join(assetsPath, fileName),
    path.join(__dirname, 'dist', 'assets', fileName),
    path.join(__dirname, '..', 'dist', 'assets', fileName),
    path.join(__dirname, '..', '..', 'dist', 'assets', fileName),
    path.join(process.cwd(), 'dist', 'assets', fileName)
  ];
  
  let foundPath = null;
  for (const pathCandidate of possibleAssetPaths) {
    if (fs.existsSync(pathCandidate)) {
      foundPath = pathCandidate;
      break;
    }
  }
  
  if (foundPath) {
    console.log(`   ✅ FOUND: ${fileName} at ${foundPath}`);
  } else {
    console.log(`   ❌ NOT FOUND: ${fileName}`);
    console.log(`   🔍 Checked paths:`);
    for (const pathCandidate of possibleAssetPaths) {
      console.log(`      - ${pathCandidate}`);
    }
  }
}

console.log('\n✅ Asset path test completed');

