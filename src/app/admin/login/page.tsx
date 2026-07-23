'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ShieldCheck, Stethoscope, Lock, Mail, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة السر');
      return;
    }

    setIsLoading(true);
    try {
      await authService.loginAdmin(email, password);
      router.push('/admin');
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'البريد الإلكتروني أو كلمة السر غير صحيحة';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-mint-soft/50 via-slate-bg to-slate-bg">
      <div className="w-full max-w-md space-y-8 animate-fade-in-up">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-medical-600 to-medical-400 text-white flex items-center justify-center mx-auto shadow-xl shadow-medical-500/25">
            <Stethoscope className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900">
              تسجيل الدخول <span className="text-medical-500">للوحة التحكم</span>
            </h1>
            <p className="text-xs text-slate-500 font-semibold">
              منظومة إدارة عيادة الأسنان المحمية والمشفرة
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>نظام محمي بأعلى معايير الأمان</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-card space-y-6">
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl flex items-center gap-3 text-sm animate-fade-in">
              <AlertCircle className="w-5 h-5 shrink-0 text-status-rose" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 text-right">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-800">
                البريد الإلكتروني للأدمن
              </label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="أدخل البريد الإلكتروني الرسمي..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-10"
                />
                <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-800">
                كلمة السر
              </label>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full py-3 text-base font-bold shadow-lg shadow-medical-500/20"
            >
              الدخول للوحة التحكم
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
