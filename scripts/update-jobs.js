/**
 * Updates job listings in Supabase DB.
 * Deletes all existing jobs and inserts the 3 current roles.
 *
 * Usage: npm run update-jobs
 */

const fs = require('fs');
const path = require('path');

// Load .env
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach((line) => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim();
      if (!process.env[key]) process.env[key] = val;
    }
  });
}

const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const REST = `${SUPABASE_URL}/rest/v1`;

const headers = {
  apikey: SERVICE_KEY,
  Authorization: 'Bearer ' + SERVICE_KEY,
  'Content-Type': 'application/json',
  Prefer: 'return=minimal',
};

const jobs = [
  {
    slug: 'pqc-laying-expert-engineer',
    title: 'PQC Laying Expert (Engineer)',
    department: 'Engineering',
    location: 'Nagpur',
    employment_type: 'Full-time',
    description:
      'Lead pavement quality concrete laying operations on highway construction projects.',
    responsibilities: JSON.stringify([
      'Lead PQC laying operations on highway/expressway projects',
      'Supervise slip-form paver operations and concrete paving teams',
      'Ensure mix design compliance as per MoRTH/NHAI specifications',
      'Monitor concrete temperature, workability, and strength parameters',
      'Coordinate with batching plant, QC lab, and site engineering teams',
      'Maintain paving records and daily progress reports',
    ]),
    requirements: JSON.stringify([
      'B.Tech/B.E. in Civil Engineering',
      '8+ years of experience in highway construction with at least 5 years in concrete paving',
      'Proven experience with slip-form paver operations and PQC laying',
      'Deep knowledge of MoRTH, IRC, and NHAI specifications for rigid pavement',
      'Strong leadership and on-site problem-solving skills',
    ]),
    qualifications: JSON.stringify([
      'Experience with Wirtgen/CPM slip-form pavers preferred',
      'Familiarity with dowel bar installation and joint sealing',
    ]),
    active: true,
    sort_order: 1,
  },
  {
    slug: 'deputy-project-manager',
    title: 'Deputy Project Manager',
    department: 'Project Management',
    location: 'Nagpur',
    employment_type: 'Full-time',
    description:
      'Support PMs in execution of highway, bridge, and irrigation projects.',
    responsibilities: JSON.stringify([
      'Assist the Project Manager in planning, scheduling, and executing construction projects',
      'Monitor site progress, prepare daily/weekly reports, and flag delays',
      'Coordinate between site engineers, subcontractors, and the project management office',
      'Track project budgets, resource allocation, and material procurement',
      'Ensure compliance with safety, quality, and environmental standards',
      'Liaise with clients (NHAI, PWD, Irrigation Department) and attend progress meetings',
    ]),
    requirements: JSON.stringify([
      'B.Tech/B.E. in Civil Engineering',
      '6-10 years of experience in construction project management',
      'Experience with highway, bridge, or irrigation projects preferred',
      'Proficiency in MS Project/Primavera and project reporting',
      'Strong communication and coordination skills',
    ]),
    qualifications: JSON.stringify([
      'PMP or equivalent project management certification preferred',
    ]),
    active: true,
    sort_order: 2,
  },
  {
    slug: 'accountant',
    title: 'Accountant (2 Positions)',
    department: 'Corporate/Admin',
    location: 'Nagpur',
    employment_type: 'Full-time',
    description:
      'Manage day-to-day accounting, billing, GST/TDS compliance for construction projects.',
    responsibilities: JSON.stringify([
      'Maintain books of accounts in Tally/ERP system',
      'Process vendor invoices, subcontractor bills, and petty cash',
      'Prepare and file GST, TDS, and other statutory returns on time',
      'Reconcile bank statements, ledgers, and project cost accounts',
      'Assist in preparation of monthly financial statements and MIS reports',
      'Coordinate with auditors and ensure documentation compliance',
    ]),
    requirements: JSON.stringify([
      'B.Com / M.Com / CA Inter',
      '3-5 years of accounting experience, preferably in construction or infrastructure',
      'Hands-on experience with Tally Prime and GST portal',
      'Good knowledge of TDS, GST, and construction industry taxation',
      'Proficiency in MS Excel and financial reporting',
    ]),
    qualifications: JSON.stringify([
      'CA Inter or equivalent preferred',
    ]),
    active: true,
    sort_order: 3,
  },
];

async function main() {
  console.log('Updating job listings in Supabase...');

  // Step 1: Delete all existing jobs
  console.log('Deleting old jobs...');
  const delRes = await fetch(`${REST}/content_job_listings?id=neq.00000000-0000-0000-0000-000000000000`, {
    method: 'DELETE',
    headers,
  });
  console.log('Delete:', delRes.ok ? 'OK' : 'FAILED (' + delRes.status + ')');

  // Step 2: Insert new jobs
  console.log('Inserting ' + jobs.length + ' new jobs...');
  const insRes = await fetch(`${REST}/content_job_listings`, {
    method: 'POST',
    headers,
    body: JSON.stringify(jobs),
  });

  if (insRes.ok) {
    console.log('✓ Inserted ' + jobs.length + ' job listings:');
    jobs.forEach((j) => console.log('  - ' + j.title + ' (' + j.department + ')'));
  } else {
    const err = await insRes.text();
    console.log('✗ Insert failed:', err.substring(0, 200));
  }
}

main().catch((e) => console.error('Error:', e));