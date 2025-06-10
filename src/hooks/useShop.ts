import { useAppContext } from '@/context/AppContext';
import { useAuthContext } from '@/context/AuthContex';
import {
  addShopItemToDB,
  addShopItemToInventoryDB,
  getInventoryItemsFromDB,
  getShopItemsFromDB,
  removeInventoryItemFromDB,
  removeShopItemFromDB,
} from '@/services/firebase';
import type { ShopItem } from '@/types/types';
import { useEffect, useState } from 'react';

export const useShop = (showAlert: (title: string, description: string) => void) => {
  const [isShopFormOpen, setIsShopFormOpen] = useState(false);
  const { user } = useAuthContext();
  const { shopItems, inventoryItems, totalCoins, setTotalCoins, setShopItems, setInventoryItems, setLoading } =
    useAppContext();
  useEffect(() => {
    if (!user) return;
    const fetchShopItems = async () => {
      const allShopItems = await getShopItemsFromDB(user.uid);
      setShopItems(allShopItems);
      setLoading(false);
    };
    const fetchInventoryItems = async () => {
      const allInventoryItems = await getInventoryItemsFromDB(user.uid);
      setInventoryItems(allInventoryItems);
      setLoading(false);
    };
    fetchShopItems();
    fetchInventoryItems();
  }, [user]);
  const openShopForm = () => setIsShopFormOpen(true);
  const closeShopForm = () => setIsShopFormOpen(false);

  const addItem = (newItem: ShopItem) => {
    setShopItems((prevItems) => [newItem, ...prevItems]);
    addShopItemToDB(user?.uid!!, newItem);
    closeShopForm();
  };

  const addItemToInventory = async (item: ShopItem) => {
    setShopItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    setInventoryItems((prevItems) => [item, ...prevItems]);
    await addShopItemToInventoryDB(user?.uid!!, item);
    await removeShopItemFromDB(user?.uid!!, item.id);
    setTotalCoins((prevCoins) => prevCoins - item.price);
    showAlert('¡Has comprado un item!', 'Puedes encontrarlo en tu inventario.');
  };
  const removeInventoryItems = async (userId: string, itemId: string) => {
    setInventoryItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
    await removeInventoryItemFromDB(userId, itemId);
  };
  const removeShopItems = async (userId: string, itemId: string) => {
    setShopItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
    await removeShopItemFromDB(userId, itemId);
  };
  return {
    shopItems,
    inventoryItems,
    totalCoins,
    isShopFormOpen,
    openShopForm,
    closeShopForm,
    addItem,
    addItemToInventory,
    removeInventoryItems,
    removeShopItems,
  };
};
