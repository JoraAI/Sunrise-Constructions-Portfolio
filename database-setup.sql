-- ============================================================================
-- Sunrise Constructions — MASTER DATABASE SETUP
-- ============================================================================
-- This is the ONLY SQL file you need to run. It does EVERYTHING:
--   1. Drops all existing tables (clean slate)
--   2. Creates auth system + user roles + triggers
--   3. Creates content tables (projects, services, industries, etc.)
--   4. Creates operational tables (tickets, media, newsletter, etc.)
--   5. Creates the first super admin account
--
-- INSTRUCTIONS:
--   1. Go to Supabase Dashboard → SQL Editor
--   2. Paste this ENTIRE file → Click "Run"
--   3. Done! Login at /admin/login
--      Email: superadmin@sunriseconstructions.in
--      Password: Sunrise@SuperAdmin2025
--
-- ⚠️  This DELETES all existing data and recreates from scratch.
-- ⚠️  Change the super admin password after first login at /admin/settings.
-- ============================================================================

-- ============================================================================
-- STEP 0: CLEAN SLATE — Drop everything (ignore errors if not exists)
-- ============================================================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

DROP TABLE IF EXISTS content_projects CASCADE;
DROP TABLE IF EXISTS content_services CASCADE;
DROP TABLE IF EXISTS content_industries CASCADE;
DROP TABLE IF EXISTS content_team CASCADE;
DROP TABLE IF EXISTS content_testimonials CASCADE;
DROP TABLE IF EXISTS content_blog_posts CASCADE;
DROP TABLE IF EXISTS content_job_listings CASCADE;
DROP TABLE IF EXISTS content_site_settings CASCADE;
DROP TABLE IF EXISTS media_assets CASCADE;
DROP TABLE IF EXISTS chat_tickets CASCADE;
DROP TABLE IF EXISTS newsletter_subscribers CASCADE;
DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS job_applications CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;

-- Delete the super admin user from auth if it exists
DELETE FROM auth.users WHERE email = 'superadmin@sunriseconstructions.in';

-- ============================================================================
-- STEP 1: USER ROLES (Admin Authentication)
-- ============================================================================
CREATE TABLE user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own role" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Super admins can read all roles" ON user_roles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'super_admin')
  );
CREATE POLICY "Super admins can insert user roles" ON user_roles
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'super_admin')
  );
CREATE POLICY "Super admins can update user roles" ON user_roles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'super_admin')
  );
CREATE POLICY "Super admins can delete user roles" ON user_roles
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'super_admin')
  );

CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role);

-- ============================================================================
-- STEP 2: AUTO-ASSIGN TRIGGER (new signups get 'admin' role automatically)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, email, role, full_name)
  VALUES (NEW.id, NEW.email, 'admin', COALESCE(NEW.raw_user_meta_data->>'full_name', ''))
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- STEP 3: OPERATIONAL TABLES (Tickets, Newsletter, Contact, Applications)
-- ============================================================================
CREATE TABLE chat_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_name TEXT,
  visitor_email TEXT,
  visitor_phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE chat_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create chat tickets" ON chat_tickets FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view chat tickets" ON chat_tickets FOR SELECT USING (true);
CREATE POLICY "Anyone can update chat tickets" ON chat_tickets FOR UPDATE USING (true);

CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view subscribers" ON newsletter_subscribers FOR SELECT USING (true);

CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  project_type TEXT,
  project_location TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view contact" ON contact_submissions FOR SELECT USING (true);
CREATE POLICY "Anyone can update contact" ON contact_submissions FOR UPDATE USING (true);

CREATE TABLE job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_slug TEXT,
  job_title TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  cover_letter TEXT,
  resume_url TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'shortlisted', 'rejected', 'hired')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can apply" ON job_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view applications" ON job_applications FOR SELECT USING (true);
CREATE POLICY "Anyone can update applications" ON job_applications FOR UPDATE USING (true);

-- ============================================================================
-- STEP 4: MEDIA ASSETS TABLE
-- ============================================================================
CREATE TABLE media_assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL DEFAULT 'general',
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  alt_text TEXT,
  mime_type TEXT,
  file_size BIGINT,
  uploaded_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read media" ON media_assets FOR SELECT USING (true);
CREATE POLICY "Anyone can insert media" ON media_assets FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update media" ON media_assets FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete media" ON media_assets FOR DELETE USING (true);
CREATE INDEX idx_media_assets_section ON media_assets(section);

-- ============================================================================
-- STEP 5: CONTENT CMS TABLES
-- ============================================================================

-- Projects
CREATE TABLE content_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Infrastructure',
  location TEXT, year TEXT, client TEXT, metric TEXT,
  image TEXT, alt TEXT, featured BOOLEAN DEFAULT false,
  gallery JSONB DEFAULT '[]'::jsonb,
  summary TEXT, overview TEXT,
  scope JSONB DEFAULT '[]'::jsonb,
  metrics JSONB DEFAULT '[]'::jsonb,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE content_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read projects" ON content_projects FOR SELECT USING (true);
CREATE POLICY "Insert projects" ON content_projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Update projects" ON content_projects FOR UPDATE USING (true);
CREATE POLICY "Delete projects" ON content_projects FOR DELETE USING (true);

