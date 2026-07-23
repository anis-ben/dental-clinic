# 🚀 Master Prompt: Full-Stack Dental Clinic Web Application (Supabase + Next.js / React)

> **Role & Instructions for AI Agent / Developer**:
> You are acting as a **Principal Full-Stack Engineer**, **Lead UX Architect**, **Database Security Specialist**, and **Prompt Engineer**. Your mission is to build a complete, highly responsive, blazing-fast, scalable, and secure web application for a modern Dental Clinic named **"Dental clinic"**.

---

## 🛠️ Project Stack & Environment Overview
- **Project Name**: `Dental clinic`
- **Environment**: Running on `localhost` connected to **Supabase** via **MCP** (Model Context Protocol).
- **Core Stack**: Next.js 14+ (App Router, TypeScript, React 18/19), Tailwind CSS, Lucide Icons, Zod (Runtime Validation), Supabase Client (`@supabase/ssr` or `@supabase/supabase-js`), Recharts / Tremor for Analytics.
- **Design System & Palette**:
  - **Primary**: Medical Teal / Cyan (`#00A896` / `#028090`)
  - **Secondary / Accent**: Soft Mint (`#E6F4F1`) & Clean Slate (`#334155`)
  - **Backgrounds**: Pure White (`#FFFFFF`) & Soft Grey Tint (`#F8FAFC`)
  - **Text**: Dark Slate Navy (`#0F172A`)
  - **Status Indicators**: Soft Emerald (Confirmed/Completed), Amber (Pending), Soft Rose (Canceled)

---

## 📐 Information Architecture & Route Specifications

### 1. Public Front-End Pages
- **` Home` (`/`)**:
  - **Navbar**: Clinic Logo, clean navigation links, sticky header, prominent CTA button (`احجز الآن`).
  - **Hero Section**: Concise compelling tagline, quick overview, CTA button (`احجز الآن`).
  - **Services Overview**: Teaser grid of core dental treatments with direct action triggers.
  - **Doctors Team**: Photos, names, and specialties of attending dentists.
  - **Trust & Quality**: Badges highlighting hygiene standards, technology, and patient care quality.
  - **Testimonials**: User reviews and patient rating cards.
  - **Footer**: Working hours summary, emergency phone, social media links.
- **` About Us` (`/about`)**:
  - Comprehensive clinic introduction, mission, and achievements.
  - Detailed profiles of dentists: Years of experience, academic certificates, specialized procedures.
- **` Services` (`/services`)**:
  - Feature cards containing: Service Title, Short Description, Price (DZD / Currency), and a "حجز الخدمة" (Book Service) button that opens the booking modal pre-selecting the service.
- **` Contact Us` (`/contact`)**:
  - Interactive map container, physical clinic address, phone numbers, working hours table, social media links.
- **` Booking Modal / Form` (`/book`)**:
  - Fields required: **First Name**, **Last Name**, **Age**, **Phone Number**, **Preferred Date**, **Preferred Time Slot**.
  - Zod Schema validation on all fields.
  - On Submit: Inserts record into Supabase `appointments` table with `status: 'pending'`.
  - Immediate visual feedback dialog: *"تم تقديم طلب الحجز الخاص بك بنجاح، وسنتصل بك قريباً عبر الهاتف لتأكيد الموعد."*

---

### 2. Admin Control Panel (`/admin`)
Modular, secure interface protected by authentication and role-based policies.

- **Gate 0: Overview & Analytics (`الصفحة الأساسية`)**:
  - Real-time summary cards: Total Visitors, Completed Bookings (Today & This Week), Canceled Bookings.
  - Date range picker to analyze performance metrics across custom timeframes.
  - Interactive visual charts (Daily booking trend, popular services breakdown).
