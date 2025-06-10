import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Achievement } from '@/types/types';
import { AchievementCard } from './AchievementCard';

interface AchievementsTabsProps {
  achievements: Achievement[];
  onClaimReward: (id: string) => void;
}
export const AchievementsTabs = ({ achievements, onClaimReward }: AchievementsTabsProps) => {
  const achievementsTasks = achievements.filter((task) => task.category === 'tasks');
  const achievementsStreaks = achievements.filter((task) => task.category === 'streak');
  const achievementsLevels = achievements.filter((task) => task.category === 'level');
  const achievementsShop = achievements.filter((task) => task.category === 'shop');
  const sortAchievements = [...achievements].sort((a, b) => Number(b.unlocked) - Number(a.unlocked));
  return (
    <Tabs defaultValue='all' className='w-full overflow-y-auto max-h-screen pb-72'>
      <TabsList className='grid grid-cols-5 mb-4 w-full '>
        <TabsTrigger value='all' className='cursor-pointer'>
          Todos
        </TabsTrigger>
        <TabsTrigger value='tasks' className='cursor-pointer'>
          Tareas
        </TabsTrigger>
        <TabsTrigger value='streaks' className='cursor-pointer'>
          Rachas
        </TabsTrigger>
        <TabsTrigger value='levels' className='cursor-pointer'>
          Niveles
        </TabsTrigger>
        <TabsTrigger value='shop' className='cursor-pointer'>
          Compras
        </TabsTrigger>
      </TabsList>

      <TabsContent value='all' className='space-y-4 grid-cols-1 md:grid-cols-2 grid gap-4 '>
        {sortAchievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} onClaimReward={onClaimReward} />
        ))}
      </TabsContent>

      <TabsContent value='tasks' className='space-y-4 grid-cols-1 md:grid-cols-2 grid gap-4'>
        {achievementsTasks.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} onClaimReward={() => achievement.id} />
        ))}
      </TabsContent>
      <TabsContent value='streaks' className='space-y-4 grid-cols-1 md:grid-cols-2 grid gap-4'>
        {achievementsStreaks.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} onClaimReward={() => achievement.id} />
        ))}
      </TabsContent>
      <TabsContent value='levels' className='space-y-4 grid-cols-1 md:grid-cols-2 grid gap-4'>
        {achievementsLevels.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} onClaimReward={() => achievement.id} />
        ))}
      </TabsContent>
      <TabsContent value='shop' className='space-y-4 grid-cols-1 md:grid-cols-2 grid gap-4'>
        {achievementsShop.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} onClaimReward={() => achievement.id} />
        ))}
      </TabsContent>
    </Tabs>
  );
};
