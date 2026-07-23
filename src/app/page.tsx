'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Stethoscope,
  ShieldCheck,
  Sparkles,
  Calendar,
  Star,
  Users,
  ArrowLeft,
  Activity,
  HeartHandshake,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ServiceGrid } from '@/components/features/services/ServiceGrid';
import { DoctorGrid } from '@/components/features/doctors/DoctorGrid';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function HomePage() {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-mint-soft/80 via-white to-slate-bg pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-medical-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6 text-start animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-medical-200 text-medical-700 text-xs sm:text-sm font-bold shadow-sm animate-pulse-glow">
                <Sparkles className="w-4 h-4 text-medical-500" />
                <span>{t('heroBadge')}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight">
                {t('heroTitlePart1')}{' '}
                <span className="text-medical-500 drop-shadow-sm">{t('heroTitlePart2')}</span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
                {t('heroSubtitle')}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/services">
                  <Button variant="primary" size="lg" className="shadow-lg shadow-medical-500/25 hover:scale-105 transition-transform duration-300">
                    <Calendar className="w-5 h-5 me-2" />
                    {t('heroCtaBook')}
                  </Button>
                </Link>

                <Link href="/about">
                  <Button variant="outline" size="lg" className="hover:scale-105 transition-transform duration-300">
                    {t('heroCtaDoctors')}
                    <ArrowLeft className={`w-5 h-5 ${language === 'ar' ? 'mr-2' : 'ml-2 rotate-180'}`} />
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80">
                <div className="hover:-translate-y-1 transition-transform">
                  <span className="block text-2xl font-black text-slate-900">+12,000</span>
                  <span className="text-xs text-slate-500 font-semibold">{t('statPatients')}</span>
                </div>
                <div className="hover:-translate-y-1 transition-transform">
                  <span className="block text-2xl font-black text-slate-900">+15</span>
                  <span className="text-xs text-slate-500 font-semibold">{t('statExp')}</span>
                </div>
                <div className="hover:-translate-y-1 transition-transform">
                  <span className="block text-2xl font-black text-slate-900">100%</span>
                  <span className="text-xs text-slate-500 font-semibold">{t('statSteril')}</span>
                </div>
              </div>
            </div>

            {/* Visual Hero Image */}
            <div className="relative animate-fade-in">
              <div className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop"
                  alt="Dental Clinic"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -end-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-float hidden sm:flex">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/10">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <span className="block text-sm font-bold text-slate-900">{t('heroFloatCardTitle')}</span>
                  <span className="text-xs text-slate-500">{t('heroFloatCardSubtitle')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services Overview Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-medical-50 text-medical-700 px-3.5 py-1.5 rounded-full text-xs font-bold border border-medical-200">
            <Stethoscope className="w-4 h-4 text-medical-500" />
            <span>{t('servicesBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            {t('servicesTitle')}
          </h2>
          <p className="text-slate-600 text-base">
            {t('servicesSubtitle')}
          </p>
        </div>

        <ServiceGrid />
      </section>

      {/* 3. Doctors Team Section */}
      <section className="bg-slate-100/60 py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white text-medical-700 px-3.5 py-1.5 rounded-full text-xs font-bold border border-slate-200 shadow-sm">
              <Users className="w-4 h-4 text-medical-500" />
              <span>{t('doctorsBadge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              {t('doctorsTitle')}
            </h2>
            <p className="text-slate-600 text-base">
              {t('doctorsSubtitle')}
            </p>
          </div>

          <DoctorGrid />
        </div>
      </section>

      {/* 4. Trust & Quality Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black text-slate-900">{t('qualityTitle')}</h2>
          <p className="text-slate-600 text-base">{t('qualitySubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-card space-y-4 text-start hover-glow-card">
            <div className="w-14 h-14 bg-medical-50 text-medical-600 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{t('qualitySterilTitle')}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t('qualitySterilDesc')}
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-card space-y-4 text-start hover-glow-card">
            <div className="w-14 h-14 bg-medical-50 text-medical-600 rounded-2xl flex items-center justify-center">
              <Activity className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{t('qualityPainfreeTitle')}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t('qualityPainfreeDesc')}
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-card space-y-4 text-start hover-glow-card">
            <div className="w-14 h-14 bg-medical-50 text-medical-600 rounded-2xl flex items-center justify-center">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{t('qualityFollowupTitle')}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t('qualityFollowupDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Patient Testimonials */}
      <section className="bg-gradient-to-tr from-medical-900 via-slate-navy to-slate-900 text-white py-20 rounded-3xl max-w-7xl mx-auto px-6 sm:px-12 shadow-2xl relative overflow-hidden">
        <div className="space-y-12 relative z-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 text-medical-300 text-sm font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
              <span>{t('testimonialsBadge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black">{t('testimonialsTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-4 hover:-translate-y-2 transition-transform duration-300">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">
                {language === 'ar'
                  ? '"تجربة رائعة جداً! قمت بتبييض الأسنان بالليزر وكانت النتيجة مذهلة وبدون أي حساسية."'
                  : '"Fantastic experience! Laser whitening results were astonishing and pain-free."'
                }
              </p>
              <div className="pt-2 border-t border-white/10 text-xs font-bold text-medical-300">
                — {language === 'ar' ? 'رياض بلحاج (الجزائر العاصمة)' : 'Riyad B. (Algiers)'}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-4 hover:-translate-y-2 transition-transform duration-300">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">
                {language === 'ar'
                  ? '"دكتورة مريم ممتازة في التعامل مع الأطفال. ابني كان يخاف من طبيب الأسنان والآن يذهب بكل سرور."'
                  : '"Dr. Meriem is wonderful with kids. My son used to fear dentists and now loves visiting!"'
                }
              </p>
              <div className="pt-2 border-t border-white/10 text-xs font-bold text-medical-300">
                — {language === 'ar' ? 'أسماء زروقي (البليدة)' : 'Asma Z. (Blida)'}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-4 hover:-translate-y-2 transition-transform duration-300">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">
                {language === 'ar'
                  ? '"قمت بتركيب زراعة أسنان لدى د. أمين، دقة متناهية ونظافة فائقة في العيادة، أشكر كامل الفريق."'
                  : '"Dental implant done by Dr. Amine. Absolute precision and pristine clinic hygiene!"'
                }
              </p>
              <div className="pt-2 border-t border-white/10 text-xs font-bold text-medical-300">
                — {language === 'ar' ? 'كمال براهيمي (تيزي وزو)' : 'Kamel B. (Tizi Ouzou)'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Quick CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="bg-gradient-to-r from-medical-500 to-medical-600 p-10 sm:p-14 rounded-3xl text-white shadow-xl space-y-6 animate-pulse-glow">
          <h2 className="text-3xl sm:text-4xl font-black">{t('ctaBannerTitle')}</h2>
          <p className="text-medical-100 text-base max-w-xl mx-auto">
            {t('ctaBannerSubtitle')}
          </p>
          <Link href="/services" className="inline-block">
            <Button variant="secondary" size="lg" className="bg-white text-medical-700 hover:bg-slate-50 font-bold px-8 shadow-md hover:scale-105 transition-transform duration-300">
              {t('ctaBannerBtn')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
