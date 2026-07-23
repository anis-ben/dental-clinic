'use client';

import React from 'react';
import { Service } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatDZD } from '@/lib/utils';
import { Clock, CalendarCheck2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface ServiceCardProps {
  service: Service;
  onBook: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  const { t, language } = useLanguage();

  return (
    <Card hoverEffect className="flex flex-col justify-between h-full space-y-5 border-slate-200/80">
      <div className="space-y-3 text-start">
        {/* Service Header */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-medical-600 transition-colors">
            {service.name}
          </h3>
          <span className="bg-medical-50 text-medical-700 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap border border-medical-200/60 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {service.duration_minutes} {t('servicesDuration')}
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Footer & Pricing */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-500 block">{t('servicesEstPrice')}</span>
          <span className="text-xl font-black text-medical-600">
            {formatDZD(service.price)}
          </span>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => onBook(service)}
          className="shadow-sm"
        >
          <CalendarCheck2 className="w-4 h-4 me-2" />
          {t('servicesBookBtn')}
        </Button>
      </div>
    </Card>
  );
};
