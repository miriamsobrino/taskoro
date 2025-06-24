import { useAppContext } from '@/context/AppContext';
import { useAuthContext } from '@/context/AuthContex';
import { getAchievementsFromDB, updateTaskInDB, updateUserAchievement, updateUserStats } from '@/services/firebase';
import type { Task } from '@/types/types';
import { getTaskRewards } from '@/utils/getTaskRewards';
import { useEffect } from 'react';

export const useAchievements = (showAlert: (title: string, description: string) => void) => {
  const {
    achievements,
    userXP,
    totalXP,
    totalCoins,
    currentUserLevel,
    setAchievements,
    setCurrentAchievements,
    setIsAchievementClaimed,
    setNotificationAchievements,
    setAchievementsViewed,
    setUserXP,
    setCurrentUserLevel,
    setTotalXP,
    setTotalCoins,
    setLoading,
  } = useAppContext();

  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;
    const fetchAchievements = async () => {
      const userAchievements = await getAchievementsFromDB(user.uid);
      const mergedAchievements = achievements.map((ach) => {
        const userProgress = userAchievements.find((ua) => ua.id === ach.id);
        return userProgress ? { ...ach, ...userProgress } : ach;
      });

      setAchievements(mergedAchievements);
      setLoading(false);
    };

    fetchAchievements();
  }, [user]);

  const completeTask = async (taskId: string, taskList: Task[], setTasks: (tasks: Task[]) => void) => {
    const task = taskList.find((t) => t.id === taskId);
    if (!task || task.completed) return;
    if (!user) return;
    const { xp: xpReward, coins: coinsReward } = getTaskRewards(task);

    const updatedTasks = taskList.map((t) => (t.id === taskId ? { ...t, completed: true } : t));
    setTasks(updatedTasks);
    await updateTaskInDB(user.uid, taskId, { completed: true });

    let unlockedCount = 0;
    setAchievements((prev) =>
      prev.map((ach) => {
        if (!ach.unlocked) {
          if (ach.category === 'streak' && task.isDaily) {
            const progress = ach.progress + 1;
            const unlocked = progress >= ach.target;
            if (unlocked) unlockedCount += 1;
            updateUserAchievement(user.uid, ach.id, { progress, unlocked });
            return { ...ach, progress, unlocked };
          } else if (ach.category === 'tasks') {
            const progress = ach.progress + 1;
            const unlocked = progress >= ach.target;
            if (unlocked) unlockedCount += 1;
            updateUserAchievement(user.uid, ach.id, { progress, unlocked });
            return { ...ach, progress, unlocked };
          }
        }
        return ach;
      })
    );

    if (unlockedCount > 0) {
      setCurrentAchievements((prev) => prev + unlockedCount);
      setNotificationAchievements((prev) => prev + 1);
      setAchievementsViewed(false);
    }

    const newXP = userXP + xpReward;
    if (newXP >= totalXP) {
      const levelUpBonus = 50;
      const newLevel = currentUserLevel + 1;
      const overflowXP = newXP - totalXP;
      const newCoins = totalCoins + coinsReward + levelUpBonus;
      setCurrentUserLevel(newLevel);
      setUserXP(overflowXP);
      setTotalXP((prevXP) => prevXP + 50);
      setTotalCoins(newCoins);
      await updateUserStats(user.uid, {
        level: newLevel,
        userXP: overflowXP,
        totalXP: totalXP + 50,
        coins: totalCoins + coinsReward + 50,
      });
      showAlert('¡Enhorabuena!', `Has subido al nivel ${newLevel} y has ganado 50 monedas.`);
    } else {
      setUserXP(newXP);
      const newCoins = totalCoins + coinsReward;
      setTotalCoins(newCoins);
      await updateUserStats(user.uid, {
        userXP: newXP,
        totalXP: totalXP,
        coins: totalCoins + coinsReward,
      });
    }
  };

  const onClaimReward = async (achievementId: string) => {
    if (!user) return;

    const achievement = achievements.find((a) => a.id === achievementId);
    if (!achievement || !achievement.unlocked || achievement.claimed) return;

    const xpReward = achievement.reward.experience;
    const coinReward = achievement.reward.coins;

    let updatedXP = userXP + xpReward;
    let updatedLevel = currentUserLevel;
    let updatedTotalXP = totalXP;
    let updatedCoins = totalCoins + coinReward;

    // Verificar si se sube de nivel
    if (updatedXP >= totalXP) {
      const overflowXP = updatedXP - totalXP;
      updatedXP = overflowXP;
      updatedLevel += 1;
      updatedTotalXP += 50;
      updatedCoins += 50;
      setCurrentUserLevel(updatedLevel);
      setTotalXP(updatedTotalXP);
      showAlert('¡Enhorabuena!', `Has subido al nivel ${updatedLevel} y has ganado 50 monedas.`);
    }

    // Actualizar estado en memoria
    setUserXP(updatedXP);
    setTotalCoins(updatedCoins);
    setAchievements((prevAch) => prevAch.map((ach) => (ach.id === achievementId ? { ...ach, claimed: true } : ach)));
    setIsAchievementClaimed(true);

    // Actualizar Firebase
    await updateUserAchievement(user.uid, achievementId, { claimed: true });
    await updateUserStats(user.uid, {
      level: updatedLevel,
      userXP: updatedXP,
      totalXP: updatedTotalXP,
      coins: updatedCoins,
    });
  };

  return { achievements, completeTask, onClaimReward };
};
