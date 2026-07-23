import { z } from 'zod';

export const algerianPhoneRegex = /^(05|06|07)[0-9]{8}$/;

export const bookingSchema = z.object({
  patient_first_name: z
    .string()
    .min(2, { message: 'الاسم الأول يجب أن يحتوي على حرفين على الأقل' }),
  patient_last_name: z
    .string()
    .min(2, { message: 'اللقب يجب أن يحتوي على حرفين على الأقل' }),
  age: z
    .coerce
    .number()
    .min(1, { message: 'العمر يجب أن يكون أكبر من 0' })
    .max(120, { message: 'يرجى إدخال عمر صحيح' }),
  phone_number: z
    .string()
    .regex(algerianPhoneRegex, {
      message: 'يرجى إدخال رقم هاتف جزائري صحيح يبدأ بـ 05 أو 06 أو 07 ويتكون من 10 أرقام',
    }),
  service_id: z.string().min(1, { message: 'يرجى اختيار الخدمة المطلوبة' }),
  preferred_date: z.string().min(1, { message: 'يرجى اختيار التاريخ المناسب' }),
  preferred_time: z.string().min(1, { message: 'يرجى اختيار التوقيت المناسب' }),
  notes: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
