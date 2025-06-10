import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/AuthContex';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const { signInWithGoogle, user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  const handleSignIn = () => {
    signInWithGoogle();
    navigate('/dashboard');
  };
  return (
    <div className='flex flex-col h-screen bg-background w-full justify-center mx-auto items-center text-center '>
      <div className='flex flex-col gap-4 text-center justify-center items-center'>
        <div className='flex flex-col gap-2'>
          <h1 className='font-jost text-4xl f'>Taskoro</h1>
          <h2 className='text-xl'>Convierte tus tareas pendientes en un juego.</h2>
        </div>
        <Button onClick={handleSignIn} className='w-fit cursor-pointer'>
          Iniciar sesión con google
        </Button>
      </div>
    </div>
  );
}
