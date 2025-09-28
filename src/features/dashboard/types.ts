import { z } from 'zod';
import { taskSchema, taskStatusSchema } from './validation';

export type TaskValues = z.infer<typeof taskSchema>;
export type TaskStatus = z.infer<typeof taskStatusSchema>;
