import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-xl font-semibold'>Registro</CardTitle>
          <CardDescription>Ingresa tu correo electrónico para crear una cuenta</CardDescription>
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
                </div>
                <Input id='password' type='password' required />
              </div>
              <div className='flex flex-col gap-3'>
                <Button type='submit' className='w-full cursor-pointer'>
                  Registrarse
                </Button>
                <Button variant='outline' className='w-full cursor-pointer'>
                  Registrarse con Google
                </Button>
              </div>
            </div>
            <div className='mt-4 text-center text-sm'>
              Ya tienes una cuenta?{' '}
              <a href='#' className='hover:underline underline-offset-4 '>
                Inicia sesión
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
