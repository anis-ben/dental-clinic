import { z } from 'zod';

export const doctorSchema = z.object({
  full_name: z.string().min(3, { message: 'الاسم الكامل يجب أن يحتوي على 3 أحرف على الأقل' }),
  bio: z.string().min(10, { message: 'الوصف المهني يجب أن يكون مفصلاً (10 أحرف على الأقل)' }),
  years_experience: z.coerce.number().min(0, { message: 'سنوات الخبرة لا يمكن أن تكون بالسالب' }),
  certifications: z.array(z.string()).min(1, { message: 'يرجى إضافة شهادة واحدة على الأقل' }),
  image_url: z.string().url({ message: 'يرجى تقديم رابط صورة صحيح' }),
  active: z.boolean().default(true),
});

export type DoctorFormValues = z.infer<typeof doctorSchema>;
