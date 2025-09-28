import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import superjson from 'superjson';
import { v4 as uuidv4 } from 'uuid';
import { PersistStorage } from 'zustand/middleware';

import type { TaskValues } from '../types';

export interface TaskState {
  tasks: Map<string, TaskValues>;
}

export interface TaskAction {
  createTask: (value: TaskValues) => void;
  editTask: (id: string, value: TaskValues) => void;
  toggleTaskStatus: (id: string, completed?: boolean) => void;
  removeTask: (id: string) => void;
}

const initialState: TaskState = {
  tasks: new Map(),
};

const storage: PersistStorage<TaskState> = {
  getItem: (name) => {
    const str = localStorage.getItem(name);

    if (!str) return null;

    return superjson.parse(str);
  },

  setItem: (name, value) => {
    localStorage.setItem(name, superjson.stringify(value));
  },

  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

export const useTasksStore = create<TaskState & TaskAction>()(
  persist(
    (set, get) => ({
      ...initialState,

      createTask: (value) => {
        const tasks = get().tasks;

        tasks.set(uuidv4(), value);

        set({ tasks });
      },

      editTask: (id, value) => {
        const tasks = get().tasks;

        tasks.set(id, value);

        set({ tasks });
      },

      toggleTaskStatus: (id, completed) => {
        const tasks = get().tasks;
        const task = tasks.get(id);

        if (task) {
          tasks.set(id, {
            ...task,
            status:
              task.status === 'pending' || completed ? 'completed' : 'pending',
          });
        }

        set({ tasks });
      },

      removeTask: (id) => {
        const tasks = get().tasks;

        tasks.delete(id);

        set({ tasks });
      },
    }),
    {
      name: 'tasks-storage',
      storage,
    }
  )
);
