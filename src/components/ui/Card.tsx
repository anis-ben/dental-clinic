import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, hoverEffect = false, children, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl p-6 border border-slate-100 shadow-card transition-all duration-300',
        hoverEffect && 'hover-glow-card hover:border-medical-200 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
