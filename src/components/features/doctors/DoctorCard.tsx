'use client';

import React from 'react';
import Image from 'next/image';
import { Doctor } from '@/types';
import { Card } from '@/components/ui/Card';
import { Award, Briefcase } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const { t, language } = useLanguage();

  return (
    <Card hoverEffect className="overflow-hidden flex flex-col justify-between h-full group">
      <div className="space-y-4 text-start">
        {/* Doctor Photo */}
        <div className="relative w-full h-64 rounded-xl overflow-hidden bg-slate-100">
          <Image
            src={doctor.image_url}
            alt={doctor.full_name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 end-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-medical-700 shadow-sm flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-medical-500" />
            <span>
              {t('doctorsYearsExp')} {doctor.years_experience} {t('doctorsYears')}
            </span>
          </div>
        </div>

        {/* Doctor Details */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-medical-600 transition-colors">
            {doctor.full_name}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
            {doctor.bio}
          </p>
        </div>

        {/* Certifications Badges */}
        {doctor.certifications && doctor.certifications.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 block">
              {t('doctorsCerts')}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {doctor.certifications.map((cert, idx) => (
                <span
                  key={idx}
                  className="bg-medical-50 text-medical-800 text-xs px-2.5 py-1 rounded-lg font-medium flex items-center gap-1"
                >
                  <Award className="w-3 h-3 text-medical-500 shrink-0" />
                  <span>{cert}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
