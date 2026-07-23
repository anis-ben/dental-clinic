'use client';

import React, { useState } from 'react';
import { useServices } from '@/hooks/useServices';
import { bookingSchema, BookingFormValues } from '@/lib/validations/booking';
import { appointmentsService } from '@/services/appointmentsService';
import { generateDailyTimeSlots, formatDZD } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Clock, Tag, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface BookingFormProps {
  preselectedServiceId?: string;
  onSuccess?: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  preselectedServiceId,
  onSuccess,
}) => {
  const { t, language } = useLanguage();
  const { services, isLoading: isServicesLoading } = useServices(false);

  const [formData, setFormData] = useState<Partial<BookingFormValues>>({
    patient_first_name: '',
    patient_last_name: '',
    age: 25,
    phone_number: '',
    service_id: preselectedServiceId || '',
    preferred_date: new Date().toISOString().split('T')[0],
    preferred_time: '09:30',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const selectedService = services.find((s) => s.id === formData.service_id);

  const handleInputChange = (field: keyof BookingFormValues, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitError(null);

    const validation = bookingSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await appointmentsService.createAppointment(validation.data);
      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error submitting booking request';
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8 px-4 space-y-5 animate-fade-in">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900">{t('bookingSuccessTitle')}</h3>
          <p className="text-base text-slate-700 bg-emerald-50 p-4 rounded-2xl border border-emerald-200/80 leading-relaxed max-w-md mx-auto">
            {t('bookingSuccessNotice')}
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              patient_first_name: '',
              patient_last_name: '',
              age: 25,
              phone_number: '',
              service_id: '',
              preferred_date: new Date().toISOString().split('T')[0],
              preferred_time: '09:30',
              notes: '',
            });
          }}
          className="mx-auto"
        >
          {t('bookingAnotherBtn')}
        </Button>
      </div>
    );
  }

  const timeOptions = generateDailyTimeSlots().map((t) => ({
    value: t,
    label: t,
  }));

  const serviceOptions = [
    { value: '', label: isServicesLoading ? 'Loading...' : t('formSelectServicePlaceholder') },
    ...services.map((s) => ({ value: s.id, label: s.name })),
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-start">
      {submitError && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Patient Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={t('formFirstName')}
          placeholder={language === 'ar' ? 'مثال: أحمد' : 'e.g. John'}
          value={formData.patient_first_name || ''}
          onChange={(e) => handleInputChange('patient_first_name', e.target.value)}
          error={errors.patient_first_name}
        />
        <Input
          label={t('formLastName')}
          placeholder={language === 'ar' ? 'مثال: بن محمد' : 'e.g. Doe'}
          value={formData.patient_last_name || ''}
          onChange={(e) => handleInputChange('patient_last_name', e.target.value)}
          error={errors.patient_last_name}
        />
      </div>

      {/* Age & Phone Number */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={t('formAge')}
          type="number"
          placeholder="25"
          value={formData.age || ''}
          onChange={(e) => handleInputChange('age', e.target.value)}
          error={errors.age}
        />
        <Input
          label={t('formPhone')}
          placeholder="0550123456"
          value={formData.phone_number || ''}
          onChange={(e) => handleInputChange('phone_number', e.target.value)}
          error={errors.phone_number}
          helperText={t('formPhoneHelper')}
        />
      </div>

      {/* Service Selection */}
      <div>
        <Select
          label={t('formService')}
          options={serviceOptions}
          value={formData.service_id || ''}
          onChange={(e) => handleInputChange('service_id', e.target.value)}
          error={errors.service_id}
        />

        {/* Selected Service Price & Duration Info Badge */}
        {selectedService && (
          <div className="mt-3 p-3.5 bg-medical-50/80 rounded-xl border border-medical-200/80 flex items-center justify-between text-sm animate-fade-in">
            <div className="flex items-center gap-2 text-medical-800 font-semibold">
              <Tag className="w-4 h-4 text-medical-600" />
              <span>{t('formEstCost')} {formatDZD(selectedService.price)}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <Clock className="w-4 h-4 text-medical-600" />
              <span>{t('formEstDuration')} {selectedService.duration_minutes} {t('servicesDuration')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Preferred Date & Time Slot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={t('formPreferredDate')}
          type="date"
          min={new Date().toISOString().split('T')[0]}
          value={formData.preferred_date || ''}
          onChange={(e) => handleInputChange('preferred_date', e.target.value)}
          error={errors.preferred_date}
        />
        <Select
          label={t('formPreferredTime')}
          options={timeOptions}
          value={formData.preferred_time || '09:30'}
          onChange={(e) => handleInputChange('preferred_time', e.target.value)}
          error={errors.preferred_time}
        />
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-slate-800">
          {t('formNotes')}
        </label>
        <textarea
          rows={3}
          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-medical-500 text-base"
          placeholder={language === 'ar' ? 'اذكر أي حالة صحية خاصة أو تفاصيل سابقة...' : 'Mention any specific condition or history...'}
          value={formData.notes || ''}
          onChange={(e) => handleInputChange('notes', e.target.value)}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        className="w-full py-3 text-lg font-bold shadow-lg shadow-medical-500/20"
      >
        {t('formSubmitBtn')}
      </Button>
    </form>
  );
};