- **Gate 1: Pending Requests (`الحجوزات المقدمة`)**:
  - Clear data table displaying: Patient Name, Surname, Phone, Requested Date & Time, Requested Service.
  - Action button: `تنظيم الحجز` (Schedule Appointment).
  - Modal overlay on click: Displays the daily schedule matrix for the requested date with vacant/occupied slots highlighted. Admin selects an open slot, contacts the patient, and clicks `تأكيد الطلب` (Confirm) or `إلغاء الطلب` (Cancel).
- **Gate 2: Master Schedule (`ترتيب الحجوزات`)**:
  - Date navigation bar/tabs at the top.
  - Day view schedule table showing all bookings for the selected date.
  - Quick action controls to reschedule, edit appointment details, or cancel any existing booking.
- **Gate 3: Content Management (`إدارة المحتوى والأطباء والخدمات`)**:
  - CRUD management for **Doctors** (Add/Edit photo, bio, years of experience, certificates).
  - CRUD management for **Services** (Add/Edit service name, description, price, active status).

---

## 🔐 Database Schema & Security (Supabase)

1. **Relational Database Principles**:
   - `doctors`: `id (uuid, PK)`, `full_name (text)`, `bio (text)`, `years_experience (int)`, `certifications (text[])`, `image_url (text)`, `active (boolean, default true)`.
   - `services`: `id (uuid, PK)`, `name (text)`, `description (text)`, `price (numeric)`, `duration_minutes (int)`, `active (boolean, default true)`.
   - `appointments`: `id (uuid, PK)`, `patient_first_name (text)`, `patient_last_name (text)`, `age (int)`, `phone_number (text)`, `service_id (uuid, FK -> services.id)`, `preferred_date (date)`, `preferred_time (time)`, `status (enum: 'pending', 'confirmed', 'canceled')`, `confirmed_time_slot (timestamp)`, `created_at (timestamptz)`.
   - Enforce Strict **Foreign Keys** and `ON DELETE RESTRICT` or `CASCADE` where applicable. Enforce strict normalization.

2. **Row Level Security (RLS)**:
   - Enable RLS on ALL tables immediately.
   - Public policy: `INSERT` allowed on `appointments` (status fixed to `pending`), `SELECT` allowed on active `services` and `doctors`.
   - Admin policy: Full access (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) for authenticated admin users.

3. **Environment Security**:
   - Zero hardcoded keys in code.
   - All credentials managed via `.env.local`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
   - Restrict Public Anon Keys to strictly allowed client operations.

---

## 💻 Code Architecture & Engineering Directives

1. **Feature-Based & Atomic Architecture**:
   - Maintain clean folder structure:
     - `src/components/ui` (Atoms: Buttons, Inputs, Cards, Modals)
     - `src/components/features` (Molecules/Organisms: BookingForm, DoctorCard, AdminTable)
     - `src/hooks` (Custom hooks: `useAppointments`, `useServices`, `useDebounce`)
     - `src/services` (Supabase API interaction layer)
     - `src/types` (TypeScript interfaces and type definitions)
     - `src/lib/validations` (Zod schemas)

2. **Strict Type Safety & Runtime Validation**:
   - BANNED: `any` type usage. Use `unknown` with type narrowing in `try/catch` blocks.
   - Implement Zod / ArkType schemas for ALL incoming forms and API payloads before syncing with state or DB.

3. **Incremental & Modular Execution**:
   - Build features step-by-step.
   - **STRICT RULE**: Never write placeholder comments like `// TODO: implement later`. Provide 100% complete, working code for every step. If token limit requires, divide into modular sub-tasks and ask for permission before moving forward.

4. **Data Fetching, Performance & Optimization**:
   - Every fetch operation must handle `isLoading` and `error` states gracefully.
   - Implement **Debouncing** for continuous live search inputs.
   - Prevent `useEffect` infinite dependency loops.
   - Use `useCallback` and `useMemo` judiciously for expensive calculations or callback props.
   - Implement Code Splitting (`next/dynamic` or `React.lazy`) for heavy admin charts and modals to minimize initial bundle size.
   - Use optimized image components (`next/image`) with explicit dimensions to eliminate Cumulative Layout Shift (CLS).
   - Use **Skeleton Loaders** mirroring actual UI geometry during data fetch states (NEVER plain text "Loading...").

