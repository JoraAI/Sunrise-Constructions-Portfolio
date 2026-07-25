/**
 * Creates the super admin account via Supabase Admin API.
 * Run AFTER database-setup.sql has been executed in Supabase SQL Editor.
 *
 * Super admin credentials are read from .env:
 *   SUPERADMIN_EMAIL
 *   SUPERADMIN_PASSWORD
 *
 * Usage: npm run create-superadmin
 */

const fs = require('fs');
const path = require('path');

// Load .env file manually (Node doesn't auto-load)
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
}

const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!SERVICE_KEY || !SUPABASE_URL) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env');
  process.exit(1);
}

// Credentials are sourced from env vars (see .env.example).
// Fallbacks exist only so the script stays runnable for legacy setups.
const EMAIL = process.env.SUPERADMIN_EMAIL || 'superadmin@sunriseconstructions.in';
const PASSWORD = process.env.SUPERADMIN_PASSWORD;

if (!PASSWORD) {
  console.error('Error: SUPERADMIN_PASSWORD is not set in .env');
  console.error('Add SUPERADMIN_EMAIL and SUPERADMIN_PASSWORD to your .env file.');
  process.exit(1);
}

/**
 * Finds and deletes any existing auth user with the configured email.
 * This makes the script idempotent (safe to re-run) without relying on SQL.
 * Returns the former user id (if any) so role cleanup can run.
 */
async function deleteExistingUser() {
  const listRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    headers: { apikey: SERVICE_KEY, Authorization: 'Bearer ' + SERVICE_KEY },
  });
  if (!listRes.ok) return null;
  const listData = await listRes.json();
  const existing = (listData.users || []).find((u) => u.email === EMAIL);
  if (!existing) return null;

  console.log(`  Existing user found (${existing.id}), deleting to recreate cleanly...`);
  const delRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${existing.id}`, {
    method: 'DELETE',
    headers: { apikey: SERVICE_KEY, Authorization: 'Bearer ' + SERVICE_KEY },
  });
  console.log(delRes.ok ? '  ✓ Existing user deleted' : `  ! Delete failed: ${await delRes.text()}`);
  return existing.id;
}

async function main() {
  console.log('Creating super admin via Supabase Admin API...');
  console.log('URL:', SUPABASE_URL);
  console.log('Email:', EMAIL);

  // Step 0: Remove any existing user with this email so the script is re-runnable.
  await deleteExistingUser();

  // Step 1: Create the auth user
  const createRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: 'Bearer ' + SERVICE_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: EMAIL,
      password: PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: 'Super Admin' },
    }),
  });

  const createData = await createRes.json();

  if (!createRes.ok) {
    console.error('Failed to create user:', JSON.stringify(createData, null, 2));
    return;
  }

  console.log('✓ User created:', createData.id);

  // Step 2: Update role to super_admin (trigger already created 'admin')
  console.log('\nUpdating role to super_admin...');
  const roleRes = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?user_id=eq.${createData.id}`, {
    method: 'PATCH',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: 'Bearer ' + SERVICE_KEY,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ role: 'super_admin', full_name: 'Super Admin' }),
  });
  console.log('✓ Role updated:', roleRes.status === 204 ? 'OK' : roleRes.status);

  // Step 3: Test login
  console.log('\nTesting login...');
  const signRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });

  if (signRes.ok) {
    console.log('✓ Login test: SUCCESS');
    console.log('\n========================================');
    console.log('  Super Admin is ready!');
    console.log('  Login at: /admin/login');
    console.log('  Email: ' + EMAIL);
    console.log('  Password: (set in your .env as SUPERADMIN_PASSWORD)');
    console.log('========================================');
  } else {
    const signData = await signRes.json();
    console.log('✗ Login test FAILED:', signData.msg || JSON.stringify(signData));
  }
}

main().catch((e) => console.error('Error:', e));