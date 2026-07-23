'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/90 text-slate-800 text-xs font-bold transition-all border border-slate-200 shadow-sm focus:outline-none min-h-[44px]"
      title={language === 'ar' ? 'Switch to English' : 'التغيير إلى العربية'}
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4 text-medical-600" />
      <span>{language === 'ar' ? 'English' : 'العربية'}</span>
    </button>
  );
};
