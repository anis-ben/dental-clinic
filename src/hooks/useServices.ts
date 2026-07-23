import { useState, useEffect, useCallback } from 'react';
import { Service } from '@/types';
import { servicesService } from '@/services/servicesService';

export function useServices(adminOnly: boolean = false) {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = adminOnly
        ? await servicesService.getAllServices()
        : await servicesService.getActiveServices();
      setServices(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'تعذر تحميل بيانات الخدمات';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [adminOnly]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return { services, isLoading, error, refetch: fetchServices, setServices };
}