-- Services
CREATE TABLE content_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT,
  icon TEXT DEFAULT 'hard-hat',
  image TEXT, alt TEXT,
  overview TEXT,
  key_deliverables JSONB DEFAULT '[]'::jsonb,
  process JSONB DEFAULT '[]'::jsonb,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE content_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read services" ON content_services FOR SELECT USING (true);
CREATE POLICY "Insert services" ON content_services FOR INSERT WITH CHECK (true);
CREATE POLICY "Update services" ON content_services FOR UPDATE USING (true);
CREATE POLICY "Delete services" ON content_services FOR DELETE USING (true);

-- Industries
CREATE TABLE content_industries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT,
  icon TEXT DEFAULT 'briefcase',
  image TEXT, alt TEXT,
  overview TEXT,
  capabilities JSONB DEFAULT '[]'::jsonb,
  metrics JSONB DEFAULT '[]'::jsonb,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE content_industries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read industries" ON content_industries FOR SELECT USING (true);
CREATE POLICY "Insert industries" ON content_industries FOR INSERT WITH CHECK (true);
CREATE POLICY "Update industries" ON content_industries FOR UPDATE USING (true);
CREATE POLICY "Delete industries" ON content_industries FOR DELETE USING (true);

-- Team
CREATE TABLE content_team (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT, image TEXT, alt TEXT, linkedin TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE content_team ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read team" ON content_team FOR SELECT USING (true);
CREATE POLICY "Insert team" ON content_team FOR INSERT WITH CHECK (true);
CREATE POLICY "Update team" ON content_team FOR UPDATE USING (true);
CREATE POLICY "Delete team" ON content_team FOR DELETE USING (true);

-- Testimonials
CREATE TABLE content_testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT, company TEXT, project TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  image TEXT, alt TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE content_testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read testimonials" ON content_testimonials FOR SELECT USING (true);
CREATE POLICY "Insert testimonials" ON content_testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Update testimonials" ON content_testimonials FOR UPDATE USING (true);
CREATE POLICY "Delete testimonials" ON content_testimonials FOR DELETE USING (true);

-- Blog Posts
CREATE TABLE content_blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  category TEXT DEFAULT 'General',
  author TEXT, author_role TEXT, date TEXT,
  reading_time TEXT DEFAULT '5 min read',
  image TEXT, alt TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  content JSONB DEFAULT '[]'::jsonb,
  published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE content_blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read blog" ON content_blog_posts FOR SELECT USING (true);
CREATE POLICY "Insert blog" ON content_blog_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Update blog" ON content_blog_posts FOR UPDATE USING (true);
CREATE POLICY "Delete blog" ON content_blog_posts FOR DELETE USING (true);

-- Job Listings
CREATE TABLE content_job_listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  department TEXT NOT NULL DEFAULT 'Engineering',
  location TEXT NOT NULL DEFAULT 'Nagpur',
  employment_type TEXT DEFAULT 'Full-time',
  description TEXT,
  responsibilities JSONB DEFAULT '[]'::jsonb,
  requirements JSONB DEFAULT '[]'::jsonb,
  qualifications JSONB DEFAULT '[]'::jsonb,
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE content_job_listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read jobs" ON content_job_listings FOR SELECT USING (true);
CREATE POLICY "Insert jobs" ON content_job_listings FOR INSERT WITH CHECK (true);
CREATE POLICY "Update jobs" ON content_job_listings FOR UPDATE USING (true);
CREATE POLICY "Delete jobs" ON content_job_listings FOR DELETE USING (true);

-- Site Settings (single-row global config)
CREATE TABLE content_site_settings (
  id TEXT DEFAULT 'singleton' PRIMARY KEY,
  stats JSONB DEFAULT '[]'::jsonb,
  about_heading TEXT,
  about_body JSONB DEFAULT '[]'::jsonb,
  about_image TEXT,
  about_image_alt TEXT,
  mission TEXT, vision TEXT, values TEXT,
  certifications JSONB DEFAULT '[]'::jsonb,
  process_steps JSONB DEFAULT '[]'::jsonb,
  hero_eyebrow TEXT, hero_headline TEXT,
  hero_headline_accent TEXT, hero_subheadline TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE content_site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read settings" ON content_site_settings FOR SELECT USING (true);
CREATE POLICY "Update settings" ON content_site_settings FOR UPDATE USING (true);

-- ============================================================================
-- STEP 6: SUPER ADMIN
-- The super admin is created via the Node.js script (npm run create-superadmin)
-- which uses Supabase's Admin API for proper password hashing.
-- DO NOT create users via raw SQL — it corrupts the auth system.
-- ============================================================================

-- ============================================================================
-- STEP 7: VERIFY
-- ============================================================================
SELECT 'Tables created: ' || count(*)::text AS result FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'content_%' OR table_name IN ('user_roles', 'media_assets', 'chat_tickets', 'newsletter_subscribers', 'contact_submissions', 'job_applications');

SELECT 'Super admin: ' || email || ' (' || role || ')' AS result FROM user_roles WHERE email = 'superadmin@sunriseconstructions.in';

-- ============================================================================
-- DONE!
-- Login at: /admin/login
-- Email: superadmin@sunriseconstructions.in
-- Password: Sunrise@SuperAdmin2025
--
-- After running this SQL, create the super admin:
--   npm run create-superadmin
-- Then upload media:
--   npm run migrate-media
-- ============================================================================
