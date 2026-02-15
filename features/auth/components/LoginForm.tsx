'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLogin } from '../useLogin';

export default function LoginForm() {
  const router = useRouter();
  const login = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (login.isSuccess) {
      router.replace('/profile');
    }
  }, [login.isSuccess, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login.mutate({ email, password });
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-linear-to-br from-slate-900 via-blue-900 to-indigo-950 p-4'>
      <form className='max-w flex w-full flex-col gap-4 rounded-xl border border-blue-500/30 bg-slate-800/60 p-6 shadow-lg backdrop-blur-sm'>
        <h1 className='text-neutral-25 mb-2 text-2xl font-bold text-white'> Login</h1>

        <div className='space-y-3'>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='Email'
            className='border-blue/500/30 text-slare-100 placeholder:-slate-500 text-white w-full rounded-lg border bg-slate-900/50 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50'
          ></input>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='Password'
            className='border-blue/500/30 text-slare-100 placeholder:-slate-500 text-white w-full rounded-lg border bg-slate-900/50 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50'
          ></input>
        </div>
        <button
          onClick={handleSubmit}
          disabled={login.isPending}
          type='submit'
          className='rouded-lg w-full cursor-pointer bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700'
        >
          {login.isPending ? ' Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
