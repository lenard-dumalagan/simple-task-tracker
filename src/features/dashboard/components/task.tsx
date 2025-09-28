'use client';

import { useState } from 'react';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useTasksStore } from '../store/use-tasks-store';

import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Form } from '@/shared/components/ui/form';
import { InputField } from '@/shared/components/form';

import { taskSchema } from '../validation';
import { cn } from '@/shared/lib/utils';

import type { TaskValues } from '../types';

export interface TaskProps {
  id: string;
  data: TaskValues;
}

const Task = ({ id, data }: TaskProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const form = useForm<TaskValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      content: data?.content || '',
      status: data?.status || 'pending',
    },
  });

  const { toggleTaskStatus, removeTask, editTask } = useTasksStore();

  const onSubmit = (values: TaskValues) => {
    editTask(id, values);
    useTasksStore.persist.rehydrate();
    setEditMode(false);
  };

  return (
    <div className="py-6 flex items-center gap-6">
      <div className="flex flex-1 items-center gap-3">
        <Checkbox
          name="status"
          checked={data?.status === 'completed'}
          onCheckedChange={(checked) => {
            toggleTaskStatus?.(id, checked.valueOf() as boolean);
            useTasksStore.persist.rehydrate();
          }}
        />

        {!editMode ? (
          <div
            className={cn(
              'text-lg',
              data?.status === 'completed' &&
                'line-through text-muted-foreground'
            )}
          >
            {data?.content || ''}
          </div>
        ) : (
          <Form {...form}>
            <form className="w-full space-y-3">
              <InputField name="content" className="w-full" />
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  size="sm"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Save
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>

      <div className="flex items-center justify-end gap-3">
        {!editMode ? (
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => setEditMode(true)}
          >
            <PencilIcon className="size-5" />
            <span className="sr-only">Edit Task</span>
          </Button>
        ) : null}

        <Button
          type="button"
          size="icon"
          variant="destructive"
          onClick={() => {
            removeTask?.(id);
            useTasksStore.persist.rehydrate();
          }}
        >
          <TrashIcon className="size-5" />
          <span className="sr-only">Delete Task</span>
        </Button>
      </div>
    </div>
  );
};

export default Task;
