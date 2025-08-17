#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Build Debug Script');
console.log('=====================');

// Check if dist folder exists
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ dist folder not found!');
  console.log('Run: npm run build');
  process.exit(1);
}

console.log('✅ dist folder exists');

// Check dist contents
const distContents = fs.readdirSync(distPath);
console.log('📁 dist contents:', distContents);

// Check for index.html
const indexPath = path.join(distPath, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ index.html not found in dist!');
  process.exit(1);
}

console.log('✅ index.html exists');

// Check index.html content
const indexContent = fs.readFileSync(indexPath, 'utf8');
console.log('📄 index.html size:', indexContent.length, 'characters');

// Check for script tags
const scriptMatches = indexContent.match(/<script[^>]*src="([^"]*)"[^>]*>/g);
if (scriptMatches) {
  console.log('🔗 Script tags found:', scriptMatches.length);
  scriptMatches.forEach((script, i) => {
    console.log(`  ${i + 1}. ${script}`);
  });
} else {
  console.log('⚠️  No script tags found in index.html');
}

// Check assets folder
const assetsPath = path.join(distPath, 'assets');
if (fs.existsSync(assetsPath)) {
  const assetsContents = fs.readdirSync(assetsPath);
  console.log('📦 Assets folder contents:', assetsContents);
  
  // Check for JS files
  const jsFiles = assetsContents.filter(file => file.endsWith('.js'));
  console.log('📜 JavaScript files:', jsFiles);
  
  // Check for CSS files
  const cssFiles = assetsContents.filter(file => file.endsWith('.css'));
  console.log('🎨 CSS files:', cssFiles);
} else {
  console.log('⚠️  Assets folder not found');
}

console.log('✅ Build verification complete');
