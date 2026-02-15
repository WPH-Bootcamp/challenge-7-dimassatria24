'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRegister } from '../useRegister';

export default function RegisterForm() {
  const router = useRouter();
  const register = useRegister();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // ✅ Redirect setelah register sukses
  useEffect(() => {
    if (register.isSuccess) {
      router.replace('/login');
    }
  }, [register.isSuccess, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    register.mutate({
      name,
      email,
      phone,
      password,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-900 via-blue-900 to-indigo-950 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-xl border border-blue-500/30 bg-slate-800/60 p-6 shadow-lg backdrop-blur-sm"
      >
        <h1 className="mb-2 text-2xl font-bold text-white">
          Register
        </h1>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama"
          required
          className="w-full rounded-lg border border-blue-500/30 bg-slate-900/50 px-4 py-3 text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
          className="w-full rounded-lg border border-blue-500/30 bg-slate-900/50 px-4 py-3 text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
        />

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="No. HP"
          type="tel"
          className="w-full rounded-lg border border-blue-500/30 bg-slate-900/50 px-4 py-3 text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
          className="w-full rounded-lg border border-blue-500/30 bg-slate-900/50 px-4 py-3 text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
        />

        <button
          type="submit"
          disabled={register.isPending}
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {register.isPending
            ? 'Mendaftarkan akun...'
            : 'Register'}
        </button>
      </form>
    </div>
  );
}