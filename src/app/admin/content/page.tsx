'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminAuthGuard } from '@/components/layout/AdminAuthGuard';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useDoctors } from '@/hooks/useDoctors';
import { useServices } from '@/hooks/useServices';
import { Doctor, Service } from '@/types';
import { DoctorCrudModal } from '@/components/features/admin/DoctorCrudModal';
import { ServiceCrudModal } from '@/components/features/admin/ServiceCrudModal';
import { doctorsService } from '@/services/doctorsService';
import { servicesService } from '@/services/servicesService';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatDZD } from '@/lib/utils';
import { UserPlus, PlusCircle, Edit3, Trash2, CheckCircle2, XCircle, Stethoscope, Users, RefreshCw } from 'lucide-react';

export default function AdminGate3ContentPage() {
  const [activeTab, setActiveTab] = useState<'doctors' | 'services'>('doctors');

  // Hooks for admin data
  const { doctors, isLoading: isDoctorsLoading, refetch: refetchDoctors } = useDoctors(true);
  const { services, isLoading: isServicesLoading, refetch: refetchServices } = useServices(true);

  // Modals state
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Doctor Actions
  const handleOpenDoctorModal = (doc?: Doctor) => {
    setSelectedDoctor(doc || null);
    setIsDoctorModalOpen(true);
  };

  const handleToggleDoctor = async (doc: Doctor) => {
    try {
      await doctorsService.toggleActive(doc.id, doc.active);
      refetchDoctors();
    } catch (err) {
      alert('تعذر تغيير حالة الطبيب');
    }
  };

  const handleDeleteDoctor = async (id: string) => {
    if (confirm('هل أنت تأكد من رغبتك في حذف بيانات هذا الطبيب؟')) {
      try {
        await doctorsService.deleteDoctor(id);
        refetchDoctors();
      } catch (err) {
        alert('تعذر حذف الطبيب');
      }
    }
  };

  // Service Actions
  const handleOpenServiceModal = (serv?: Service) => {
    setSelectedService(serv || null);
    setIsServiceModalOpen(true);
  };

  const handleToggleService = async (serv: Service) => {
    try {
      await servicesService.toggleActive(serv.id, serv.active);
      refetchServices();
    } catch (err) {
      alert('تعذر تغيير حالة الخدمة');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (confirm('هل أنت تأكد من رغبتك في حذف هذه الخدمة العلاجية؟')) {
      try {
        await servicesService.deleteService(id);
        refetchServices();
      } catch (err) {
        alert('تعذر حذف الخدمة');
      }
    }
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
              <span className="text-xs font-bold text-medical-600 uppercase">بوابة 3</span>
              <h1 className="text-2xl font-black text-slate-900">
                إدارة المحتوى والخدمات والأطباء
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                إضافة وتعديل الأطباء المعالجين والخدمات والأسعار المتاحة بالموقع
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button
                onClick={() => setActiveTab('doctors')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'doctors'
                    ? 'bg-white text-medical-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                إدارة الأطباء ({doctors.length})
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'services'
                    ? 'bg-white text-medical-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                إدارة الخدمات ({services.length})
              </button>
            </div>
          </div>

          <ErrorBoundary fallbackTitle="حدث خطأ أثناء تحميل إدارة المحتوى">
            {/* TAB 1: DOCTORS CRUD */}
            {activeTab === 'doctors' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">قائمة أطباء العيادة</h3>
                  <Button variant="primary" size="sm" onClick={() => handleOpenDoctorModal()}>
                    <UserPlus className="w-4 h-4 ml-1.5" />
                    إضافة طبيب جديد
                  </Button>
                </div>

                {isDoctorsLoading ? (
                  <Skeleton variant="table" />
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-right text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                          <tr>
                            <th className="px-6 py-4">اسم الطبيب</th>
                            <th className="px-6 py-4">سنوات الخبرة</th>
                            <th className="px-6 py-4">الشهادات والاعتمادات</th>
                            <th className="px-6 py-4">الحالة بالموقع</th>
                            <th className="px-6 py-4 text-center">الإجراءات</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                          {doctors.map((doc) => (
                            <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-900">{doc.full_name}</td>
                              <td className="px-6 py-4 font-mono">{doc.years_experience} سنوات</td>
                              <td className="px-6 py-4">
                                <div className="flex flex-wrap gap-1">
                                  {doc.certifications?.slice(0, 2).map((c, i) => (
                                    <span key={i} className="bg-slate-100 text-xs px-2 py-0.5 rounded">
                                      {c}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => handleToggleDoctor(doc)}
                                  className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                                    doc.active
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                      : 'bg-slate-100 text-slate-500 border-slate-200'
                                  }`}
                                >
                                  {doc.active ? 'مفعل بالموقع' : 'معطل'}
                                </button>
                              </td>
                              <td className="px-6 py-4 text-center space-x-2 space-x-reverse">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleOpenDoctorModal(doc)}
                                >
                                  <Edit3 className="w-4 h-4 text-medical-600" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteDoctor(doc.id)}
                                  className="text-rose-600 hover:bg-rose-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SERVICES CRUD */}
            {activeTab === 'services' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">قائمة الخدمات العلاجية</h3>
                  <Button variant="primary" size="sm" onClick={() => handleOpenServiceModal()}>
                    <PlusCircle className="w-4 h-4 ml-1.5" />
                    إضافة خدمة جديدة
                  </Button>
                </div>

                {isServicesLoading ? (
                  <Skeleton variant="table" />
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-right text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                          <tr>
                            <th className="px-6 py-4">اسم الخدمة</th>
                            <th className="px-6 py-4">السعر</th>
                            <th className="px-6 py-4">المدة التقديرية</th>
                            <th className="px-6 py-4">الحالة</th>
                            <th className="px-6 py-4 text-center">الإجراءات</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                          {services.map((serv) => (
                            <tr key={serv.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-900">{serv.name}</td>
                              <td className="px-6 py-4 font-bold text-medical-600">
                                {formatDZD(serv.price)}
                              </td>
                              <td className="px-6 py-4 font-mono">{serv.duration_minutes} دقيقة</td>
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => handleToggleService(serv)}
                                  className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                                    serv.active
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                      : 'bg-slate-100 text-slate-500 border-slate-200'
                                  }`}
                                >
                                  {serv.active ? 'نشطة' : 'معطلة'}
                                </button>
                              </td>
                              <td className="px-6 py-4 text-center space-x-2 space-x-reverse">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleOpenServiceModal(serv)}
                                >
                                  <Edit3 className="w-4 h-4 text-medical-600" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteService(serv.id)}
                                  className="text-rose-600 hover:bg-rose-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ErrorBoundary>

          {/* Doctor Modal */}
          <DoctorCrudModal
            isOpen={isDoctorModalOpen}
            onClose={() => setIsDoctorModalOpen(false)}
            doctor={selectedDoctor}
            onSuccess={refetchDoctors}
          />

          {/* Service Modal */}
          <ServiceCrudModal
            isOpen={isServiceModalOpen}
            onClose={() => setIsServiceModalOpen(false)}
            service={selectedService}
            onSuccess={refetchServices}
          />
        </main>
      </div>
    </div>
    </AdminAuthGuard>
  );
}
