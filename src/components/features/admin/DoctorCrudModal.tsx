'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Doctor } from '@/types';
import { doctorSchema, DoctorFormValues } from '@/lib/validations/doctor';
import { doctorsService } from '@/services/doctorsService';
import { AlertCircle } from 'lucide-react';

interface DoctorCrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
  onSuccess: () => void;
}

export const DoctorCrudModal: React.FC<DoctorCrudModalProps> = ({
  isOpen,
  onClose,
  doctor,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<Partial<DoctorFormValues>>({
    full_name: '',
    bio: '',
    years_experience: 5,
    certifications: ['دكتوراه في طب الأسنان'],
    image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop',
    active: true,
  });

  const [certInput, setCertInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (doctor) {
      setFormData({
        full_name: doctor.full_name,
        bio: doctor.bio,
        years_experience: doctor.years_experience,
        certifications: doctor.certifications || [],
        image_url: doctor.image_url,
        active: doctor.active,
      });
    } else {
      setFormData({
        full_name: '',
        bio: '',
        years_experience: 5,
        certifications: ['دكتوراه في طب الأسنان'],
        image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop',
        active: true,
      });
    }
    setErrors({});
    setErrorMessage(null);
  }, [doctor, isOpen]);

  const handleAddCert = () => {
    if (certInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...(prev.certifications || []), certInput.trim()],
      }));
      setCertInput('');
    }
  };

  const handleRemoveCert = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setErrorMessage(null);

    const validation = doctorSchema.safeParse(formData);
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
      if (doctor) {
        await doctorsService.updateDoctor(doctor.id, validation.data);
      } else {
        await doctorsService.createDoctor(validation.data);
      }
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'تعذر حفظ بيانات الطبيب';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={doctor ? 'تعديل بيانات الطبيب' : 'إضافة طبيب جديد'}
      description="أدخل تفاصيل الطبيب والشهادات الأكاديمية والصورة الشخصية"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-right">
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-2 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <Input
          label="الاسم الكامل"
          placeholder="د. أحمد بن خالد"
          value={formData.full_name || ''}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          error={errors.full_name}
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-slate-800">الوصف المهني والسيرة</label>
          <textarea
            rows={3}
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-medical-500 text-base"
            placeholder="أخصائي جراحة وزراعة الأسنان..."
            value={formData.bio || ''}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
          {errors.bio && <p className="text-sm font-medium text-status-rose">{errors.bio}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="سنوات الخبرة"
            type="number"
            value={formData.years_experience || 0}
            onChange={(e) => setFormData({ ...formData, years_experience: Number(e.target.value) })}
            error={errors.years_experience}
          />

          <Input
            label="رابط الصورة الشخصية"
            placeholder="https://..."
            value={formData.image_url || ''}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            error={errors.image_url}
          />
        </div>

        {/* Certifications Management */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">الشهادات والاعتمادات</label>
          <div className="flex gap-2">
            <Input
              placeholder="إضافة شهادة أو تخصص..."
              value={certInput}
              onChange={(e) => setCertInput(e.target.value)}
            />
            <Button type="button" variant="secondary" onClick={handleAddCert}>
              إضافة
            </Button>
          </div>
          {errors.certifications && (
            <p className="text-sm font-medium text-status-rose">{errors.certifications}</p>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            {(formData.certifications || []).map((cert, idx) => (
              <span
                key={idx}
                className="bg-slate-100 text-slate-800 text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 border border-slate-200"
              >
                <span>{cert}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCert(idx)}
                  className="text-rose-500 font-bold hover:text-rose-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>
            إلغاء
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {doctor ? 'حفظ التعديلات' : 'إضافة الطبيب'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
