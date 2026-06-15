import { zodResolver } from '@hookform/resolvers/zod';
import { GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { getApiError } from '../api/client';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';

const schema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      await registerUser({ name: data.name, email: data.email, password: data.password });
      navigate('/login');
    } catch (error) {
      toast.error(getApiError(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4">
      <Card className="w-full max-w-md p-6">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-lg bg-indigo-600 text-white">
            <GraduationCap />
          </div>
          <h1 className="text-2xl font-bold text-slate-950">Create your account</h1>
          <p className="mt-1 text-sm text-slate-500">Start turning ideas into study flows.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Name" autoComplete="name" {...register('name')} error={formState.errors.name?.message} />
          <Input label="Email" type="email" autoComplete="email" {...register('email')} error={formState.errors.email?.message} />
          <Input label="Password" type="password" autoComplete="new-password" {...register('password')} error={formState.errors.password?.message} />
          <Input label="Confirm password" type="password" autoComplete="new-password" {...register('confirmPassword')} error={formState.errors.confirmPassword?.message} />
          <Button className="w-full" disabled={loading}>{loading ? 'Creating account...' : 'Register'}</Button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account? <Link className="font-semibold text-indigo-600" to="/login">Log in</Link>
        </p>
      </Card>
    </main>
  );
}
