import { collection, getDocs, deleteDoc, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import type { ShopItem, Task } from '@/types/types';

export async function addTaskToDB(userId: string, task: Task) {
  const docRef = doc(db, 'users', userId, 'tasks', task.id);
  await setDoc(docRef, task);
}
export async function getTasksFromDB(userId: string): Promise<Task[]> {
  const ref = collection(db, 'users', userId, 'tasks');
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Task[];
}
export async function updateTaskInDB(userId: string, taskId: string, updates: { completed: boolean }) {
  const docRef = doc(db, 'users', userId, 'tasks', taskId);
  await updateDoc(docRef, updates);
}
export async function removeTasksFromDB(userId: string, taskId: string) {
  const docRef = doc(db, 'users', userId, 'tasks', taskId);
  await deleteDoc(docRef);
}
export async function addShopItemToDB(userId: string, shopItem: ShopItem) {
  const docRef = doc(db, 'users', userId, 'shop-items', shopItem.id);
  await setDoc(docRef, shopItem);
}
export async function getShopItemsFromDB(userId: string): Promise<ShopItem[]> {
  const ref = collection(db, 'users', userId, 'shop-items');
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as ShopItem[];
}
export async function removeShopItemFromDB(userId: string, itemId: string) {
  const docRef = doc(db, 'users', userId, 'shop-items', itemId);
  await deleteDoc(docRef);
}
export async function addShopItemToInventoryDB(userId: string, shopItem: ShopItem) {
  const docRef = doc(db, 'users', userId, 'inventory-items', shopItem.id);
  await setDoc(docRef, shopItem);
}
export async function getInventoryItemsFromDB(userId: string): Promise<ShopItem[]> {
  const ref = collection(db, 'users', userId, 'inventory-items');
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as ShopItem[];
}
export async function removeInventoryItemFromDB(userId: string, itemId: string) {
  const docRef = doc(db, 'users', userId, 'inventory-items', itemId);
  await deleteDoc(docRef);
}
export async function getUserStats(userId: string) {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return data.stats;
  } else {
    return null;
  }
}
export async function getAchievementsFromDB(userId: string) {
  const ref = collection(db, 'users', userId, 'achievements');
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as { progress: number; unlocked: boolean; claimed?: boolean }),
  }));
}

export async function updateUserAchievement(
  userId: string,
  achievementId: string,
  data: {
    progress?: number;
    unlocked?: boolean;
    claimed?: boolean;
  }
) {
  const ref = doc(db, 'users', userId, 'achievements', achievementId);
  await setDoc(
    ref,
    {
      ...data,
    },
    { merge: true }
  );
}

export async function updateUserStats(
  userId: string,
  stats: {
    userXP?: number;
    totalXP?: number;
    coins?: number;
    level?: number;
  }
) {
  const docRef = doc(db, 'users', userId);
  await setDoc(docRef, { stats }, { merge: true });
}
