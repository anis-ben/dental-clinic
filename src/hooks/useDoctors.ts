import { useState, useEffect, useCallback } from 'react';
import { Doctor } from '@/types';
import { doctorsService } from '@/services/doctorsService';

export function useDoctors(adminOnly: boolean = false) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDoctors = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = adminOnly
        ? await doctorsService.getAllDoctors()
        : await doctorsService.getActiveDoctors();
      setDoctors(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'تعذر تحميل بيانات الأطباء';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [adminOnly]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return { doctors, isLoading, error, refetch: fetchDoctors, setDoctors };
}
