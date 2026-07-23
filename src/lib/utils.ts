import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency to Algerian Dinar (DZD / د.ج)
 */
export function formatDZD(amount: number): string {
  return new Intl.NumberFormat('ar-DZ', {
    style: 'currency',
    currency: 'DZD',
    maximumFractionDigits: 0,
  }).format(amount).replace('DZD', 'د.ج');
}

/**
 * Format YYYY-MM-DD string into readable Arabic Date
 */
export function formatDateArabic(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ar-DZ', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Generate standard daily time slots for clinic (08:00 to 17:00)
 */
export function generateDailyTimeSlots(): string[] {
  return [
    '08:00',
    '08:45',
    '09:30',
    '10:15',
    '11:00',
    '11:45',
    '13:30',
    '14:15',
    '15:00',
    '15:45',
    '16:30',
  ];
}
