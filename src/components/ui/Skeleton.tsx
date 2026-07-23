import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'card' | 'avatar' | 'table';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, variant = 'text', ...props }) => {
  if (variant === 'card') {
    return (
      <div className={cn('bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-pulse space-y-4', className)}>
        <div className="h-6 bg-slate-200 rounded-md w-3/4"></div>
        <div className="h-4 bg-slate-100 rounded-md w-full"></div>
        <div className="h-4 bg-slate-100 rounded-md w-5/6"></div>
        <div className="h-10 bg-slate-200 rounded-xl w-1/3 pt-2"></div>
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className="w-full bg-white rounded-2xl border border-slate-100 p-4 space-y-3 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-slate-100 rounded-xl w-full flex items-center justify-between px-4">
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/6"></div>
            <div className="h-8 bg-slate-200 rounded-lg w-24"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn('bg-slate-200 animate-pulse rounded-md', className)}
      {...props}
    />
  );
};
