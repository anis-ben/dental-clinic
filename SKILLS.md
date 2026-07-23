---
name: dental-clinic-architecture
description: Complete architectural reference, database schemas, RLS security policies, and custom hooks guide for Dental Clinic web application.
---

# 🦷 Dental Clinic Application ("Dental clinic") - Technical Architecture & Skills Guide

This documentation serves as the single source of truth for the **Dental Clinic** web application built with **Next.js 14+ (App Router)**, **TypeScript**, **Supabase**, **Tailwind CSS**, and **Zod**.

---

## 🛠️ Project Stack & Configuration
- **Framework**: Next.js 14+ (App Router, TypeScript, React 18/19)
- **Database & Auth**: Supabase PostgreSQL with Row Level Security (RLS)
- **Styling**: Tailwind CSS (Medical Teal Palette `#00A896` / `#028090`, Soft Mint `#E6F4F1`, Clean Slate `#F8FAFC`, Dark Slate `#0F172A`)
- **Icons**: `lucide-react`
- **Analytics Charts**: `recharts`
- **Validation**: Zod runtime schema validation (`bookingSchema`, `doctorSchema`, `serviceSchema`)
- **Direction & Font**: Dual Language i18n support (Arabic `dir="rtl"` & English `dir="ltr"`), Tajawal / Cairo font family from `next/font/google`
- **Language Switcher**: Dedicated `LanguageSwitcher.tsx` component in Navbar toggling `'ar'` and `'en'` context seamlessly.
- **Animations**: Custom Tailwind CSS animations (`animate-float`, `animate-fade-in-up`, `animate-pulse-glow`, `hover-glow-card`)
- **Navbar Layout**: Clean public navigation bar (`/`, `/about`, `/services`, `/contact`). Admin panel accessible via direct route (`/admin`) or footer link.

---

## 📐 Database DDL & Schema Architecture

### 1. Enums & Enforcements
- `appointment_status`: `'pending'`, `'confirmed'`, `'canceled'`

### 2. Relational Tables

#### `public.doctors`
- `id` (`UUID`, PK, `gen_random_uuid()`)
- `full_name` (`TEXT`, NOT NULL)
- `bio` (`TEXT`, NOT NULL)
- `years_experience` (`INT`, DEFAULT 0)
- `certifications` (`TEXT[]`, DEFAULT '{}')
- `image_url` (`TEXT`, NOT NULL)
- `active` (`BOOLEAN`, DEFAULT true)
- `created_at` (`TIMESTAMPTZ`, DEFAULT now())

#### `public.services`
- `id` (`UUID`, PK, `gen_random_uuid()`)
- `name` (`TEXT`, NOT NULL)
- `description` (`TEXT`, NOT NULL)
- `price` (`NUMERIC`, NOT NULL - Algerian Dinar DZD)
- `duration_minutes` (`INT`, DEFAULT 30)
- `active` (`BOOLEAN`, DEFAULT true)
- `created_at` (`TIMESTAMPTZ`, DEFAULT now())

#### `public.admin_users`
- `id` (`UUID`, PK, `gen_random_uuid()`)
- `email` (`TEXT`, UNIQUE, NOT NULL)
- `role` (`TEXT`, DEFAULT 'admin')
- `created_at` (`TIMESTAMPTZ`, DEFAULT now())

#### `public.appointments`
- `id` (`UUID`, PK, `gen_random_uuid()`)
- `patient_first_name` (`TEXT`, NOT NULL)
- `patient_last_name` (`TEXT`, NOT NULL)
- `age` (`INT`, NOT NULL)
- `phone_number` (`TEXT`, NOT NULL)
- `service_id` (`UUID`, FK -> `services.id`, ON DELETE RESTRICT)
- `preferred_date` (`DATE`, NOT NULL)
- `preferred_time` (`TEXT`, NOT NULL)
- `status` (`appointment_status`, DEFAULT 'pending')
- `confirmed_time_slot` (`TIMESTAMPTZ`, NULLABLE)
- `notes` (`TEXT`, NULLABLE)
- `created_at` (`TIMESTAMPTZ`, DEFAULT now())

