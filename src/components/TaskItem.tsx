import { useState } from 'react';
import type { Task } from '@/types/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Trash2, Star, RotateCcw, Coins } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onComplete, onDelete }: TaskItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 2:
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
      case 3:
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      default:
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
    }
  };

  const getDifficultyText = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return 'Fácil';
      case 2:
        return 'Media';
      case 3:
        return 'Difícil';
      default:
        return 'Media';
    }
  };

  const expReward = task.difficulty * 10;
  const coinsReward = task.difficulty * 5;

  return (
    <Card
      className={`transition-all duration-200 gap-2 py-0 h-fit ${task.completed ? 'opacity-70' : ''} ${
        isHovered ? 'shadow-md' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className='p-4'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-start gap-3 w-full flex-1 justify-between'>
            <div className='flex gap-2 items-center'>
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => onComplete(task.id)}
                className='mt-1'
                disabled={task.completed}
              />
              <h3 className={`font-medium text-lg ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                {task.name}
              </h3>
            </div>

            <div className='flex gap-1'>
              {task.isDaily && (
                <Badge variant='outline' className='flex items-center gap-1'>
                  <RotateCcw className='h-3 w-3' />
                  <span>Diaria</span>
                </Badge>
              )}
              <Badge className={getDifficultyColor(task.difficulty)}>{getDifficultyText(task.difficulty)}</Badge>
            </div>
          </div>
          <div className='flex flex-wrap gap-2 pt-1'>
            <div className='flex items-center text-xs text-muted-foreground'>
              <Star className='h-3.5 w-3.5 mr-1 text-yellow-500' />
              <span>{expReward} XP</span>
            </div>
            <div className='flex items-center text-xs text-muted-foreground'>
              <Coins className='h-3.5 w-3.5 mr-1 text-yellow-500' />
              <span>{coinsReward} monedas</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className='px-4 py-2 flex justify-between bg-muted/30'>
        <div className='flex items-center text-xs text-muted-foreground'>
          <Calendar className='h-3.5 w-3.5 mr-1' />
          <span>Creada: {new Date(task.createdAt).toLocaleDateString()}</span>
        </div>

        <Button
          variant='ghost'
          size='icon'
          className='h-8 w-8 text-muted-foreground hover:text-destructive cursor-pointer'
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className='h-4 w-4' />
          <span className='sr-only'>Eliminar tarea</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
