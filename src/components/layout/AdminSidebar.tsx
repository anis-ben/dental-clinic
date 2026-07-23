'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Clock,
  CalendarDays,
  UserCog,
  Home,
  LogOut,
  ShieldCheck,
  User,
} from 'lucide-react';
import { useAppointments } from '@/hooks/useAppointments';
import { authService } from '@/services/authService';
import { AdminUser } from '@/types';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { appointments: pendingApps } = useAppointments('pending');
  const pendingCount = pendingApps.length;

  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);

  useEffect(() => {
    setCurrentAdmin(authService.getCurrentAdmin());
  }, []);

  const gates = [
    {
      href: '/admin',
      label: 'الصفحة الأساسية (التحليلات)',
      gate: 'بوابة 0',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      href: '/admin/pending',
      label: 'الحجوزات المقدمة',
      gate: 'بوابة 1',
      icon: Clock,
      badge: pendingCount > 0 ? pendingCount : null,
    },
    {
      href: '/admin/schedule',
      label: 'ترتيب الحجوزات (الجدول)',
      gate: 'بوابة 2',
      icon: CalendarDays,
      badge: null,
    },
    {
      href: '/admin/content',
      label: 'إدارة المحتوى والخدمات والأطباء',
      gate: 'بوابة 3',
      icon: UserCog,
      badge: null,
    },
  ];

  const isActive = (path: string) => {
    if (path === '/admin' && pathname === '/admin') return true;
    if (path !== '/admin' && pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = async () => {
    if (confirm('هل أنت تأكد من رغبتك في تسجيل الخروج من لوحة التحكم؟')) {
      await authService.logoutAdmin();
      router.replace('/admin/login');
    }
  };

  return (
    <aside className="w-full lg:w-72 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6 h-fit">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-medical-600">
            لوحة الإدارة
          </span>
          <h2 className="text-lg font-black text-slate-900">بوابات التحكم</h2>
        </div>
        <Link
          href="/"
          className="p-2 text-slate-500 hover:text-medical-600 hover:bg-medical-50 rounded-xl transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          title="العودة للموقع العام"
        >
          <Home className="w-5 h-5" />
        </Link>
      </div>

      {/* Admin User Info Badge */}
      <div className="p-3 bg-medical-50/80 rounded-2xl border border-medical-200/60 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-medical-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
          <User className="w-5 h-5" />
        </div>
        <div className="overflow-hidden text-right">
          <span className="text-xs font-bold text-slate-900 block truncate">
            {currentAdmin?.email || 'الأدمن الرئيسي'}
          </span>
          <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            مسؤول العيادة (الأدمن)
          </span>
        </div>
      </div>

      {/* Gate Links Navigation */}
      <nav className="space-y-2">
        {gates.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 font-semibold text-sm ${
                active
                  ? 'bg-medical-500 text-white shadow-md shadow-medical-500/20'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl ${
                    active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-normal opacity-80">{item.gate}</span>
                  <span className="block">{item.label}</span>
                </div>
              </div>

              {item.badge !== null && (
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold animate-pulse ${
                    active ? 'bg-white text-medical-700' : 'bg-amber-500 text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Action */}
      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl text-status-rose hover:bg-rose-50 border border-rose-200/60 transition-colors font-bold text-sm min-h-[44px]"
        >
          <LogOut className="w-4 h-4" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
};
