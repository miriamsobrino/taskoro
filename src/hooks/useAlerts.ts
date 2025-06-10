import { useState } from 'react';
import type { Message } from '@/types/types';
import { v4 as uuidv4 } from 'uuid';

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Message[]>([]);
  const showAlert = (title: string, description: string, duration = 3000) => {
    const id = uuidv4();
    const newAlert = { id, title, description };
    setAlerts((prev) => [...prev, newAlert]);

    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, duration);
  };
  return {
    alerts,
    showAlert,
  };
};
