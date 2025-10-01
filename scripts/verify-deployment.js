#!/usr/bin/env node

/**
 * Deployment verification script
 * Checks if all required components are properly configured for Netlify deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying deployment configuration...\n');

// Check if required files exist
const requiredFiles = [
  'netlify.toml',
  'package.json',
  'prisma/schema.prisma',
  '.env.example'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} is missing`);
    allFilesExist = false;
  }
});

// Check package.json scripts
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  console.log('\n📦 Checking package.json scripts:');
  
  const requiredScripts = ['build', 'start', 'postinstall'];
  requiredScripts.forEach(script => {
    if (packageJson.scripts[script]) {
      console.log(`✅ ${script}: ${packageJson.scripts[script]}`);
    } else {
      console.log(`❌ Missing script: ${script}`);
      allFilesExist = false;
    }
  });
  
  // Check dependencies
  console.log('\n📚 Checking key dependencies:');
  const keyDeps = ['@prisma/client', 'prisma', 'next', 'next-auth'];
  keyDeps.forEach(dep => {
    if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
      const version = packageJson.dependencies[dep] || packageJson.devDependencies[dep];
      console.log(`✅ ${dep}: ${version}`);
    } else {
      console.log(`❌ Missing dependency: ${dep}`);
    }
  });
  
} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
  allFilesExist = false;
}

// Check Prisma schema
try {
  const schema = fs.readFileSync('prisma/schema.prisma', 'utf8');
  
  console.log('\n🗄️  Checking Prisma configuration:');
  
  if (schema.includes('binaryTargets')) {
    console.log('✅ Binary targets configured');
  } else {
    console.log('❌ Binary targets not configured');
  }
  
  if (schema.includes('rhel-openssl-1.0.x')) {
    console.log('✅ Netlify binary target included');
  } else {
    console.log('❌ Netlify binary target missing');
  }
  
} catch (error) {
  console.log('❌ Error reading Prisma schema:', error.message);
  allFilesExist = false;
}

// Check netlify.toml
try {
  const netlifyConfig = fs.readFileSync('netlify.toml', 'utf8');
  
  console.log('\n🌐 Checking Netlify configuration:');
  
  if (netlifyConfig.includes('PRISMA_CLI_BINARY_TARGETS')) {
    console.log('✅ Prisma binary targets environment variable set');
  } else {
    console.log('❌ Prisma binary targets environment variable missing');
  }
  
  if (netlifyConfig.includes('npx prisma generate')) {
    console.log('✅ Prisma generate command included in build');
  } else {
    console.log('❌ Prisma generate command missing from build');
  }
  
} catch (error) {
  console.log('❌ Error reading netlify.toml:', error.message);
  allFilesExist = false;
}

console.log('\n' + '='.repeat(50));

if (allFilesExist) {
  console.log('🎉 All deployment requirements verified!');
  console.log('\n📋 Next steps:');
  console.log('1. Set up environment variables in Netlify dashboard');
  console.log('2. Connect your repository to Netlify');
  console.log('3. Deploy and test the application');
  process.exit(0);
} else {
  console.log('⚠️  Some deployment requirements are missing.');
  console.log('Please fix the issues above before deploying.');
  process.exit(1);
}
