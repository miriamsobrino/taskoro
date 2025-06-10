import type { Achievement } from '@/types/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { CheckCircle2, Coins, Lock, Star } from 'lucide-react';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { useEffect } from 'react';
import { getAchievementsFromDB } from '@/services/firebase';
import { useAuthContext } from '@/context/AuthContex';
import { useAppContext } from '@/context/AppContext';

interface AchievementCardProps {
  achievement: Achievement;
  onClaimReward: (id: string) => void;
}
export const AchievementCard = ({ achievement, onClaimReward }: AchievementCardProps) => {
  const { user } = useAuthContext();
  const { achievements, isAchievementClaimed, setAchievements } = useAppContext();
  useEffect(() => {
    if (!user) return;

    const fetchAchievements = async () => {
      const achievementsFromDB = await getAchievementsFromDB(user.uid);

      const mergedAchievements = achievements.map((localAch) => {
        const savedAch = achievementsFromDB.find((a) => a.id === localAch.id);

        return {
          ...localAch,
          progress: savedAch?.progress ?? 0,
          unlocked: savedAch?.unlocked ?? false,
          claimed: savedAch?.claimed ?? false,
        };
      });

      setAchievements(mergedAchievements);
    };

    fetchAchievements();
  }, [user]);
  return (
    <Card
      className={` py-4 px-2 w-full h-full pt-6
        "transition-all hover:border-primary/50 cursor-pointer",
        ${achievement.unlocked ? 'opacity-100' : 'opacity-80'},
      `}
    >
      <CardHeader className='pb-2'>
        <div className='flex justify-between items-start'>
          <CardTitle className='text-base'>{achievement.name}</CardTitle>
          <div
            className={`
              "flex h-6 w-6 items-center justify-center rounded-full  flex-col",
              ${achievement.unlocked ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
            `}
          >
            {achievement.unlocked ? (
              <CheckCircle2 className='h-full w-full flex items-center  justify-center ' />
            ) : (
              <Lock className='h-4 w-4 mt-1 flex items-center justify-center mx-auto ' />
            )}
          </div>
        </div>
        <CardDescription>{achievement.description}</CardDescription>
      </CardHeader>
      <CardContent className='pb-2'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between text-xs'>
            <span>Progreso</span>
            <span>
              {achievement.progress}/{achievement.target}
            </span>
          </div>

          <Progress value={Math.round((achievement.progress / achievement.target) * 100)} className='h-1.5' />
        </div>
      </CardContent>
      <CardFooter>
        <div className='flex items-center justify-between w-full text-xs'>
          <div className='flex gap-4'>
            <div className='flex items-center gap-1 text-yellow-500'>
              <Coins className='h-3.5 w-3.5' />
              <span>{achievement.reward.coins}</span>
            </div>
            <div className='flex items-center gap-1 text-primary'>
              <Star className='h-3.5 w-3.5' />
              <span>{achievement.reward.experience} XP</span>
            </div>
          </div>
          {achievement.unlocked && (
            <Button
              variant='outline'
              size='sm'
              className='h-7 text-xs cursor-pointer'
              disabled={achievement.claimed}
              onClick={(e) => {
                e.stopPropagation();
                onClaimReward(achievement.id);
              }}
            >
              {achievement.claimed ? 'Reclamado' : 'Reclamar'}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
