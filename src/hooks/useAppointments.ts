import { useState, useEffect, useCallback, useOptimistic } from 'react';
import { Appointment } from '@/types';
import { appointmentsService } from '@/services/appointmentsService';

export function useAppointments(mode: 'pending' | 'date' = 'pending', dateStr?: string) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Optimistic state updater for instant UI feedback
  const [optimisticAppointments, setOptimisticAppointments] = useOptimistic(
    appointments,
    (state: Appointment[], action: { type: 'CONFIRM' | 'CANCEL'; id: string; timeSlot?: string }) => {
      if (action.type === 'CANCEL') {
        return state.filter((app) => app.id !== action.id);
      }
      if (action.type === 'CONFIRM') {
        return state.map((app) =>
          app.id === action.id
            ? { ...app, status: 'confirmed', preferred_time: action.timeSlot || app.preferred_time }
            : app
        );
      }
      return state;
    }
  );

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (mode === 'pending') {
        const data = await appointmentsService.getPendingAppointments();
        setAppointments(data);
      } else if (mode === 'date' && dateStr) {
        const data = await appointmentsService.getAppointmentsByDate(dateStr);
        setAppointments(data);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'تعذر تحميل بيانات الحجوزات';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [mode, dateStr]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const confirmAppointment = async (id: string, preferredDate: string, timeSlot: string) => {
    setOptimisticAppointments({ type: 'CONFIRM', id, timeSlot });
    try {
      await appointmentsService.confirmAppointment(id, preferredDate, timeSlot);
      await fetchAppointments();
    } catch (err: unknown) {
      // Automatic rollback via refetch
      await fetchAppointments();
      throw err;
    }
  };

  const cancelAppointment = async (id: string) => {
    setOptimisticAppointments({ type: 'CANCEL', id });
    try {
      await appointmentsService.cancelAppointment(id);
      await fetchAppointments();
    } catch (err: unknown) {
      await fetchAppointments();
      throw err;
    }
  };

  return {
    appointments: optimisticAppointments,
    isLoading,
    error,
    refetch: fetchAppointments,
    confirmAppointment,
    cancelAppointment,
  };
}
