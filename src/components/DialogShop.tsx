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
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { ShopItem } from '@/types/types';

interface DialogShopProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  addItem: (item: ShopItem) => void;
}

export const DialogShop = ({ title, description, isOpen, onClose, addItem }: DialogShopProps) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const resetForm = () => {
    setName('');
    setPrice(0);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const newTask = {
        id: uuidv4(),
        name,
        price,
      };
      addItem(newTask);
      resetForm();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className='space-y-4 my-2'>
          <Label htmlFor='name'>Nombre del item</Label>
          <Input
            id='name'
            placeholder='¿Qué item quieres añadir?'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Label htmlFor='price'>Precio</Label>
          <Input
            id='price'
            type='number'
            placeholder='¿Cuántas monedas?'
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <DialogFooter>
          <Button type='submit' className='w-full cursor-pointer' onClick={handleSubmit}>
            Añadir item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
