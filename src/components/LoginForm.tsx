import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-xl font-semibold'>Inicio de sesión</CardTitle>
          <CardDescription>Ingresa tu correo electrónico para acceder a tu cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email' placeholder='m@example.com' required />
              </div>
              <div className='grid gap-3'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Contraseña</Label>
                  <a href='#' className='ml-auto inline-block text-sm underline-offset-4 hover:underline'>
                    Has olvidado tu contraseña?
                  </a>
                </div>
                <Input id='password' type='password' required />
              </div>
              <div className='flex flex-col gap-3'>
                <Button type='submit' className='w-full cursor-pointer'>
                  Iniciar sesión
                </Button>
                <Button variant='outline' className='w-full cursor-pointer'>
                  Iniciar sesión con Google
                </Button>
              </div>
            </div>
            <div className='mt-4 text-center text-sm'>
              Todavía no tienes una cuenta?{' '}
              <a href='#' className='hover:underline underline-offset-4 '>
                Regístrate
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
