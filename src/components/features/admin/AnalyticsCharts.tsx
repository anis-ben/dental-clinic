'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { AnalyticsMetrics } from '@/types';
import { Card } from '@/components/ui/Card';

interface AnalyticsChartsProps {
  data: AnalyticsMetrics;
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Daily Booking Trend Area Chart */}
      <Card className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">معدل الحجوزات اليومي</h3>
          <p className="text-xs text-slate-500">مقارنة إجمالي الطلبات والحجوزات المؤكدة خلال الأسبوع</p>
        </div>
        <div className="h-72 w-full dir-ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.dailyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A896" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00A896" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="date" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: '1px solid #E2E8F0',
                  direction: 'rtl',
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                name="إجمالي الطلبات"
                stroke="#00A896"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorCount)"
              />
              <Area
                type="monotone"
                dataKey="confirmed"
                name="المؤكدة"
                stroke="#10B981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorConfirmed)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Service Popularity Bar Chart */}
      <Card className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">توزيع الخدمات الأكثر طلباً</h3>
          <p className="text-xs text-slate-500">إحصائية الخدمات الأكثر اختياراً من قبل المرضى</p>
        </div>
        <div className="h-72 w-full dir-ltr">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.popularServices} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={12} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: '1px solid #E2E8F0',
                  direction: 'rtl',
                }}
              />
              <Bar dataKey="count" name="عدد الحجوزات" fill="#028090" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
