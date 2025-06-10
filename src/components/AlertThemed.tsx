import { PartyPopper } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface AlertThemedProps {
  title: string;
  description: string;
}
export const AlertThemed = ({ title, description }: AlertThemedProps) => {
  return (
    <Alert className='fixed top-4 left-1/2 -translate-x-1/2  shadow-lg w-[400px] z-20 mx-auto '>
      <PartyPopper className='h-4 w-4' />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
