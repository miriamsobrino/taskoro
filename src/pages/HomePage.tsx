import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuthContext } from '@/context/AuthContex';
import { ArrowRight, Brain, Coins, Sparkles, Target } from 'lucide-react';
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
    <div className='min-h-screen bg-white'>
      <div className='container mx-auto px-6 py-16 lg:py-32'>
        <div className='text-center max-w-4xl mx-auto'>
          <div className='inline-flex items-center justify-center mb-6 bg-black text-white px-4 py-2 rounded-full text-sm font-medium gap-2 shadow-md'>
            <Sparkles className='w-4 h-4' />
            Transforma tu productividad
          </div>

          <h1 className='text-5xl lg:text-7xl font-bold text-black mb-6'>Taskoro</h1>

          <p className='text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed'>
            Convierte tus tareas en una
            <span className='font-semibold text-black'> aventura diaria</span>
          </p>

          <p className='text-base md:text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed'>
            Gamifica tu productividad, alcanza tus metas y disfruta cada logro. Taskoro hace que completar tareas sea
            tan emocionante como jugar tu videojuego favorito.
          </p>

          <Button
            size='lg'
            className='bg-black cursor-pointer hover:bg-gray-800 text-white px-8 py-4 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
            onClick={handleSignIn}
          >
            Empezar Ahora
            <ArrowRight className='w-5 h-5 ml-2' />
          </Button>
        </div>

        <div className='grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto'>
          <Card className=' text-center bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105'>
            <div className='w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4'>
              <Target className='w-8 h-8 text-white' />
            </div>
            <h3 className='text-xl font-bold text-black'>Motívate como nunca</h3>
            <p className='text-gray-600 '>Las tareas ahora son misiones.</p>
          </Card>

          <Card className=' text-center bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105'>
            <div className='w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4'>
              <Coins className='w-8 h-8 text-white' />
            </div>
            <h3 className='text-xl font-bold text-black'>Gana recompensas</h3>
            <p className='text-gray-600 '>Cada tarea completada suma.</p>
          </Card>

          <Card className=' text-center bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105'>
            <div className='w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4'>
              <Brain className='w-8 h-8 text-white' />
            </div>
            <h3 className='text-xl font-bold text-black'>Construye hábitos duraderos</h3>
            <p className='text-gray-600'>La constancia crea disciplina.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
