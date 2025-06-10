import type { Task } from '@/types/types';

export function getTaskRewards(task: Task) {
  const xp = task.difficulty * 10;
  const coins = task.difficulty * 5;
  return { xp, coins };
}
