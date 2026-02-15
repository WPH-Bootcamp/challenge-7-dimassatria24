import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Home() {
  const token = (await cookies()).get('token')?.value;

  // Kalau sudah login → langsung ke profile
  if (token) {
    redirect('/profile');
  }

  // Kalau belum login → tampil landing page
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-6'>
      <h1 className='text-3xl font-bold'>Welcome 👋</h1>

      <p className='text-gray-600'>Please login to continue</p>

      <div className='flex gap-4'>
        <Link
          href='/login'
          className='rounded-md bg-blue-600 px-4 py-2 text-white'
        >
          Login
        </Link>

        <Link href='/register' className='rounded-md border px-4 py-2 bg-amber-600'>
          Register
        </Link>
      </div>
    </main>
  );
}
