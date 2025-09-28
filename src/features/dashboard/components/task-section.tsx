'use client';

import { useMemo, useState } from 'react';

import { useTasksStore } from '../store/use-tasks-store';

import CreateTask from './create-task';
import Task from './task';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from '@/shared/components/ui/select';

const TaskSection = () => {
  const [status, setStatus] = useState<string>('all');

  const { tasks } = useTasksStore();

  const tasksEntries = useMemo(() => {
    const collection = tasks ? Array.from(tasks.entries()) : [];

    switch (status) {
      case 'all':
        return collection;

      case 'pending':
        return collection.filter(([_, task]) => task.status === 'pending');

      case 'completed':
        return collection.filter(([_, task]) => task.status === 'completed');

      default:
        return collection;
    }
  }, [tasks, status]);

  return (
    <section className="xl:max-w-6xl mx-auto">
      <div className="space-y-3">
        <div>
          <Select
            defaultValue={status}
            onValueChange={(value) => setStatus(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CreateTask />
      </div>

      <div className="divide divide-y mt-5">
        {tasksEntries.map(([id, task], idx) => (
          <Task key={idx} id={id} data={task} />
        ))}
      </div>
    </section>
  );
};

export default TaskSection;
