const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REPORT = path.join(ROOT, 'test-results', 'structure-report.json');
const SPEC_REF = '.github/PROJECT_SPEC.md';

if (!fs.existsSync(REPORT)) {
  console.error(`Missing report file: ${REPORT}`);
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(REPORT, 'utf8'));
const missing = report.missing || [];

if (!missing.length) {
  console.log('No missing files listed in structure-report.json');
  process.exit(0);
}

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function placeholderFor(filePath) {
  const name = path.basename(filePath);
  const ext = path.extname(name).toLowerCase();

  if (ext === '.md') {
    return `# ${name}

This is a placeholder file generated to satisfy the repository structure described in ${SPEC_REF}.

Please replace this content with the canonical content from ${SPEC_REF}.
`;
  }

  if (ext === '.json') {
    // generate small realistic fixtures for known names
    if (name.includes('claims')) {
      return JSON.stringify({
        sampleClaims: [
          {
            id: 'claim-001',
            claimNumber: 'CLM-100001',
            customerId: 'customer-001',
            vehicleId: 'vehicle-001',
            status: 'SUBMITTED',
            estimatedCost: 1200
          }
        ]
      }, null, 2);
    }
    if (name.includes('users')) {
      return JSON.stringify({
        sampleUsers: [
          {
            id: 'user-001',
            email: 'user@example.com',
            firstName: 'Jane',
            lastName: 'Doe',
            role: 'CUSTOMER'
          }
        ]
      }, null, 2);
    }
    if (name.includes('vehicles')) {
      return JSON.stringify({
        sampleVehicles: [
          { id: 'vehicle-001', vin: '1HGCM82633A004352', make: 'Honda', model: 'Accord', year: 2018 }
        ]
      }, null, 2);
    }
    if (name.includes('workshops')) {
      return JSON.stringify({
        sampleWorkshops: [
          { id: 'workshop-001', name: 'Main St Workshop', capacity: 10, rating: 4.6 }
        ]
      }, null, 2);
    }
    return JSON.stringify({}, null, 2);
  }

  if (ext === '.yml' || ext === '.yaml') {
    // docker-compose template
    return `version: '3.8'

services:
  test-runner:
    build: .
    environment:
      - NODE_ENV=test
      - BASE_URL=http://web:3000
      - API_BASE_URL=http://api:3001
    volumes:
      - ./reports:/app/reports
      - ./screenshots:/app/screenshots
    networks:
      - test-network

  web:
    image: nginx:alpine
    ports:
      - "3000:80"
    networks:
      - test-network

networks:
  test-network: {}`;
  }

  if (ext === '.sh') {
    return `#!/usr/bin/env bash
# Placeholder script: ${name}
# See ${SPEC_REF} for canonical implementation

set -euo pipefail
echo "Running placeholder ${name}"
`;
  }

  if (ext === '.ts') {
    // special-case environment configs
    if (filePath.includes('src/config/environments')) {
      const envName = name.replace('.ts', '');
      return `// ${filePath} - placeholder generated from ${SPEC_REF}
export const ${envName}Config = {
  baseUrl: 'https://${envName}.automotive-claims.com',
  apiUrl: 'https://api-${envName}.automotive-claims.com',
  database: {
    host: 'localhost',
    port: 5432,
    name: 'claims_${envName}',
    username: '${envName}_user',
    password: '${envName}_pass'
  },
  features: {
    newClaimWorkflow: true
  }
};
`;
    }

    if (filePath.includes('src/services/database/TestDataSeeder.ts')) {
      return `// ${filePath} - placeholder TestDataSeeder
import fs from 'fs';
import path from 'path';

export class TestDataSeeder {
  static async seed() {
    // Implement seeding logic according to .github/PROJECT_SPEC.md
    const fixturesDir = path.join(__dirname, '..', '..', 'fixtures', 'test-data');
    console.log('Seeding test data from', fixturesDir);
  }
}
`;
    }

    // general TS placeholder
    return `// ${filePath} - placeholder generated from ${SPEC_REF}
export default {};`;
  }

  if (ext === '.js') {
    if (filePath.includes('scripts/')) {
      return `// ${filePath} - placeholder script generated from ${SPEC_REF}
module.exports = function() {
  console.log('Placeholder script: ${name}');
};
`;
    }
    return `// ${filePath} - placeholder
module.exports = {};`;
  }

  // fallback
  return `// Placeholder for ${name} created to satisfy structure described in ${SPEC_REF}\n`;
}

const created = [];
for (const rel of missing) {
  const target = path.join(ROOT, rel);
  if (fs.existsSync(target)) continue;
  ensureDir(target);
  try {
    const content = placeholderFor(rel);
    fs.writeFileSync(target, content, 'utf8');
    // make shell scripts executable
    if (rel.endsWith('.sh')) {
      fs.chmodSync(target, 0o755);
    }
    created.push(rel);
    console.log(`Created: ${rel}`);
  } catch (e) {
    console.error(`Failed to create ${rel}: ${e.message}`);
  }
}

console.log(`\nSummary: created ${created.length} files (see ${SPEC_REF} for canonical content).`);
if (!created.length) {
  console.log('Nothing created. All missing files already exist or report was empty.');
}
process.exit(0);