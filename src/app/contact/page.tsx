'use client';

import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900">{t('contactTitle')}</h1>
        <p className="text-slate-600 text-lg">
          {t('contactSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-6 text-start">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card flex items-start gap-4">
            <div className="w-12 h-12 bg-medical-50 text-medical-600 rounded-2xl flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900">{t('contactPhoneTitle')}</h3>
              <p className="dir-ltr font-mono font-bold text-medical-600 text-base">
                +213 550 12 34 56
              </p>
              <p className="text-xs text-slate-500">{t('footerEmergency')}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card flex items-start gap-4">
            <div className="w-12 h-12 bg-medical-50 text-medical-600 rounded-2xl flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900">{t('contactAddressTitle')}</h3>
              <p className="text-sm text-slate-600">
                {t('footerAddress')}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card flex items-start gap-4">
            <div className="w-12 h-12 bg-medical-50 text-medical-600 rounded-2xl flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900">{t('contactHoursTitle')}</h3>
              <p className="text-sm text-slate-600">{t('footerHoursSatThu')}</p>
              <p className="text-xs text-rose-500 font-semibold">{t('footerHoursFri')}</p>
            </div>
          </div>
        </div>

        {/* Google Map Embed Container */}
        <div className="lg:col-span-2 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-card overflow-hidden h-[450px]">
          <iframe
            title="Clinic Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102345.24128912!2d3.0588!3d36.7538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb2f768b44919%3A0x6a0e69cb48123!2sAlgiers!5e0!3m2!1sen!2sdz!4v1680000000000!5m2!1sen!2sdz"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '1.25rem' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
