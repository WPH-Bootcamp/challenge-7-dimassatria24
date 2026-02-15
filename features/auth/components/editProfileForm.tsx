'use client';

import { useUpdateProfile } from '@/features/auth/useUpdateProfile';
import { useProfile } from '@/features/auth/useProfile';
import { useRouter } from 'next/navigation';

export default function EditProfileForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const { data } = useProfile();
  const { mutate, isPending } = useUpdateProfile();
  const router = useRouter();

  const user = data?.data;

  if (!user) return null; // ⬅️ PENTING

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    mutate(
      {
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
      },
      {
        onSuccess: () => {
          onSuccess?.(); // optional callback
          router.push('/profile'); // ✅ redirect
        },
      }
    );
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-linear-to-br from-slate-900 via-blue-900 to-indigo-950 p-4'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md space-y-4 rounded-xl border border-blue-500/30 bg-slate-800/60 p-6 shadow-lg backdrop-blur-sm'
      >
        <h1 className='mb-2 text-2xl font-bold text-white'>Edit Form</h1>

        <div className='space-y-3'>
          <input
            name='name'
            defaultValue={user.name}
            className='w-full rounded-lg border border-blue-500/30 bg-slate-900/50 px-4 py-3 text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50'
          />

          <input
            name='email'
            defaultValue={user.email}
            disabled
            className='w-full rounded-lg border border-blue-500/30 bg-slate-900/50 px-4 py-3 text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50'
          />
          <input
            name='phone'
            defaultValue={user.phone}
            className='w-full rounded-lg border border-blue-500/30 bg-slate-900/50 px-4 py-3 text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50'
          />
          <input
            name='avatar'
            defaultValue={user.avatar}
            className='w-full rounded-lg border border-blue-500/30 bg-slate-900/50 px-4 py-3 text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50'
          />
        </div>

        <button
          type='submit'
          disabled={isPending}
          className='w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-60'
        >
          {isPending ? 'Saving...' : 'Save'}
        </button>
        <button
          type='button'
          onClick={() => router.push('/profile')}
          className='w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-60'
        >
          Cancel{' '}
        </button>
      </form>
    </div>
  );
}
