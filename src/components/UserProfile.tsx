import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Coins, Star, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { useAppContext } from '@/context/AppContext';
import { useAuthContext } from '@/context/AuthContex';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAchievementsFromDB, getUserStats } from '@/services/firebase';
export const UserProfile = () => {
  const {
    userXP,
    totalXP,
    currentUserLevel,
    currentAchievements,
    totalCoins,
    totalAchievements,
    setUserXP,
    setTotalXP,
    setTotalCoins,
    setCurrentUserLevel,
    setCurrentAchievements,
  } = useAppContext();
  const { logOut } = useAuthContext();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchUserStats = async () => {
      const userStats = await getUserStats(user.uid);
      setUserXP(userStats.userXP);
      setTotalXP(userStats.totalXP);
      setTotalCoins(userStats.coins);
      setCurrentUserLevel(userStats.level > 1 ? userStats.level : 1);
    };

    const fecthCompletedAchievements = async () => {
      const allAchievements = await getAchievementsFromDB(user.uid);
      const completedAchievements = allAchievements.filter((ach) => ach.unlocked).length;
      setCurrentAchievements(completedAchievements);
    };
    fetchUserStats();
    fecthCompletedAchievements();
  }, [user]);

  const handleSignOut = () => {
    logOut();
    navigate('/');
  };
  return (
    <div className='h-auto md:h-screen flex md:flex-col items-center justify-center gap-4 pt-4 md:pt-0 md:gap-8 md:px-6 relative'>
      <div className='flex flex-col items-center '>
        <Avatar className='w-12 h-12 md:h-24 md:w-24 border-1 border-primary'>
          <AvatarImage src={user?.photoURL ?? undefined} alt='Avatar' />
          <AvatarFallback className=''>{user?.displayName?.[0] ?? 'CN'}</AvatarFallback>
        </Avatar>
        {screenWidth > 768 && (
          <h2 className='text-xl font-bold mt-2'>@{user?.displayName?.split(' ').join('_').toLowerCase()}</h2>
        )}
      </div>
      <div className='flex md:flex-col w-full justify-between gap-2 md:gap-6 bg-card border p-4 rounded-md'>
        <div className='flex flex-col gap-3'>
          <div className='flex justify-between '>
            <div className='flex gap-2 items-center'>
              <Trophy size={18} />
              <span className='font-semibold text-sm md:text-base'>Nivel {currentUserLevel}</span>
            </div>
            {screenWidth > 768 ? (
              <span className='text-sm text-muted-foreground'>
                {userXP}/{totalXP} XP
              </span>
            ) : (
              ''
            )}
          </div>
          {screenWidth > 768 && <Progress value={(userXP / totalXP) * 100} />}
        </div>

        <div className='flex justify-between'>
          <div className='flex gap-2 items-center'>
            <Coins size={18} className=' text-yellow-500' />
            <span className='font-semibold text-sm md:text-base'>
              {screenWidth < 768 ? `${totalCoins} Monedas` : 'Monedas'}
            </span>
          </div>
          {screenWidth > 768 && <span className='text-sm text-muted-foreground'>{totalCoins}</span>}
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-2 items-center'>
            <Star size={18} className='text-violet-500' />
            <span className='font-semibold text-sm md:text-base'>
              {screenWidth > 768 ? 'Logros' : `${currentAchievements} Logros`}
            </span>
          </div>
          {screenWidth > 768 && (
            <span className='text-sm text-muted-foreground'>
              {currentAchievements}/{totalAchievements}
            </span>
          )}
        </div>
      </div>
      {screenWidth > 768 && (
        <Button onClick={handleSignOut} className='absolute bottom-20 cursor-pointer'>
          Cerrar sesión
        </Button>
      )}
    </div>
  );
};
