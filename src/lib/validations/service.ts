import { z } from 'zod';

export const serviceSchema = z.object({
  name: z.string().min(3, { message: 'اسم الخدمة يجب أن يحتوي على 3 أحرف على الأقل' }),
  description: z.string().min(10, { message: 'وصف الخدمة يجب أن يكون واضخاً (10 أحرف على الأقل)' }),
  price: z.coerce.number().min(100, { message: 'سعر الخدمة يجب أن يكون أكبر من 100 د.ج' }),
  duration_minutes: z.coerce.number().min(15, { message: 'مدة الجلسة يجب أن تكون 15 دقيقة على الأقل' }),
  active: z.boolean().default(true),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
