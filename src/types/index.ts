export type AppointmentStatus = 'pending' | 'confirmed' | 'canceled';

export interface Doctor {
  id: string;
  full_name: string;
  bio: string;
  years_experience: number;
  certifications: string[];
  image_url: string;
  active: boolean;
  created_at?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  active: boolean;
  created_at?: string;
}

export interface Appointment {
  id: string;
  patient_first_name: string;
  patient_last_name: string;
  age: number;
  phone_number: string;
  service_id: string;
  preferred_date: string;
  preferred_time: string;
  status: AppointmentStatus;
  confirmed_time_slot?: string | null;
  notes?: string | null;
  created_at?: string;
  services?: Service;
}

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  created_at?: string;
}

export interface AnalyticsMetrics {
  totalVisitors: number;
  completedToday: number;
  completedThisWeek: number;
  canceledCount: number;
  dailyTrend: { date: string; count: number; confirmed: number }[];
  popularServices: { name: string; count: number }[];
}

export interface TimeSlot {
  time: string;
  isAvailable: boolean;
  appointment?: Appointment;
}
