'use client';

import React from 'react';
import { useDoctors } from '@/hooks/useDoctors';
import { DoctorCard } from './DoctorCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { AlertTriangle } from 'lucide-react';

export const DoctorGrid: React.FC = () => {
  const { doctors, isLoading, error } = useDoctors(false);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} variant="card" className="h-[420px]" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-200 text-status-rose space-y-2">
        <AlertTriangle className="w-8 h-8 mx-auto" />
        <p className="font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};
