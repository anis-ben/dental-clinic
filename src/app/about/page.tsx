'use client';

import React from 'react';
import { DoctorGrid } from '@/components/features/doctors/DoctorGrid';
import { Award, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-20 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Intro Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-medical-50 text-medical-700 px-4 py-1.5 rounded-full text-xs font-bold border border-medical-200">
          <Sparkles className="w-4 h-4 text-medical-500" />
          <span>{t('aboutMissionBadge')}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900">
          {t('aboutTitle')}
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          {t('aboutSubtitle')}
        </p>
      </section>

      {/* Mission & Vision Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-card space-y-4 text-start">
          <div className="w-12 h-12 bg-medical-50 text-medical-600 rounded-2xl flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{t('aboutVisionTitle')}</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            {t('aboutVisionDesc')}
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-card space-y-4 text-start">
          <div className="w-12 h-12 bg-medical-50 text-medical-600 rounded-2xl flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{t('aboutValuesTitle')}</h2>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-medical-500 shrink-0" />
              <span>{t('aboutVal1')}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-medical-500 shrink-0" />
              <span>{t('aboutVal2')}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-medical-500 shrink-0" />
              <span>{t('aboutVal3')}</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Doctors Profiles Section */}
      <section className="space-y-8 pt-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black text-slate-900">{t('doctorsTitle')}</h2>
          <p className="text-slate-600 text-base">{t('doctorsSubtitle')}</p>
        </div>

        <DoctorGrid />
      </section>
    </div>
  );
}
