import { useAppContext } from '@/context/AppContext';
import { useAuthContext } from '@/context/AuthContex';
import { addTaskToDB, getTasksFromDB, removeTasksFromDB } from '@/services/firebase';
import type { Task } from '@/types/types';
import { useEffect, useState } from 'react';

export const useTasks = (today: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const { user } = useAuthContext();
  const { setLoading } = useAppContext();
  useEffect(() => {
    if (!user) return;
    const fetchTasks = async () => {
      const allTasks = await getTasksFromDB(user.uid);

      const filteredTasks = allTasks.filter((task) => {
        if (task.isDaily) return true;
        if (task.completed && task.createdAt.split('T')[0] !== today) return false;
        return true;
      });

      setTasks(filteredTasks);
      setLoading(false);
    };

    fetchTasks();
  }, [today, user]);

  useEffect(() => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.isDaily && (task.lastReset !== today || task.lastReset === undefined)) {
          return {
            ...task,
            completed: false,
            lastReset: today,
          };
        }
        return task;
      })
    );
  }, []);

  const openTaskForm = () => setIsTaskFormOpen(true);
  const closeTaskForm = () => setIsTaskFormOpen(false);

  const addTask = (newTask: Task) => {
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    addTaskToDB(user?.uid!!, newTask);
    closeTaskForm();
  };
  const deleteTask = async (taskId: string) => {
    if (!user) return;
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    await removeTasksFromDB(user.uid, taskId);
  };

  return {
    tasks,
    isTaskFormOpen,
    setTasks,
    setIsTaskFormOpen,
    addTask,
    deleteTask,
    openTaskForm,
    closeTaskForm,
  };
};
