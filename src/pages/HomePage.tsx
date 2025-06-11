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
    <div className='flex flex-col flex-re md:flex-row h-screen bg-background w-full justify-center mx-auto items-center text-center '>
      <div className='flex flex-col mt-20 md:mt-0 gap-4 text-center px-12 md:px-0 md:text-left justify-center items-center md:items-start'>
        <div className='flex flex-col gap-2'>
          <h1 className='font-jost text-5xl font-medium'>Taskoro</h1>
          <h2 className='text-xl'>Convierte tus tareas pendientes en un juego.</h2>
        </div>
        <Button onClick={handleSignIn} className='w-fit cursor-pointer'>
          Iniciar sesión con google
        </Button>
      </div>
      <div>
        <img className='-mt-20 md:mt-0 w-80 md:w-96' src='./illustration.png' />
      </div>
    </div>
  );
}
