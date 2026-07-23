'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminAuthGuard } from '@/components/layout/AdminAuthGuard';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useAppointments } from '@/hooks/useAppointments';
import { Appointment } from '@/types';
import { ScheduleMatrixModal } from '@/components/features/admin/ScheduleMatrixModal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatDateArabic } from '@/lib/utils';
import { Clock, Phone, CalendarCheck, CheckCircle2, User, RefreshCw } from 'lucide-react';

export default function AdminGate1PendingPage() {
  const { appointments, isLoading, error, refetch, cancelAppointment } = useAppointments('pending');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);

  const handleOpenMatrix = (app: Appointment) => {
    setSelectedAppointment(app);
    setIsMatrixOpen(true);
  };

  return (
    <AdminAuthGuard>
      <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <AdminSidebar />

        <main className="flex-1 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase">بوابة 1</span>
              <h1 className="text-2xl font-black text-slate-900">
                طلبات الحجز المقدمة (قيد الانتظار)
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                جدول الطلبات الواردة من الموقع العام والتي تحتاج إلى تنظيم وتأكيد التوقيت مع المريض
              </p>
            </div>

            <Button variant="ghost" size="sm" onClick={refetch}>
              <RefreshCw className="w-4 h-4 ml-2" />
              تحديث
            </Button>
          </div>

          <ErrorBoundary fallbackTitle="حدث خطأ أثناء عرض الحجوزات المقدمة">
            {isLoading ? (
              <Skeleton variant="table" />
            ) : appointments.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-bold text-slate-800">لا يوجد طلبت حجز قيد الانتظار حالياً</h3>
                <p className="text-slate-500 text-sm">
                  تم تنظيم كافة الحجوزات المقدمة بنجاح!
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                      <tr>
                        <th className="px-6 py-4">اسم المريض والسن</th>
                        <th className="px-6 py-4">رقم الهاتف</th>
                        <th className="px-6 py-4">الخدمة المطلوبة</th>
                        <th className="px-6 py-4">التاريخ والتوقيت المطلوب</th>
                        <th className="px-6 py-4">الحالة</th>
                        <th className="px-6 py-4 text-center">الإجراء</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {appointments.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 font-bold text-slate-900">
                              <User className="w-4 h-4 text-medical-500 shrink-0" />
                              <span>
                                {app.patient_first_name} {app.patient_last_name}
                              </span>
                            </div>
                            <span className="text-xs text-slate-500 block mr-6">
                              العمر: {app.age} سنة
                            </span>
                          </td>
                          <td className="px-6 py-4 font-mono dir-ltr text-right">
                            <a
                              href={`tel:${app.phone_number}`}
                              className="text-medical-600 font-bold hover:underline inline-flex items-center gap-1"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              {app.phone_number}
                            </a>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold text-slate-900">
                              {app.services?.name || 'خدمة استشارية'}
                            </span>
                            {app.services?.duration_minutes && (
                              <span className="text-xs text-slate-500 block">
                                مدة الجلسة: {app.services.duration_minutes} د
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-900">
                              {formatDateArabic(app.preferred_date)}
                            </div>
                            <div className="text-xs text-medical-600 font-semibold dir-ltr font-mono text-right">
                              الساعة: {app.preferred_time}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge status={app.status} />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleOpenMatrix(app)}
                              className="shadow-sm font-bold"
                            >
                              <CalendarCheck className="w-4 h-4 ml-1.5" />
                              تنظيم الحجز
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </ErrorBoundary>

          {/* Gate 1 Schedule Matrix Modal */}
          <ScheduleMatrixModal
            isOpen={isMatrixOpen}
            onClose={() => setIsMatrixOpen(false)}
            appointment={selectedAppointment}
            onConfirmSuccess={refetch}
            onCancelSuccess={refetch}
          />
        </main>
      </div>
    </div>
    </AdminAuthGuard>
  );
}
