'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Appointment, TimeSlot } from '@/types';
import { generateDailyTimeSlots, formatDateArabic } from '@/lib/utils';
import { appointmentsService } from '@/services/appointmentsService';
import { Clock, CheckCircle2, XCircle, AlertCircle, Phone, User } from 'lucide-react';

interface ScheduleMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onConfirmSuccess: () => void;
  onCancelSuccess: () => void;
}

export const ScheduleMatrixModal: React.FC<ScheduleMatrixModalProps> = ({
  isOpen,
  onClose,
  appointment,
  onConfirmSuccess,
  onCancelSuccess,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [existingAppointments, setExistingAppointments] = useState<Appointment[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (appointment && isOpen) {
      setSelectedSlot(appointment.preferred_time);
      setErrorMessage(null);
      fetchDateAppointments(appointment.preferred_date);
    }
  }, [appointment, isOpen]);

  const fetchDateAppointments = async (dateStr: string) => {
    setIsLoadingSlots(true);
    try {
      const data = await appointmentsService.getAppointmentsByDate(dateStr);
      setExistingAppointments(data);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  if (!appointment) return null;

  const allSlots = generateDailyTimeSlots();

  // Map slots to availability
  const slotsWithState: TimeSlot[] = allSlots.map((time) => {
    const matchedApp = existingAppointments.find(
      (a) => a.preferred_time === time && a.status === 'confirmed' && a.id !== appointment.id
    );
    return {
      time,
      isAvailable: !matchedApp,
      appointment: matchedApp,
    };
  });

  const handleConfirm = async () => {
    if (!selectedSlot) {
      setErrorMessage('يرجى اختيار توقيت متاح من المصفوفة');
      return;
    }
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await appointmentsService.confirmAppointment(
        appointment.id,
        appointment.preferred_date,
        selectedSlot
      );
      onConfirmSuccess();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'تعذر تأكيد الموعد';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await appointmentsService.cancelAppointment(appointment.id);
      onCancelSuccess();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'تعذر إلغاء الموعد';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="تنظيم وتأكيد الحجز (مصفوفة المواعيد)"
      description="مصفوفة المواعيد المتاحة والشاغرة لليوم المطلوب"
      maxWidth="xl"
    >
      <div className="space-y-6 text-right">
        {/* Patient Summary Card */}
        <div className="bg-medical-50 p-4 rounded-2xl border border-medical-200/80 space-y-2">
          <div className="flex items-center justify-between text-slate-900">
            <div className="flex items-center gap-2 font-bold text-lg">
              <User className="w-5 h-5 text-medical-600" />
              <span>
                {appointment.patient_first_name} {appointment.patient_last_name} ({appointment.age} سنة)
              </span>
            </div>
            <a
              href={`tel:${appointment.phone_number}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-medical-700 rounded-xl text-sm font-bold shadow-sm border border-medical-200 hover:bg-medical-100 dir-ltr font-mono"
            >
              <Phone className="w-4 h-4 text-medical-500" />
              {appointment.phone_number}
            </a>
          </div>
          <div className="text-sm text-slate-600 flex flex-wrap items-center justify-between pt-1 border-t border-medical-200/60">
            <span>الخدمة: <strong>{appointment.services?.name || 'استشارة عامة'}</strong></span>
            <span>التاريخ المطلوب: <strong>{formatDateArabic(appointment.preferred_date)}</strong></span>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-2.5 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-status-rose" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Schedule Matrix */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-800">مصفوفة التوقيتات لليوم:</h4>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span>متاح / شاغر</span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-700">
                <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                <span>محجوز مؤكد</span>
              </div>
            </div>
          </div>

          {isLoadingSlots ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 py-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-12 bg-slate-100 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
              {slotsWithState.map((slot) => {
                const isSelected = selectedSlot === slot.time;
                const isAvailable = slot.isAvailable;

                return (
                  <button
                    key={slot.time}
                    disabled={!isAvailable}
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`py-3 px-2 rounded-xl text-sm font-bold border transition-all duration-200 min-h-[44px] flex flex-col items-center justify-center gap-0.5 ${
                      !isAvailable
                        ? 'bg-rose-50 border-rose-200 text-rose-400 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'bg-medical-500 border-medical-600 text-white shadow-md shadow-medical-500/20 ring-2 ring-medical-400 ring-offset-1'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-medical-400 hover:bg-medical-50/50'
                    }`}
                  >
                    <span className="dir-ltr font-mono">{slot.time}</span>
                    <span className="text-[10px] font-normal">
                      {!isAvailable ? 'محجوز' : isSelected ? 'محدد للتأكيد' : 'شاغر'}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
          <Button
            variant="danger"
            onClick={handleCancel}
            isLoading={isSubmitting}
            className="w-full sm:w-auto"
          >
            <XCircle className="w-4 h-4 ml-2" />
            إلغاء الطلب
          </Button>

          <Button
            variant="primary"
            onClick={handleConfirm}
            isLoading={isSubmitting}
            className="w-full sm:w-auto"
          >
            <CheckCircle2 className="w-4 h-4 ml-2" />
            تأكيد الموعد للمريض
          </Button>
        </div>
      </div>
    </Modal>
  );
};
