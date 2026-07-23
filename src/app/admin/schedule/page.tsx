'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminAuthGuard } from '@/components/layout/AdminAuthGuard';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useAppointments } from '@/hooks/useAppointments';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatDateArabic, formatDZD } from '@/lib/utils';
import { Calendar, Clock, User, Phone, CheckCircle2, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

export default function AdminGate2SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const { appointments, isLoading, error, refetch, cancelAppointment } = useAppointments(
    'date',
    selectedDate
  );

  const handleCancelBooking = async (id: string) => {
    if (confirm('هل أنت تأكد من رغبتك في إلغاء هذا الموعد؟')) {
      try {
        await cancelAppointment(id);
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : 'تعذر إلغاء الموعد');
      }
    }
  };

  return (
    <AdminAuthGuard>
      <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <AdminSidebar />

        <main className="flex-1 space-y-6">
          {/* Top Bar with Date Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            <div>
              <span className="text-xs font-bold text-medical-600 uppercase">بوابة 2</span>
              <h1 className="text-2xl font-black text-slate-900">
                الجدول الرئيسي اليومي (ترتيب الحجوزات)
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                تصفح جدول مواعيد اليوم وإدارتها بالتفصيل
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-auto"
              />
              <Button variant="ghost" size="sm" onClick={refetch}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <ErrorBoundary fallbackTitle="حدث خطأ أثناء تحميل جدول المواعيد">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 font-bold text-slate-800 text-sm flex items-center justify-between">
              <span>جدول مواعيد يوم: <strong className="text-medical-600">{formatDateArabic(selectedDate)}</strong></span>
              <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">
                إجمالي مواعيد اليوم: {appointments.length}
              </span>
            </div>

            {isLoading ? (
              <Skeleton variant="table" />
            ) : appointments.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-3">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-xl font-bold text-slate-800">لا توجد حجوزات مسجلة لهذا اليوم</h3>
                <p className="text-slate-500 text-sm">
                  اختر تاريخاً آخر من الشريط العلوي لعرض الجدول
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-medical-300 transition-all duration-200"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-medical-50 text-medical-700 font-mono font-bold text-base rounded-xl border border-medical-200 dir-ltr">
                          {app.preferred_time}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <User className="w-4 h-4 text-medical-500" />
                          {app.patient_first_name} {app.patient_last_name} ({app.age} سنة)
                        </h3>
                        <Badge status={app.status} />
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                        <span>الخدمة: <strong>{app.services?.name || 'خدمة عامة'}</strong></span>
                        {app.services?.price && (
                          <span>التكلفة: <strong>{formatDZD(app.services.price)}</strong></span>
                        )}
                        <a
                          href={`tel:${app.phone_number}`}
                          className="text-medical-600 font-mono font-bold hover:underline dir-ltr flex items-center gap-1"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {app.phone_number}
                        </a>
                      </div>
                    </div>

                    {app.status !== 'canceled' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCancelBooking(app.id)}
                        className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 font-bold"
                      >
                        <XCircle className="w-4 h-4 ml-1.5" />
                        إلغاء الموعد
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ErrorBoundary>
        </main>
      </div>
    </div>
    </AdminAuthGuard>
  );
}
