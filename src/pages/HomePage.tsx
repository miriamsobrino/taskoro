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
    <div className='flex flex-col gap-16 max-w-[1200px] h-screen bg-background w-full justify-center mx-auto items-center text-center overflow-y-hidden pb-20'>
      <div className='flex flex-col mt-40 md:mt-0 gap-4 text-center px-12 md:px-0 md:text-left justify-center items-center md:items-center'>
        <div className='flex flex-col gap-2 text-center'>
          <h1 className='font-jost text-5xl font-medium'>Taskoro</h1>
          <h2 className='text-2xl'>Convierte tus tareas en una aventura diaria.</h2>
        </div>
        <Button onClick={handleSignIn} className='w-fit cursor-pointer text-md'>
          Empezar ahora
        </Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
        <article className='flex flex-col items-center max-w-[340px] border-2 rounded-md pt-3 px-3 h-[110px]'>
          <span className='text-5xl pb-2 -mt-10'>🎯</span>
          <h3 className='text-xl font-semibold'>Motívate como nunca</h3>
          <p>Las tareas ahora son misiones.</p>
        </article>
        <article className='flex flex-col items-center max-w-[340px] border-2 rounded-md pt-3 px-3 h-[110px]'>
          <span className='text-5xl pb-2 -mt-10'>💰</span>
          <h3 className='text-xl font-semibold'>Gana monedas y recompensas</h3>
          <p>Cada tarea completada suma.</p>
        </article>
        <article className='flex flex-col items-center max-w-[340px] border-2 rounded-md pt-3  px-3 h-[110px]'>
          <span className='text-5xl pb-2 -mt-10 '>🧠</span>
          <h3 className='text-xl font-semibold'>Construye hábitos duraderos</h3>
          <p>La constancia ahora tiene premios.</p>
        </article>
      </div>
      {/* <div>
        <img className='-mt-20 md:mt-0 w-80 md:w-96' src='./illustration.png' />
      </div>*/}
    </div>
  );
}
