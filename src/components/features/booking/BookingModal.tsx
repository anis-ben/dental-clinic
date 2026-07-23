'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { BookingForm } from './BookingForm';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedServiceName?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedServiceName,
}) => {
  const { t, language } = useLanguage();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        preselectedServiceName
          ? `${language === 'ar' ? 'حجز خدمة:' : 'Book Procedure:'} ${preselectedServiceName}`
          : t('bookingModalTitle')
      }
      description={t('bookingModalDesc')}
      maxWidth="lg"
    >
      <BookingForm preselectedServiceId={preselectedServiceId} />
    </Modal>
  );
};
