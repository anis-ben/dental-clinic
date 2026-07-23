'use client';

import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminAuthGuard } from '@/components/layout/AdminAuthGuard';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { Card } from '@/components/ui/Card';
import { appointmentsService } from '@/services/appointmentsService';
import { AnalyticsMetrics } from '@/types';
import { AnalyticsCharts } from '@/components/features/admin/AnalyticsCharts';
import { Skeleton } from '@/components/ui/Skeleton';
import { Users, CheckCircle2, Clock, XCircle, Calendar, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminGate0Dashboard() {
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7days');

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const data = await appointmentsService.getAnalyticsMetrics();
      setMetrics(data);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <AdminAuthGuard>
      <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <AdminSidebar />

        <main className="flex-1 space-y-8">
          {/* Header & Date Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            <div>
              <span className="text-xs font-bold text-medical-600 uppercase">بوابة 0</span>
              <h1 className="text-2xl font-black text-slate-900">
                لوحة التحليلات والإحصائيات العامة
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-500"
              >
                <option value="today">اليوم الحالي</option>
                <option value="7days">آخر 7 أيام</option>
                <option value="30days">آخر 30 يوماً</option>
              </select>

              <Button variant="ghost" size="sm" onClick={fetchAnalytics}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <ErrorBoundary fallbackTitle="حدث خطأ في تحميل بيانات التحليلات">
            {/* Metric Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Card 1: Total Visitors */}
              <Card className="space-y-2 border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">إجمالي الزوار والحجوزات</span>
                  <div className="w-10 h-10 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <span className="text-3xl font-black text-slate-900 block">
                    {metrics?.totalVisitors || 0}
                  </span>
                )}
                <span className="text-[11px] text-emerald-600 font-semibold block">
                  ↑ 12% مقارنة بالفترة السابقة
                </span>
              </Card>

              {/* Card 2: Completed Today */}
              <Card className="space-y-2 border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">الحجوزات المؤكدة اليوم</span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <span className="text-3xl font-black text-slate-900 block">
                    {metrics?.completedToday || 0}
                  </span>
                )}
                <span className="text-[11px] text-slate-500 font-semibold block">
                  جلسات علاجية مؤكدة لليوم
                </span>
              </Card>

              {/* Card 3: Completed This Week */}
              <Card className="space-y-2 border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">مجموع الأسبوع الحالي</span>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <span className="text-3xl font-black text-slate-900 block">
                    {metrics?.completedThisWeek || 0}
                  </span>
                )}
                <span className="text-[11px] text-blue-600 font-semibold block">
                  مواعيد مؤكدة هذا الأسبوع
                </span>
              </Card>

              {/* Card 4: Canceled */}
              <Card className="space-y-2 border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">الحجوزات الملغاة</span>
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <XCircle className="w-5 h-5" />
                  </div>
                </div>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <span className="text-3xl font-black text-slate-900 block">
                    {metrics?.canceledCount || 0}
                  </span>
                )}
                <span className="text-[11px] text-rose-500 font-semibold block">
                  حجوزات اعتذر عنها المرضى
                </span>
              </Card>
            </div>

            {/* Visual Analytics Charts */}
            {isLoading || !metrics ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Skeleton className="h-72 rounded-3xl" />
                <Skeleton className="h-72 rounded-3xl" />
              </div>
            ) : (
              <AnalyticsCharts data={metrics} />
            )}
          </ErrorBoundary>
        </main>
      </div>
    </div>
    </AdminAuthGuard>
  );
}
