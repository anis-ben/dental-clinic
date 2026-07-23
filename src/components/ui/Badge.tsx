import React from 'react';
import { cn } from '@/lib/utils';
import { AppointmentStatus } from '@/types';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: AppointmentStatus;
  variant?: 'emerald' | 'amber' | 'rose' | 'neutral' | 'medical';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  status,
  variant,
  children,
  ...props
}) => {
  let computedVariant = variant || 'neutral';

  if (status === 'confirmed') computedVariant = 'emerald';
  if (status === 'pending') computedVariant = 'amber';
  if (status === 'canceled') computedVariant = 'rose';

  const styles = {
    emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    amber: 'bg-amber-50 text-amber-700 border border-amber-200/60',
    rose: 'bg-rose-50 text-rose-700 border border-rose-200/60',
    medical: 'bg-medical-50 text-medical-700 border border-medical-200/60',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
  };

  const labels: Record<AppointmentStatus, string> = {
    confirmed: 'مؤكد',
    pending: 'قيد الانتظار',
    canceled: 'ملغى',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors',
        styles[computedVariant],
        className
      )}
      {...props}
    >
      {children || (status ? labels[status] : null)}
    </span>
  );
};
