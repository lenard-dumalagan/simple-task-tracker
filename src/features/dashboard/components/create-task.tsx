'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';

import { Form } from '@/shared/components/ui/form';
import { InputField } from '@/shared/components/form';
import { Button } from '@/shared/components/ui/button';

import { useTasksStore } from '../store/use-tasks-store';

import { taskSchema } from '../validation';
import { TASK_DEFAULT_VALUES } from '../constants';

import type { TaskValues } from '../types';

const CreateTask = () => {
  const form = useForm<TaskValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: TASK_DEFAULT_VALUES,
  });

  const { createTask } = useTasksStore();

  const onSubmit = (values: TaskValues) => {
    createTask?.(values);
    useTasksStore.persist.rehydrate();
  };

  return (
    <Form {...form}>
      <form className="flex gap-2">
        <InputField
          name="content"
          placeholder="Add a new task..."
          className="flex-1"
        />
        <Button type="submit" size="icon" onClick={form.handleSubmit(onSubmit)}>
          <PlusIcon className="size-6" />
          <span className="sr-only">Create Task</span>
        </Button>
      </form>
    </Form>
  );
};

export default CreateTask;
