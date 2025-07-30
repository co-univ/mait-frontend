#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;
const OUTPUT_DIR = './src/types';

// Common OpenAPI endpoints to try
const COMMON_ENDPOINTS = [
  '/v3/api-docs',
  '/v2/api-docs',
  '/api-docs',
  '/swagger.json',
  '/openapi.json',
  '/docs/swagger.json',
  '/api/openapi.json'
];

async function findOpenApiSpec() {
  console.log('🔍 Searching for OpenAPI specification...');
  
  for (const endpoint of COMMON_ENDPOINTS) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      console.log(`Trying: ${url}`);
      
      const response = execSync(`curl -s "${url}"`, { encoding: 'utf8' });
      const parsed = JSON.parse(response);
      
      // Check if it's a valid OpenAPI spec
      if (parsed.openapi || parsed.swagger) {
        console.log(`✅ Found OpenAPI spec at: ${url}`);
        return url;
      }
    } catch (error) {
      // Continue to next endpoint
    }
  }
  
  throw new Error('Could not find OpenAPI specification. Please check the API endpoints.');
}

async function generateTypes(specUrl) {
  console.log('🔧 Generating TypeScript types...');
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  try {
    // Generate types using openapi-typescript
    execSync(`npx openapi-typescript "${specUrl}" --output ${OUTPUT_DIR}/api.ts`, {
      stdio: 'inherit'
    });
    
    console.log(`✅ Types generated successfully in ${OUTPUT_DIR}/api.ts`);
    
    // Parse the generated file to extract schema and path names
    const apiContent = fs.readFileSync(path.join(OUTPUT_DIR, 'api.ts'), 'utf8');
    const schemaNames = extractSchemaNames(apiContent);
    const pathNames = extractPathNames(apiContent);
    
    // Create index file for easier imports with individual exports
    const indexContent = generateIndexContent(schemaNames, pathNames);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), indexContent);
    console.log(`✅ Created ${OUTPUT_DIR}/index.ts with ${schemaNames.length} schema types and ${pathNames.length} path types`);
    
  } catch (error) {
    console.error('❌ Failed to generate types:', error.message);
    throw error;
  }
}

function extractSchemaNames(apiContent) {
  console.log('🔍 Extracting schema names...');
  
  const schemaNames = [];
  const schemaRegex = /^\s+([A-Za-z][A-Za-z0-9]*(?:Api)?(?:Request|Response|Dto)):\s*\{/gm;
  let match;
  
  while ((match = schemaRegex.exec(apiContent)) !== null) {
    const schemaName = match[1];
    if (!schemaNames.includes(schemaName)) {
      schemaNames.push(schemaName);
    }
  }
  
  console.log(`Found schemas: ${schemaNames.join(', ')}`);
  return schemaNames;
}

function extractPathNames(apiContent) {
  console.log('🔍 Extracting path names...');
  
  const pathNames = [];
  const pathRegex = /^\s+"([^"]+)":\s*\{/gm;
  let match;
  
  while ((match = pathRegex.exec(apiContent)) !== null) {
    const pathName = match[1];
    if (pathName.startsWith('/') && !pathNames.includes(pathName)) {
      pathNames.push(pathName);
    }
  }
  
  console.log(`Found paths: ${pathNames.join(', ')}`);
  return pathNames;
}

function generateIndexContent(schemaNames, pathNames) {
  const schemaExports = schemaNames
    .map(name => `export type ${name} = components['schemas']['${name}'];`)
    .join('\n');
  
  // Create path type exports with sanitized names
  const pathExports = pathNames
    .map(path => {
      const sanitizedName = path
        .replace(/^\/api\/v1\//, '') // Remove /api/v1/ prefix
        .replace(/\//g, '_') // Replace / with _
        .replace(/[{}]/g, '') // Remove curly braces
        .replace(/-/g, '_') // Replace hyphens with underscores
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('') + 'Path';
      
      return `export type ${sanitizedName} = paths['${path}'];`;
    })
    .join('\n');
    
  return `export * from './api';
export type { paths, components } from './api';

// Individual schema exports for easier importing
import type { components, paths } from './api';

${schemaExports}

// Individual path exports for easier importing
${pathExports}
`;
}

async function main() {
  try {
    const specUrl = await findOpenApiSpec();
    await generateTypes(specUrl);
    
    console.log('\n🎉 API types generation completed!');
    console.log(`\nYou can now import types directly:`);
    console.log(`import type { CreateQuestionSetApiRequest } from './types';`);
    console.log(`\nOr use the traditional way:`);
    console.log(`import type { components } from './types';`);
    console.log(`type ApiResponse = components['schemas']['YourDtoName'];`);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}