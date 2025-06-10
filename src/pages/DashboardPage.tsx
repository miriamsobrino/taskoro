import { useEffect, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { TaskTabs } from '@/components/TaskTabs';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/components/UserProfile';
import { CirclePlus, Coins, Star, Trophy } from 'lucide-react';
import { AchievementsTabs } from '@/components/AchievementsTabs';
import { AlertThemed } from '@/components/AlertThemed';
import { DialogShop } from '@/components/DialogShop';
import { DialogTasks } from '@/components/DialogTasks';
import { useTasks } from '@/hooks/useTasks';
import { useAchievements } from '@/hooks/useAchievements';
import { useShop } from '@/hooks/useShop';
import { useAlerts } from '@/hooks/useAlerts';
import { useAuthContext } from '@/context/AuthContex';
import { useNavigate } from 'react-router-dom';
import { ItemCard } from '@/components/ItemCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppContext } from '@/context/AppContext';

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('tasks');
  const { user, authLoading } = useAuthContext();
  const { alerts, showAlert } = useAlerts();
  const today = new Date().toISOString().split('T')[0];
  const { tasks, isTaskFormOpen, setTasks, addTask, deleteTask, openTaskForm, closeTaskForm } = useTasks(today);
  const { achievements, completeTask, onClaimReward } = useAchievements(showAlert);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  //const today = '2025-06-12';

  const {
    shopItems,
    inventoryItems,
    isShopFormOpen,
    totalCoins,
    openShopForm,
    closeShopForm,
    addItem,
    addItemToInventory,
    removeInventoryItems,
    removeShopItems,
  } = useShop(showAlert);
  const { currentUserLevel, currentAchievements } = useAppContext();

  const handleCompleteTask = (taskId: string) => {
    completeTask(taskId, tasks, setTasks);
  };

  return (
    <div className='flex flex-col h-screen bg-background w-full justify-center '>
      <div className='flex flex-col w-full md:flex-row  flex-1 h-full overflow-hidden'>
        {screenWidth > 768 ? (
          <aside className='w-full md:w-80 border-r bg-muted/40 p-4 '>
            <UserProfile />
          </aside>
        ) : (
          <div className='w-full gap-3  p-4 flex justify-start items-center '>
            <div className=''>
              <Avatar className='h-10 w-10 '>
                <AvatarImage src={user?.photoURL ?? undefined} alt='Avatar' />
                <AvatarFallback>{user?.displayName?.[0] ?? ''}</AvatarFallback>
              </Avatar>
            </div>
            <div className='flex w-full gap-3 bg-card border justify-center items-center p-4 rounded-md'>
              <div className='flex flex-col gap-1'>
                <div className='flex justify-between '>
                  <div className='flex gap-2 items-center'>
                    <Trophy size={18} />
                    <span className='font-semibold text-sm'>Nivel {currentUserLevel}</span>
                  </div>
                </div>
              </div>

              <div className='flex justify-between'>
                <div className='flex gap-1 items-center'>
                  <Coins size={18} className=' text-yellow-500' />
                  <span className='font-semibold text-sm'>{totalCoins} Monedas</span>
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='flex gap-1 items-center'>
                  <Star size={18} className='text-violet-500' />
                  <span className='font-semibold text-sm'>{currentAchievements} Logros</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <section className='flex-1 flex-col relative '>
          <Navigation activeTab={activeTab} onChangeTab={setActiveTab} />

          {activeTab === 'tasks' && (
            <div className='w-full lg:px-40 xl:px-80 px-6 py-8 md:py-20 gap-8  justify-center flex flex-col items-center relative'>
              <div className='flex justify-between w-full items-center  '>
                <div className='flex flex-col gap-2'>
                  <h1 className='text-3xl font-bold tracking-tight'>Mis Tareas</h1>
                  <p className='text-muted-foreground'>Completa tareas para ganar experiencia y monedas.</p>
                </div>
                <Button
                  onClick={openTaskForm}
                  className='cursor-pointer px-2! rounded-md fixed bottom-8 right-6 md:static md:inline-flex'
                >
                  <CirclePlus className='size-6 md:size-5' /> {screenWidth > 1024 && <span>Añadir tarea</span>}
                </Button>
              </div>

              <TaskTabs tasks={tasks} onDeleteTask={deleteTask} onCompleteTask={handleCompleteTask} />
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className='w-full lg:px-40 xl:px-80 px-4 py-8 md:py-20 gap-8 justify-center flex flex-col  '>
              <div className='flex justify-between w-full items-center  '>
                <div className='flex flex-col gap-2'>
                  <h1 className='text-3xl font-bold tracking-tight'>Logros</h1>
                  <p className='text-muted-foreground'>Completa hitos para desbloquear logros y obtener recompensas</p>
                </div>
              </div>
              <AchievementsTabs achievements={achievements} onClaimReward={onClaimReward} />
            </div>
          )}

          {activeTab === 'shop' && (
            <div className='w-full lg:px-40 xl:px-80 px-4 py-8 md:py-20 gap-8  justify-center flex flex-col '>
              <div className='flex justify-between w-full items-center  '>
                <div className='flex flex-col gap-2'>
                  <h1 className='text-3xl font-bold tracking-tight'>Tienda</h1>
                  <p className='text-muted-foreground'>Convierte tus monedas en recompensas reales.</p>
                </div>
                <Button
                  onClick={openShopForm}
                  className='cursor-pointer px-2! rounded-md fixed bottom-8 right-6 md:static md:inline-flex'
                >
                  <CirclePlus className='size-6 md:size-5' /> {screenWidth > 1024 && <span>Añadir item</span>}
                </Button>
              </div>
              <div className='space-y-4 grid-cols-1 md:grid-cols-2 grid gap-4'>
                {shopItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    canBuy={true}
                    item={item}
                    showPrice={true}
                    totalCoins={totalCoins}
                    onBuyClick={() => addItemToInventory(item)}
                    onDeleteClick={() => removeShopItems(user?.uid!!, item.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className='w-full lg:px-40 xl:px-80 px-4 py-8 md:py-20 gap-8  justify-center flex flex-col '>
              <div className='flex justify-between w-full items-center  '>
                <div className='flex flex-col gap-2'>
                  <h1 className='text-3xl font-bold tracking-tight'>Inventario</h1>
                  <p className='text-muted-foreground'>Items que has comprado con monedas.</p>
                </div>
              </div>
              <div className=' grid-cols-1 md:grid-cols-3 grid gap-4 '>
                {inventoryItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    showPrice={false}
                    onDeleteClick={() => removeInventoryItems(user?.uid!!, item.id)}
                  />
                ))}
              </div>
            </div>
          )}

          <DialogShop
            title='Nuevo item'
            description='Completa los campos para agregar un item a la tienda.'
            isOpen={isShopFormOpen}
            onClose={closeShopForm}
            addItem={addItem}
          />
          <DialogTasks title='Nueva tarea' isOpen={isTaskFormOpen} onClose={closeTaskForm} addTask={addTask} />
          {alerts.map((alert) => (
            <AlertThemed title={alert.title} description={alert.description} />
          ))}
        </section>
      </div>
    </div>
  );
}
