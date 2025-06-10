import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Task } from '@/types/types';
import { TaskItem } from './TaskItem';
import { useAppContext } from '@/context/AppContext';

interface TasksTabsProps {
  tasks: Task[];
  onCompleteTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}
export const TaskTabs = ({ tasks, onDeleteTask, onCompleteTask }: TasksTabsProps) => {
  const dailyTasks = tasks.filter((task) => task.isDaily);
  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);
  const { loading } = useAppContext();
  return (
    <Tabs defaultValue='all' className='w-full overflow-y-auto h-screen pb-72'>
      <TabsList className='grid grid-cols-4 mb-4 w-full '>
        <TabsTrigger value='all' className='cursor-pointer'>
          Todas
        </TabsTrigger>
        <TabsTrigger value='daily' className='cursor-pointer'>
          Diarias
        </TabsTrigger>
        <TabsTrigger value='pending' className='cursor-pointer'>
          Pendientes
        </TabsTrigger>
        <TabsTrigger value='completed' className='cursor-pointer'>
          Completadas
        </TabsTrigger>
      </TabsList>

      <TabsContent value='all' className='space-y-4'>
        {loading ? (
          <div className='w-full flex flex-col items-center  '>
            <span className='loader' />
          </div>
        ) : tasks.length === 0 ? (
          <div className='text-center py-8 text-muted-foreground'>
            No hay tareas. ¡Añade una nueva tarea para comenzar!
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem key={task.id} task={task} onComplete={onCompleteTask} onDelete={onDeleteTask} />
          ))
        )}
      </TabsContent>

      <TabsContent value='daily' className='space-y-4'>
        {dailyTasks.length === 0 ? (
          <div className='text-center py-8 text-muted-foreground'>
            No hay tareas diarias. ¡Añade una tarea diaria para establecer una rutina!
          </div>
        ) : (
          dailyTasks.map((task) => (
            <TaskItem key={task.id} task={task} onComplete={onCompleteTask} onDelete={onDeleteTask} />
          ))
        )}
      </TabsContent>

      <TabsContent value='pending' className='space-y-4'>
        {pendingTasks.length === 0 ? (
          <div className='text-center py-8 text-muted-foreground'>¡No hay tareas pendientes! ¡Buen trabajo!</div>
        ) : (
          pendingTasks.map((task) => (
            <TaskItem key={task.id} task={task} onComplete={onCompleteTask} onDelete={onDeleteTask} />
          ))
        )}
      </TabsContent>

      <TabsContent value='completed' className='space-y-4'>
        {completedTasks.length === 0 ? (
          <div className='text-center py-8 text-muted-foreground'>
            No hay tareas completadas. ¡Completa algunas tareas para verlas aquí!
          </div>
        ) : (
          completedTasks.map((task) => (
            <TaskItem key={task.id} task={task} onComplete={onCompleteTask} onDelete={onDeleteTask} />
          ))
        )}
      </TabsContent>
    </Tabs>
  );
};
