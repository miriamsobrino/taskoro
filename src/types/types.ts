export interface Task {
  id: string;
  name: string;
  difficulty: number;
  isDaily: boolean;
  completed: boolean;
  createdAt: string;
  lastReset?: string | null;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  reward: AchievementReward;
  unlocked: boolean;
  progress: number;
  target: number;
  claimed?: boolean;
}

export interface AchievementReward {
  experience: number;
  coins: number;
}

export type AchievementCategory = 'tasks' | 'streak' | 'level' | 'shop';

export type UserAchievementProgress = {
  [achievementId: string]: Pick<Achievement, 'progress' | 'unlocked'>;
};
export interface ShopItem {
  id: string;
  name: string;
  price: number;
}

export interface UserInventory {
  items: ShopItem[];
}
export interface Message {
  id: string;
  title: string;
  description: string;
}
