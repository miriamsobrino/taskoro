import { Card, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, Trash2, AlertCircle } from 'lucide-react';
import type { ShopItem } from '@/types/types';

interface ItemCardProps {
  item: ShopItem;
  canBuy?: boolean;
  onBuyClick?: () => void;
  showPrice?: boolean;
  onDeleteClick?: () => void;
  disabledBuy?: boolean;
  totalCoins?: number;
}

export const ItemCard = ({
  item,
  canBuy = false,
  onBuyClick,
  showPrice = true,
  onDeleteClick,
  totalCoins,
}: ItemCardProps) => {
  return (
    <Card className='border-primary/50 py-2 max-h-28  '>
      <CardHeader>
        <div className='flex justify-between items-center mt-2'>
          <CardTitle className='text-lg'>{item.name}</CardTitle>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8 text-muted-foreground hover:text-destructive cursor-pointer'
            onClick={onDeleteClick}
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      </CardHeader>

      {showPrice && (
        <CardFooter className='flex justify-between pb-4 gap-4 '>
          <div className='flex items-center gap-1 text-yellow-500'>
            <Coins className='h-4 w-4' />
            <span>{item.price}</span>
          </div>
          {canBuy ? (
            (totalCoins ?? 0) < item.price ? (
              <div className='flex items-center gap-2 text-destructive bg-destructive/10 p-2 px-3 rounded-md'>
                <AlertCircle className='h-5 w-5' />
                <p className='text-sm'>No tienes suficientes monedas.</p>
              </div>
            ) : (
              <Button onClick={onBuyClick} className='cursor-pointer'>
                <span>Comprar</span>
              </Button>
            )
          ) : null}
          {!canBuy && onDeleteClick && (
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8 text-muted-foreground hover:text-destructive'
              onClick={onDeleteClick}
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
