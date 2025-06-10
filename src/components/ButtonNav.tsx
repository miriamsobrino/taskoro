import type { JSX } from 'react';
import { Button } from './ui/button';

interface BottonNavProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
  icon: JSX.Element;
  label: string;
  tabId: string;
  className?: string;
  onClickExtra?: () => void;
}
export const ButtonNav = ({ activeTab, tabId, label, icon, className, onChangeTab, onClickExtra }: BottonNavProps) => {
  const handleClick = () => {
    onChangeTab(tabId);
    if (onClickExtra) onClickExtra();
  };
  return (
    <Button
      variant={activeTab === tabId ? 'default' : 'ghost'}
      size='sm'
      className={`flex items-center gap-1 cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {icon}
      <span className=''>{label}</span>
    </Button>
  );
};
