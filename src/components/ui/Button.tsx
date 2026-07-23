import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] min-h-[44px] touch-manipulation select-none';

    const variants = {
      primary:
        'bg-medical-500 hover:bg-medical-600 text-white shadow-md shadow-medical-500/25 focus:ring-medical-500',
      secondary:
        'bg-medical-50 hover:bg-medical-100 text-medical-700 font-semibold focus:ring-medical-400',
      outline:
        'border-2 border-medical-500 text-medical-600 hover:bg-medical-50 focus:ring-medical-500',
      danger:
        'bg-status-rose text-white hover:bg-red-600 shadow-md shadow-rose-500/20 focus:ring-status-rose',
      ghost:
        'text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm min-w-[36px]',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-7 py-3 text-lg font-bold',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-5 h-5 ml-2 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
