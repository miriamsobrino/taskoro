import { ACHIEVEMENTS } from '@/constants/constants';
import { type Achievement, type ShopItem } from '@/types/types';
import React, { createContext, useContext, useState } from 'react';
interface AppContextType {
  userXP: number;
  currentUserLevel: number;
  currentAchievements: number;
  totalXP: number;
  totalCoins: number;
  totalAchievements: number;
  achievements: Achievement[];
  achievementsViewed: boolean;
  notificationAchievements: number;
  isAchievementClaimed: boolean;
  shopItems: ShopItem[];
  inventoryItems: ShopItem[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShopItems: React.Dispatch<React.SetStateAction<ShopItem[]>>;
  setInventoryItems: React.Dispatch<React.SetStateAction<ShopItem[]>>;
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>;
  setAchievementsViewed: React.Dispatch<React.SetStateAction<boolean>>;
  setNotificationAchievements: React.Dispatch<React.SetStateAction<number>>;
  setIsAchievementClaimed: React.Dispatch<React.SetStateAction<boolean>>;
  setUserXP: React.Dispatch<React.SetStateAction<number>>;
  setCurrentUserLevel: React.Dispatch<React.SetStateAction<number>>;
  setTotalXP: React.Dispatch<React.SetStateAction<number>>;
  setTotalCoins: React.Dispatch<React.SetStateAction<number>>;
  setCurrentAchievements: React.Dispatch<React.SetStateAction<number>>;
  setTotalAchievements: React.Dispatch<React.SetStateAction<number>>;
}
export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('No context');
  return context;
};

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userXP, setUserXP] = useState(0);
  const [currentUserLevel, setCurrentUserLevel] = useState(1);
  const [totalXP, setTotalXP] = useState(100);
  const [totalCoins, setTotalCoins] = useState(0);
  const [currentAchievements, setCurrentAchievements] = useState(0);
  const [totalAchievements, setTotalAchievements] = useState(ACHIEVEMENTS.length);
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [notificationAchievements, setNotificationAchievements] = useState(0);
  const [achievementsViewed, setAchievementsViewed] = useState(false);
  const [isAchievementClaimed, setIsAchievementClaimed] = useState(false);
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [inventoryItems, setInventoryItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);

  return (
    <AppContext.Provider
      value={{
        userXP,
        currentUserLevel,
        currentAchievements,
        totalXP,
        totalCoins,
        totalAchievements,
        achievements,
        achievementsViewed,
        notificationAchievements,
        shopItems,
        inventoryItems,
        isAchievementClaimed,
        loading,
        setLoading,
        setShopItems,
        setInventoryItems,
        setAchievements,
        setAchievementsViewed,
        setNotificationAchievements,
        setUserXP,
        setCurrentUserLevel,
        setTotalXP,
        setTotalCoins,
        setCurrentAchievements,
        setTotalAchievements,
        setIsAchievementClaimed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