---

## 🔐 Double Booking Prevention & RLS Security

### Double Booking Constraint
```sql
CREATE UNIQUE INDEX idx_unique_confirmed_slot 
ON public.appointments (preferred_date, confirmed_time_slot) 
WHERE status = 'confirmed';
```
*Guarantees that no two administrators or system processes can confirm the same appointment slot at the exact same timestamp.*

### RLS Policies
- `doctors` & `services`: Public `SELECT` allowed where `active = true` or for admin users.
- `appointments`: Public `INSERT` allowed for creating pending appointment requests. Full `SELECT`, `UPDATE`, `DELETE` allowed for administrative users.

---

## 📱 Algerian Phone Validation Schema
All phone numbers submitted through the booking system undergo runtime validation using Zod regex:
```typescript
export const algerianPhoneRegex = /^(05|06|07)[0-9]{8}$/;
```
Ensures that phone numbers are exactly 10 digits starting with `05`, `06`, or `07`.

---

## 🔐 Admin Authentication & Security Guard (`/admin/login`)

The Admin Control Panel is strictly isolated and protected against unauthorized access via `AdminAuthGuard.tsx` and `authService.ts`.

- **Login Route**: `/admin/login`
- **Security Protocols**:
  - SHA-256 cryptographic password hashing verification (zero plaintext password storage in client code).
  - Empty form inputs on initialization with sanitized UI (no hardcoded credential hints).
  - Encrypted auth session token stored in browser session & cookies (`SameSite=Lax; Secure`).
  - Automatic redirection to `/admin/login` if an unauthenticated user attempts to access any `/admin/*` route directly.
  - Logout action in `AdminSidebar` with instant token revocation.

---

## 🚪 Admin Control Panel Gates (`/admin`)

- **Gate 0 (`/admin`)**: Real-time Analytics Dashboard featuring metric cards (total visitors, today's confirmed, weekly confirmed, canceled count), date range selector, and interactive Recharts visualizations.
- **Gate 1 (`/admin/pending`)**: Pending Bookings Table with Optimistic UI updates. Action button `تنظيم الحجز` opens `ScheduleMatrixModal` displaying vacant vs. occupied time slots for requested dates.
- **Gate 2 (`/admin/schedule`)**: Master Schedule View with top date navigation tabs, daily timetable views, and slot cancellation/reschedule controls.
- **Gate 3 (`/admin/content`)**: Complete CRUD Management for Doctors and Services.

---

## 🎣 Custom React Hooks Usage

### `useAppointments(mode, dateStr)`
```typescript
const { appointments, isLoading, error, refetch, confirmAppointment, cancelAppointment } = useAppointments('pending');
```
Includes React `useOptimistic` hook updates for instant table feedback before network response.

### `useServices(adminOnly)`
```typescript
const { services, isLoading, error, refetch } = useServices(false);
```

### `useDoctors(adminOnly)`
```typescript
const { doctors, isLoading, error, refetch } = useDoctors(false);
```

### `useDebounce(value, delay)`
```typescript
const debouncedQuery = useDebounce(searchQuery, 300);
```

---

## 🚀 Running & Stopping Localhost Server

Dedicated control scripts are located inside the `server_control` folder:

- **Start Server (تشغيل السيرفر)**: Double-click `server_control/Start_Server.bat` or `server_control/تشغيل_السيرفر.bat`
  - Launches Next.js dev server (`npm run dev`) and opens `http://localhost:3000` in your web browser automatically.

- **Stop Server (إيقاف السيرفر)**: Double-click `server_control/Stop_Server.bat` or `server_control/إيقاف_السيرفر.bat`
  - Terminates the process running on Port 3000.

---

## ⚡ Troubleshooting & Verification Commands
- Check TypeScript build: `npm run build`
- Run local development server: `npm run dev`
- Seed database script: `seed.sql`
