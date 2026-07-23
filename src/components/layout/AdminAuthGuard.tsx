'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { Loader2, ShieldAlert } from 'lucide-react';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export const AdminAuthGuard: React.FC<AdminAuthGuardProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      if (!authenticated) {
        setIsAuthorized(false);
        router.replace('/admin/login');
      } else {
        setIsAuthorized(true);
      }
    };

    checkAuth();
  }, [router]);

  if (isAuthorized === null) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-medical-500 animate-spin" />
        <p className="text-sm font-bold text-slate-600">جاري التحقق من أمان وصلاحيات لوحة التحكم...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-100 text-status-rose rounded-full flex items-center justify-center shadow-md">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">يلزم تسجيل الدخول أولاً</h2>
        <p className="text-sm text-slate-500 max-w-sm">
          هذه المنطقة محمية ومخصصة لإدارة العيادة فقط. جاري تحويلك لصفحة تسجيل الدخول...
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
