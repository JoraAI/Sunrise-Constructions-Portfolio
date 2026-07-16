/**
 * Creates the super admin account via Supabase Admin API.
 * Run AFTER scripts/fix-auth.sql has been executed in Supabase SQL Editor.
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
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zobbbsjcagfnceoeotpk.supabase.co';

if (!SERVICE_KEY) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY not set in .env');
  console.error('Make sure your .env file has the SUPABASE_SERVICE_ROLE_KEY variable.');
  process.exit(1);
}

const EMAIL = 'superadmin@sunriseconstructions.in';
const PASSWORD = 'Sunrise@SuperAdmin2025';

async function main() {
  console.log('Creating super admin via Supabase Admin API...');
  console.log('URL:', SUPABASE_URL);
  console.log('Email:', EMAIL);

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

    // If user already exists, try to update password
    if (createData.msg && createData.msg.includes('already')) {
      console.log('\nUser already exists. Listing users to find ID...');
      const listRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
        headers: {
          apikey: SERVICE_KEY,
          Authorization: 'Bearer ' + SERVICE_KEY,
        },
      });
      const listData = await listRes.json();
      const user = (listData.users || []).find((u) => u.email === EMAIL);
      if (user) {
        console.log('Found user:', user.id);
        const updRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${user.id}`, {
          method: 'PUT',
          headers: {
            apikey: SERVICE_KEY,
            Authorization: 'Bearer ' + SERVICE_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password: PASSWORD }),
        });
        console.log('Password update:', updRes.ok ? 'OK' : await updRes.text());
      }
    }
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
    console.log('  Password: ' + PASSWORD);
    console.log('========================================');
  } else {
    const signData = await signRes.json();
    console.log('✗ Login test FAILED:', signData.msg || JSON.stringify(signData));
  }
}

main().catch((e) => console.error('Error:', e));