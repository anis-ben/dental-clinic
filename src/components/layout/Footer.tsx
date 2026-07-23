'use client';

import React from 'react';
import Link from 'next/link';
import { Stethoscope, Phone, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-slate-navy text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-medical-500 flex items-center justify-center text-white">
                <Stethoscope className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight">
                {language === 'ar' ? (
                  <>عيادة <span className="text-medical-400">الأسنان</span></>
                ) : (
                  <>Dental <span className="text-medical-400">Clinic</span></>
                )}
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t('footerBrandDesc')}
            </p>
            <div className="flex items-center gap-3 pt-2 text-medical-400 text-sm font-semibold">
              <ShieldCheck className="w-5 h-5" />
              <span>{t('footerSterilText')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white border-s-4 border-medical-500 ps-3">
              {t('footerQuickLinks')}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-medical-400 transition-colors">
                  {t('navHome')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-medical-400 transition-colors">
                  {t('navAbout')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-medical-400 transition-colors">
                  {t('navServices')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-medical-400 transition-colors">
                  {t('navContact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white border-s-4 border-medical-500 ps-3">
              {t('footerHoursHeader')}
            </h4>
            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span>{t('footerHoursSatThu')}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="font-semibold text-rose-400">{t('footerHoursFri')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
                <Clock className="w-4 h-4 text-medical-400" />
                <span>{t('footerEmergency')}</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white border-s-4 border-medical-500 ps-3">
              {t('footerContactHeader')}
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-medical-400 shrink-0" />
                <span className="dir-ltr font-mono text-base font-bold text-white">
                  +213 550 12 34 56
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-medical-400 shrink-0 mt-0.5" />
                <span>{t('footerAddress')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {language === 'ar' ? 'عيادة الأسنان' : 'Dental Clinic'}. {t('footerRights')}</p>
          <div className="flex items-center gap-2">
            <span>{language === 'ar' ? 'تم التطوير بأعلى معايير الأمان والرعاية الطبية' : 'Built with high security & care standards'}</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
