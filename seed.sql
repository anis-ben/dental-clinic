-- Seed Script for "Dental clinic" Supabase Database
-- Run this script to populate database schema, constraints, RLS policies, and sample data.

-- 1. Create Enums
DO $$ BEGIN
    CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'canceled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create Doctors Table
CREATE TABLE IF NOT EXISTS public.doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    bio TEXT NOT NULL,
    years_experience INT NOT NULL DEFAULT 0,
    certifications TEXT[] DEFAULT '{}',
    image_url TEXT NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC NOT NULL,
    duration_minutes INT NOT NULL DEFAULT 30,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create Admin Users Table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Create Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_first_name TEXT NOT NULL,
    patient_last_name TEXT NOT NULL,
    age INT NOT NULL,
    phone_number TEXT NOT NULL,
    service_id UUID REFERENCES public.services(id) ON DELETE RESTRICT,
    preferred_date DATE NOT NULL,
    preferred_time TEXT NOT NULL,
    status appointment_status DEFAULT 'pending',
    confirmed_time_slot TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Double Booking Prevention Unique Index
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_confirmed_slot 
ON public.appointments (preferred_date, confirmed_time_slot) 
WHERE status = 'confirmed';

-- 7. RLS Setup
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 8. Seed Doctors Data
INSERT INTO public.doctors (full_name, bio, years_experience, certifications, image_url, active)
VALUES
('د. أمين بن علي', 'أخصائي جراحة الفك والأسنان وزراعة الأسنان المتقدمة، خبرة واسعة في التقنيات الحديثة والتجميل.', 12, ARRAY['دكتوراه في جراحة الأسنان', 'شهادة زراعة الأسنان - البرازيل', 'عضو الجمعية العربية لتجميل الأسنان'], 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop', true),
('د. مريم القادري', 'استشارية تقويم الأسنان وطب أسنان الأطفال، تهتم بتقديم تجربة علاجية مريحة وخالية من الألم.', 9, ARRAY['ماجستير تقويم الأسنان والفكين', 'شهادة التقويم الشفاف (Invisalign)', 'دبلوم طب أسنان الأطفال'], 'https://images.unsplash.com/photo-1594824813571-24a69c100417?q=80&w=800&auto=format&fit=crop', true),
('د. سفيان شريف', 'أخصائي تجميل الأسنان والقشور الخزفية (هوليود ستايل)، شغوف بالابتسامة الرقمية والتصميم ثلاثي الأبعاد.', 8, ARRAY['دبلوم تجميل الأسنان الرقمي (DSD)', 'شهادة القشور الخزفية الابتسامة'], 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop', true)
ON CONFLICT DO NOTHING;

-- 9. Seed Services Data
INSERT INTO public.services (name, description, price, duration_minutes, active)
VALUES
('فحص شامل واستشارة طبية', 'فحص كامل للفم والأسنان باستخدام الأشعة الرقمية وتشخيص الدقيق للحالة مع خطة علاجية مخصصة.', 3000, 30, true),
('تنظيف وتلميع الأسنان', 'إزالة الجير والتكلسات وعلاج التهابات اللثة وتلميع السطح لابتسامة منعشة وصحية.', 5000, 45, true),
('تبييض الأسنان بالليزر', 'جلسة تبييض متطورة باستخدام تقنية الليزر الحديثة للحصول على درجات تبييض رائعة بدون حساسية.', 18000, 60, true),
('قشور الخزف التجميلية (ابتسامة هوليود)', 'عدسات وسيراميك تجميل فائق الدقة لإصلاح الفراغات وتغيير لون وشكل الأسنان بشكل طبيعي.', 35000, 90, true),
('تقويم الأسنان (شفاف / معدني)', 'تصحيح تزاحم الأسنان واعوجاج الفكين باستخدام أحدث نظم التقويم الشفاف أو الملون.', 120000, 60, true),
('زراعة الأسنان المتقدمة', 'استبدال الأسنان المفقودة زرعات غرسية من التيتانيوم عالي الجودة مع ضمان طويل الأمد.', 85000, 90, true),
('علاج وسحب العصب', 'علاج جذور الأسنان وتنظيف القنوات بأحدث الأجهزة الإلكترونية لمنع الألم تماماً.', 12000, 60, true),
('حشوات تجميلية ملونة', 'حشوات كومبوزيت ملونة تطابق لون السن الطبيعي لإصلاح التسوس والكسور البسيطة.', 6000, 45, true)
ON CONFLICT DO NOTHING;

-- 10. Admin user
INSERT INTO public.admin_users (email, role)
VALUES ('admin@dentalclinic.dz', 'admin')
ON CONFLICT (email) DO NOTHING;
