import { Award, CheckSquare, Package, ShoppingCart } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { ButtonNav } from './ButtonNav';

interface TabsProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}
export const Navigation = ({ activeTab, onChangeTab }: TabsProps) => {
  const { achievementsViewed, notificationAchievements, setAchievementsViewed, setNotificationAchievements } =
    useAppContext();
  return (
    <div className='flex items-center justify-between p-2 border-b h-16 px-4 w-full'>
      <div className='flex items-center gap-2 md:gap-4 w-full'>
        <ButtonNav
          activeTab={activeTab}
          tabId='tasks'
          icon={<CheckSquare className='h-4 w-4' />}
          label='Tareas'
          onChangeTab={() => onChangeTab('tasks')}
        />
        <ButtonNav
          activeTab={activeTab}
          tabId='shop'
          icon={<ShoppingCart className='h-4 w-4' />}
          label='Tienda'
          onChangeTab={() => onChangeTab('shop')}
        />
        <ButtonNav
          activeTab={activeTab}
          tabId='inventory'
          icon={<Package className='h-4 w-4' />}
          label='Inventario'
          onChangeTab={() => onChangeTab('inventory')}
        />
        <ButtonNav
          activeTab={activeTab}
          tabId='achievements'
          className='relative'
          icon={
            <>
              <Award className='h-4 w-4' />
              {notificationAchievements > 0 && !achievementsViewed && (
                <div className='h-4 w-4 bg-primary absolute top-0 -right-2 text-accent text-xs rounded-full flex items-center font-bold justify-center'>
                  {notificationAchievements}
                </div>
              )}
            </>
          }
          label='Logros'
          onChangeTab={() => onChangeTab('achievements')}
          onClickExtra={() => {
            setAchievementsViewed(true);
            setNotificationAchievements(0);
          }}
        />
      </div>
    </div>
  );
};
