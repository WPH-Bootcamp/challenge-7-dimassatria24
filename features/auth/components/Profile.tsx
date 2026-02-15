'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

import { useProfile } from '@/features/auth/useProfile';

export default function Profile() {
  const router = useRouter();
  const { data, isLoading } = useProfile();

  if (isLoading) return <p>Loading...</p>;

  const handleLogout = () => {
    Cookies.remove('token', { path: '/' });
    toast.success('Berhasil logout');
    router.replace('/login');
  };

  const user = data?.data;

  return (
    <div className='space-y-3 p-4'>
      <div>Avatar: {user?.avatar ?? '-'}</div>
      <div>ID: {user?.id}</div>
      <div>Nama: {user?.name}</div>

      <button
        onClick={handleLogout}
        className='mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700'
      >
        Logout
      </button>
    </div>
  );
}