5. **Resilience & Fault Tolerance**:
   - Wrap sensitive sub-systems (Admin Panel, Data Tables, Charts) in **Error Boundaries**.
   - If an error occurs, render a polite fallback UI with a retry/refresh option, preventing full page crashes.

6. **Self-Documenting Code & Testing Readiness**:
   - Use descriptive variable and function naming.
   - Provide JSDoc annotations above complex services, API endpoints, and custom hooks specifying parameters and return types.
   - Keep business logic in **Pure Functions** isolated from presentation components for effortless Unit Testing (Vitest/Jest).

7. **Project Documentation File (`SKILLS.md`)**:
   - Maintain a root-level `SKILLS.md` file documenting architecture decisions, database models, RLS policies, custom hooks usage, and troubleshooting steps.

---

## 🎨 UI/UX Specifications & Design Rules

1. **Target Audience & Accessibility**:
   - **3-Click Rule**: Any core task (e.g. booking an appointment) must be reachable in 3 clicks or less.
   - **WCAG Contrast Compliance**: Ensure high visual contrast for typography across all backgrounds.
   - No unnecessary decorative elements that clutter user flow.

2. **Typography Hierarchy**:
   - Single modern, fast-loading font family (e.g. `Tajawal` or `Cairo`).
   - **H1**: 32px – 40px (Bold)
   - **H2 / H3**: 20px – 28px (Semi-Bold)
   - **Body**: 16px (Regular)
   - **STRICT RULE**: Absolutely NO font size smaller than `14px` anywhere.
   - **Line Height**: Minimum `1.5` for optimal readability.

3. **Spacing & 8pt Grid System**:
   - Strict adherence to 8pt Grid System for all margins, paddings, and gaps (`8px`, `16px`, `24px`, `32px`, `48px`).
   - Generous white space around interactive elements.
   - Uniform padding and margins across all pages and card containers.

4. **Micro-Interactions & Feedback**:
   - Clean Navbar containing only essential routes.
   - Immediate visual feedback on touch/hover (`hover:bg-teal-700`, `active:scale-95`).
   - Friendly, actionable micro-copy in error notifications (e.g., *"يرجى التأكد من صحة رقم الهاتف والمحاولة مجدداً"*).

5. **Mobile-First Approach**:
   - Design and test components for mobile devices first, scaling up responsively to desktop (`sm`, `md`, `lg`, `xl`).
   - Minimum **Touch Target Size**: All buttons and clickable targets MUST be at least `44x44px`.

---

## 📋 Execution Plan for AI Agent

When instructed to start building:
1. **Step 1**: Initialize Project Structure, `.env.local` config, Supabase Client setup, and `SKILLS.md`.
2. **Step 2**: Create Database DDL SQL Scripts (Tables, Relations, Enums, RLS policies).
3. **Step 3**: Build Shared Design System & UI Atoms (Typography, Buttons, Inputs, Cards, Skeleton Loaders, Error Boundaries).
4. **Step 4**: Build Public Pages (`Home`, `About`, `Services`, `Contact`, `Booking Modal` with Zod validation).
5. **Step 5**: Build Admin Gate 0 (Dashboard & Analytics with Charts).
6. **Step 6**: Build Admin Gate 1 (Pending Bookings & Slot Matrix Confirmation Modal).
7. **Step 7**: Build Admin Gate 2 (Master Day Schedule View & Actions).
8. **Step 8**: Build Admin Gate 3 (Content Management CRUD for Doctors & Services).
9. **Step 9**: Conduct Security & Performance Audit (RLS verification, CLS check, Error boundary verification).
