import React from 'react';
import { BookingForm } from '@/components/features/booking/BookingForm';
import { Calendar, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'حجز موعد جديد - عيادة الأسنان',
  description: 'قم بحجز موعدك في عيادة الأسنان بسهولة وسنتصل بك عبر الهاتف لتأكيد الموعد.',
};

export default function BookPage() {
  return (
    <div className="py-12 max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-medical-50 text-medical-700 px-4 py-1.5 rounded-full text-xs font-bold border border-medical-200">
          <Calendar className="w-4 h-4 text-medical-500" />
          <span>حجز موعد مباشر</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          طلب حجز موعد جديد في العيادة
        </h1>
        <p className="text-slate-600 text-sm">
          يرجى ملء النموذج التالي وسيصلك اتصال لتأكيد تفاصيل الموعد والوقت المتاح
        </p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-card">
        <BookingForm />
      </div>
    </div>
  );
}
