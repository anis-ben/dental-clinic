import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

export const metadata: Metadata = {
  title: 'عيادة الأسنان - Dental Clinic',
  description: 'عيادة الأسنان المتخصصة في أحدث تقنيات طب وتجميل الأسنان وزراعة الأسنان الرقمية.',
  keywords: ['عيادة أسنان', 'Dental Clinic', 'تجميل أسنان', 'زراعة أسنان', 'تقويم أسنان'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex flex-col justify-between bg-slate-bg text-slate-navy font-sans antialiased">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
