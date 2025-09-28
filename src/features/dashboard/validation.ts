import { z } from 'zod';

export const taskStatusSchema = z.enum(['pending', 'completed']);

export const taskSchema = z.object({
  content: z.string().min(1, 'This field is required.'),
  status: taskStatusSchema,
});
