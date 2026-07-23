'use client';

import React from 'react';
import { ServiceGrid } from '@/components/features/services/ServiceGrid';
import { Stethoscope } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-medical-50 text-medical-700 px-4 py-1.5 rounded-full text-xs font-bold border border-medical-200">
          <Stethoscope className="w-4 h-4 text-medical-500" />
          <span>{t('servicesBadge')}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900">
          {t('servicesTitle')}
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          {t('servicesSubtitle')}
        </p>
      </div>

      {/* Service Grid Component */}
      <ServiceGrid />
    </div>
  );
}
