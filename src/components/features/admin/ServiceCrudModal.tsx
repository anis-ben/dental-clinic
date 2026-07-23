'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Service } from '@/types';
import { serviceSchema, ServiceFormValues } from '@/lib/validations/service';
import { servicesService } from '@/services/servicesService';
import { AlertCircle } from 'lucide-react';

interface ServiceCrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  onSuccess: () => void;
}

export const ServiceCrudModal: React.FC<ServiceCrudModalProps> = ({
  isOpen,
  onClose,
  service,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<Partial<ServiceFormValues>>({
    name: '',
    description: '',
    price: 5000,
    duration_minutes: 45,
    active: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        price: service.price,
        duration_minutes: service.duration_minutes,
        active: service.active,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: 5000,
        duration_minutes: 45,
        active: true,
      });
    }
    setErrors({});
    setErrorMessage(null);
  }, [service, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setErrorMessage(null);

    const validation = serviceSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) fieldErrors[issue.path[0].toString()] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (service) {
        await servicesService.updateService(service.id, validation.data);
      } else {
        await servicesService.createService(validation.data);
      }
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'تعذر حفظ بيانات الخدمة';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={service ? 'تعديل بيانات الخدمة العلاجية' : 'إضافة خدمة علاجية جديدة'}
      description="أدخل اسم الخدمة، الوصف التفصيلي، السعر بالدينار الجزائري، والمدة التقديرية"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-right">
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-2 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <Input
          label="اسم الخدمة"
          placeholder="مثال: تبييض الأسنان بالليزر"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-slate-800">وصف الخدمة</label>
          <textarea
            rows={3}
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-medical-500 text-base"
            placeholder="إزالة التكلسات وعلاج التهابات اللثة..."
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          {errors.description && (
            <p className="text-sm font-medium text-status-rose">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="السعر (د.ج / DZD)"
            type="number"
            value={formData.price || 0}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            error={errors.price}
          />

          <Input
            label="المدة التقديرية (بالدقائق)"
            type="number"
            value={formData.duration_minutes || 30}
            onChange={(e) => setFormData({ ...formData, duration_minutes: Number(e.target.value) })}
            error={errors.duration_minutes}
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>
            إلغاء
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {service ? 'حفظ التعديلات' : 'إضافة الخدمة'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
