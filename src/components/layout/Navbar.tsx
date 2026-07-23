'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Stethoscope, Calendar, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BookingModal } from '@/components/features/booking/BookingModal';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('navHome') },
    { href: '/about', label: t('navAbout') },
    { href: '/services', label: t('navServices') },
    { href: '/contact', label: t('navContact') },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-navbar transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Clinic Logo */}
            <Link href="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-medical-600 to-medical-400 flex items-center justify-center text-white shadow-md shadow-medical-500/20 group-hover:scale-105 transition-transform duration-300">
                <Stethoscope className="w-7 h-7" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 tracking-tight block">
                  {language === 'ar' ? (
                    <>عيادة <span className="text-medical-500">الأسنان</span></>
                  ) : (
                    <>Dental <span className="text-medical-500">Clinic</span></>
                  )}
                </span>
                <span className="text-xs text-slate-500 font-medium block">
                  {language === 'ar' ? 'رعاية طبية تخصصية متكاملة' : 'Integrated Dental Care'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/60">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive(link.href)
                      ? 'bg-white text-medical-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Language Switcher & Primary CTA */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher />
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsBookingModalOpen(true)}
                className="shadow-lg shadow-medical-500/25"
              >
                <Calendar className="w-5 h-5 me-2" />
                {t('navBookNow')}
              </Button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-fade-in shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  isActive(link.href)
                    ? 'bg-medical-50 text-medical-600 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsBookingModalOpen(true);
              }}
              className="w-full"
            >
              {t('navBookNow')}
            </Button>
          </div>
        )}
      </header>

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
};
