import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Task } from '@/types/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';

interface DialogShopProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  addTask: (task: Task) => void;
}

export const DialogTasks = ({ title, description, isOpen, onClose, addTask }: DialogShopProps) => {
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('2');
  const [isDaily, setIsDaily] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const visualViewport = window.visualViewport;

    const handleResize = () => {
      if (visualViewport) {
        const heightDiff = window.innerHeight - visualViewport.height;
        setKeyboardVisible(heightDiff > 150); // Umbral típico de teclado
      }
    };

    visualViewport?.addEventListener('resize', handleResize);

    return () => {
      visualViewport?.removeEventListener('resize', handleResize);
    };
  }, []);

  const resetForm = () => {
    setName('');
    setDifficulty('2');
    setIsDaily(false);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const newTask = {
        id: uuidv4(),
        name,
        difficulty: Number(difficulty),
        isDaily,
        completed: false,
        createdAt: new Date().toISOString().split('T')[0],
        lastReset: isDaily ? new Date().toISOString().split('T')[0] : null,
      };
      addTask(newTask);
      resetForm();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${keyboardVisible ? 'mb-[300px]' : ''}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <Label htmlFor='name'>Título</Label>
          <Input
            id='name'
            placeholder='¿Qué tarea quieres añadir?'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className='gap-6 w-full flex  justify-between '>
          <div className='space-y-2 flex-1 w-full '>
            <Label htmlFor='difficulty'>Dificultad</Label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger id='difficulty'>
                <SelectValue placeholder='Selecciona la dificultad' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='1'>Fácil</SelectItem>
                <SelectItem value='2'>Media</SelectItem>
                <SelectItem value='3'>Difícil</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center justify-end flex-1 space-x-2 pt-6  '>
            <Label htmlFor='daily-task' className='cursor-pointer'>
              Tarea diaria
            </Label>
            <Switch id='daily-task' checked={isDaily} onCheckedChange={setIsDaily} />
          </div>
        </div>

        <DialogFooter>
          <Button type='submit' className='w-full' onClick={handleSubmit}>
            Añadir tarea
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
