# 🦷 Dental Clinic - Full-Stack Web Application

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-emerald?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Zod](https://img.shields.io/badge/Zod-Validation-purple?style=for-the-badge)](https://zod.dev/)
[![Recharts](https://img.shields.io/badge/Recharts-Analytics-22c55e?style=for-the-badge)](https://recharts.org/)
[![RTL Support](https://img.shields.io/badge/RTL-Arabic_First-00A896?style=for-the-badge)](https://nextjs.org/)

A modern, highly responsive, blazing-fast, scalable, and secure web application built for a dental clinic named **"Dental clinic"**. Featuring full RTL Arabic typography, dynamic appointment slot booking, real-time analytics, isolated admin authorization, double-booking database prevention, and modern UI micro-animations.

---

## 📸 Key Application Showcase

```
+-----------------------------------------------------------------------------------+
|                        🦷 DENTAL CLINIC PUBLIC & ADMIN APP                         |
+------------------------------------------+----------------------------------------+
| 🌐 PUBLIC FRONT-END                      | 🔐 ISOLATED ADMIN CONTROL PANEL        |
| - Hero Banner & Interactive CTA          | - Gate 0: Real-Time Analytics          |
| - Treatments & Services Grid             | - Gate 1: Pending Requests Matrix      |
| - Doctors Credentials & Experience Cards  | - Gate 2: Master Schedule Timetable    |
| - Zod Validated Booking Modal            | - Gate 3: Content CRUD Management      |
+------------------------------------------+----------------------------------------+
```

---

## ✨ Comprehensive Features Grid

### 1. 🌐 Public Front-End Pages (React Server Components RSC)
- **Home (`/`)**:
  - Hero Section with tagline, floating status badges (`animate-float`), and "احجز الآن" CTA trigger.
  - Interactive Services Overview preview grid with pre-selection triggers.
  - Attending Doctors team section with experience metrics and academic certificates.
  - Quality Highlights (100% German sterilization standards, 3D imaging, pain-free laser care).
  - Patient Reviews slider and rating cards.
- **About Us (`/about`)**: Comprehensive clinic introduction, mission, values, and doctor profiles.
- **Services (`/services`)**: Filterable treatment cards showing Service Title, Description, Price in Algerian Dinar (DZD), estimated session duration in minutes, and direct booking modal triggers.
- **Contact Us (`/contact`)**: Interactive Google Maps iframe container, phone numbers, working hours table, and physical clinic address.
- **Booking Modal / Standalone Page (`/book` & `BookingModal`)**:
  - Form Fields: First Name, Last Name, Age, Algerian Phone Number, Service Selection, Preferred Date, Preferred Time Slot, Notes.
  - Algerian Phone Number Zod Validation Regex (`^(05|06|07)[0-9]{8}$`).
  - Dynamic service price & duration preview badge.
  - Automatic confirmation notice:
    > *"تم تقديم طلب الحجز الخاص بك بنجاح، وسنتصل بك قريباً عبر الهاتف لتأكيد الموعد."*

---

### 2. 🔐 Isolated Admin Control Panel (`/admin`)
Strictly protected under `AdminAuthGuard` with encrypted session state and SHA-256 cryptographic password hashing (`/admin/login`).

- **Gate 0: Dashboard & Analytics (`/admin`)**:
  - Summary metric cards: Total Visitors, Confirmed Today, Confirmed This Week, Canceled Count.
  - Custom date range filter (`Today`, `Last 7 Days`, `Last 30 Days`).
  - Dynamic Recharts visualizations (Daily booking trend line/area chart & Service popularity bar chart).
- **Gate 1: Pending Bookings (`/admin/pending`)**:
  - Data table displaying incoming appointment requests.
  - React `useOptimistic` hook updates table state immediately for instant feedback.
  - "تنظيم الحجز" button opens `ScheduleMatrixModal`, displaying an 8:00 AM – 5:00 PM time slot matrix highlighting vacant vs. occupied slots.
- **Gate 2: Master Schedule (`/admin/schedule`)**:
  - Date navigation bar with daily timetable views.
  - Action controls to reschedule, edit appointment details, or cancel any booking.
- **Gate 3: Content Management (`/admin/content`)**:
  - Full CRUD management for Doctors (add/edit photo URL, bio, experience, certificates, active toggle).
  - Full CRUD management for Services (add/edit name, description, DZD price, duration minutes, active toggle).

---

## 🛡️ Security, Database & Validation Architecture

### 1. Database Schema & Relational Models (Supabase Postgres)
- **`doctors`**: `id (uuid, PK)`, `full_name`, `bio`, `years_experience`, `certifications (text[])`, `image_url`, `active`.
- **`services`**: `id (uuid, PK)`, `name`, `description`, `price (DZD)`, `duration_minutes`, `active`.
- **`admin_users`**: `id (uuid, PK)`, `email`, `role`.
- **`appointments`**: `id (uuid, PK)`, `patient_first_name`, `patient_last_name`, `age`, `phone_number`, `service_id (FK -> services.id)`, `preferred_date`, `preferred_time`, `status (enum: 'pending', 'confirmed', 'canceled')`, `confirmed_time_slot`.

### 2. Double Booking Prevention Constraint
To eliminate race conditions when multiple administrators manage appointments simultaneously, a Postgres unique index is enforced:
```sql
CREATE UNIQUE INDEX idx_unique_confirmed_slot 
ON public.appointments (preferred_date, confirmed_time_slot) 
WHERE status = 'confirmed';
```

### 3. Row Level Security (RLS)
- RLS enabled on all database tables.
- Public policy: `INSERT` allowed on `appointments` (status fixed to `'pending'`), `SELECT` allowed on active `services` and `doctors`.
- Admin policy: Full access (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) for authenticated admin users.

### 4. Algerian Phone Number Runtime Validation
Enforced via Zod regex across all booking forms:
```typescript
export const algerianPhoneRegex = /^(05|06|07)[0-9]{8}$/;
```
Rejects invalid landlines or malformed strings while validating 10-digit Mobilis (`05`), Ooredoo (`06`), and Djezzy (`07`) numbers.

---

## 🎨 Design System & Micro-Animations

- **Color Palette**:
  - Primary / Medical Accent: `#00A896` / `#028090` (Teal / Cyan)
  - Secondary / Accent: `#E6F4F1` (Soft Mint)
  - Background: `#F8FAFC` (Clean Slate) & `#FFFFFF`
  - Typography: `#0F172A` (Dark Slate Navy)
  - Status Indicators: Soft Emerald (Confirmed), Amber (Pending), Soft Rose (Canceled)
- **RTL & Typography**: Full Arabic RTL (`dir="rtl"`) layout integrated with Google font `Tajawal`.
- **Micro-Animations**:
  - `animate-float`: Continuous smooth floating movement for status cards.
  - `animate-pulse-glow`: Glowing teal accents for hero banners and primary CTA elements.
  - `animate-fade-in-up`: Smooth upward page component entrance transitions.
  - `hover-glow-card`: Responsive card elevation and glow on hover.
- **Accessibility & Touch Targets**: All interactive buttons, selects, inputs, and modal controls adhere to $\ge 44\text{px}$ touch target size.

---

## 💻 Local Installation & Setup Guide

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/your-username/dental-clinic.git
cd "dental-clinic"
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Inside `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://dvqxknpvhstqqlrkxvbt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Initialize Database Schema & Seed Data
Run `seed.sql` in your Supabase SQL Editor to populate schemas, double booking constraints, RLS policies, doctors, and services.

### 4. Run Development Server
```bash
# Option 1: Command Line
npm run dev

# Option 2: Double-Click Script
# Open server_control/Start_Server.bat
```
Navigate to `http://localhost:3000` in your web browser.

---

## 🧪 E2E Automated Testing Results (`TEST_RESULTS.md`)

All 5 E2E Automated Test Suites have passed with a **100% Success Rate**:
- **Suite 1: Database Security & Constraints**: PASSED (RLS Policies & Double Booking Constraint verified).
- **Suite 2: Zod Runtime Validations**: PASSED (Phone regex & age boundaries verified).
- **Suite 3: Public Booking Flow**: PASSED (Service pre-selection & confirmation notice verified).
- **Suite 4: Admin Control Panel**: PASSED (Gate 0–3, Optimistic UI, & SHA-256 Auth Guard verified).
- **Suite 5: UI/UX & Resilience**: PASSED (RTL alignment, touch targets $\ge 44\text{px}$, Skeleton loaders, & ErrorBoundaries verified).

