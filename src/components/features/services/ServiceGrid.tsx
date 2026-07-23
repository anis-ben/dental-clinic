'use client';

import React, { useState } from 'react';
import { useServices } from '@/hooks/useServices';
import { useDebounce } from '@/hooks/useDebounce';
import { ServiceCard } from './ServiceCard';
import { Service as ServiceType } from '@/types';
import { Skeleton } from '@/components/ui/Skeleton';
import { BookingModal } from '@/components/features/booking/BookingModal';
import { Search, Stethoscope } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export const ServiceGrid: React.FC = () => {
  const { t, language } = useLanguage();
  const { services, isLoading, error } = useServices(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const filteredServices = services.filter(
    (s) =>
      s.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      s.description.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleBookService = (service: ServiceType) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Search Input */}
      <div className="max-w-md mx-auto relative">
        <Input
          placeholder={t('servicesSearchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={language === 'ar' ? 'pr-10' : 'pl-10'}
        />
        <Search className={`w-5 h-5 text-slate-400 absolute top-3.5 ${language === 'ar' ? 'left-3' : 'right-3'}`} />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} variant="card" className="h-64" />
          ))}
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 p-8">
          <Stethoscope className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">
            {language === 'ar' ? 'لم يتم العثور على خدمات مطابقة' : 'No matching treatments found'}
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            {language === 'ar'
              ? 'جرب البحث بكلمات أخرى أو اختر من قائمة الخدمات العامة'
              : 'Try searching with different keywords'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} onBook={handleBookService} />
          ))}
        </div>
      )}

      {/* Booking Modal with Pre-selected Service */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={selectedService?.id}
        preselectedServiceName={selectedService?.name}
      />
    </div>
  );
};
