'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLogin } from '../useLogin';
import Image from 'next/image';
import { FieldErrors } from '../auth.types';

export default function LoginForm() {
  const router = useRouter();
  const login = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (login.isSuccess) {
      router.replace('/profile');
    }
  }, [login.isSuccess, router]);

  // ========================
  // Validation helpers
  // ========================
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ========================
  // Realtime validation
  // ========================
  const validateField = (
    field: keyof FieldErrors,
    value: string,
    compareValue?: string
  ) => {
    let error: string | undefined;

    switch (field) {
      case 'email':
        if (!value.trim()) error = 'Email wajib diisi';
        else if (!isValidEmail(value)) error = 'Format email tidak valid';
        break;

      case 'password':
        if (!value) error = 'Password wajib diisi';
        else if (value.length < 8) error = 'Password minimal 8 karakter';
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  // ========================
  // Form validity
  // ========================
  const isFormValid =
    email && password && Object.values(errors).every((e) => !e);

  // ========================
  // Submit handler
  // ========================
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    login.mutate({
      email: email.trim(),
      password,
    });
  };

  return (
    <div className=' grid min-h-screen grid-cols-1 lg:grid-cols-2'>
      {/* LEFT IMAGE */}
      <div className='relative hidden lg:block'>
        <Image
          src='/images/login-food.jpg'
          alt='Food'
          fill
          priority
          className='object-cover'
        />
        <div className='absolute inset-0 bg-black/30' />
      </div>

      {/* RIGHT FORM */}
      <div className=' flex items-center justify-center bg-white md:px-43 px-6 '>
        <form
          onSubmit={handleSubmit}
          className=' space-y-4 md:space-y-5   w-full min-w-86'
        >
          {/* Logo & Heading */}
          <div className='text-center'></div>
          <Image
            src='/images/logo-food.png'
            alt='Food'
            width={114}
            height={32}
            priority
            className='object-cover md:w-37 md-h-10'
          />
          <div className=''>
            <h1 className='md:display-xl-extrabold display-xs-extrabold  text-neutral-950'>
              Welcome Back
            </h1>
            <p className='md:text-md-medium text-sm-medium text-neutral-950 '>
              Good to see you again! Let’s eat
            </p>
          </div>

          {/* Tabs */}
          <div className='flex justify-between items-center md:rounded-2xl rounded-xl bg-neutral-100 p-1 md:h-14 h-12 '>
            <button
              type='button'
              className=' md:rounded-xl bg-white w-full h-full text-neutral-950 whitespace-nowrap cursor-pointer'
            >
              Sign in
            </button>

            <button
              type='button'
              onClick={() => router.push('/register')}
              className=' md:rounded-xl text-neutral-950  w-full whitespace-nowrap cursor-pointer'
            >
              Sign up
            </button>
          </div>
          <div>
            {/* Inputs */}
            <div className='space-y-4'>
              <div className='w-full rounded-xl border border-gray-300 md:px-3 py-1 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 flex-col flex md-h-14 text-sm-regular'>
                <label className='md:text-xs-regular text-neutral-500 hidden md:block'>
                  Email
                </label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => {
                    const v = e.target.value;
                    setEmail(v);
                    validateField('email', v);
                  }}
                  placeholder='Email'
                  className='md:text-md-semibold focus:outline-none text-neutral-950 text-sm-regular md:placeholder:opacity-0 p-2.5'
                />
              </div>
              {errors.email && (
                <p className='mt-1 text-xs text-primary-100'>{errors.email}</p>
              )}

              {/* Password */}
              <div>
                <div className='relative w-full rounded-xl border border-gray-300 md:px-3 py-1 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 flex-col md:flex md-h-14'>
                  <label className='md:text-xs-regular text-neutral-500 hidden md:block'>
                    Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      const v = e.target.value;
                      setPassword(v);
                      validateField('password', v);
                    }}
                    placeholder='Password'
                    className='md:text-md-semibold focus:outline-none text-neutral-950 text-sm-regular md:placeholder:opacity-0 p-2.5'
                  />
                  <Image
                    src='/images/eye-Icon.png'
                    alt='toggle password'
                    width={16}
                    height={16}
                    className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
                    onClick={() => setShowPassword((p) => !p)}
                  />
                </div>
                {errors.password && (
                  <p className='mt-1 text-xs text-red-500'>{errors.password}</p>
                )}
              </div>
            </div>

            {/* Remember me */}
            <div className='flex items-center gap-2 text-sm-medium text-neutral-950 md:text-md-medium pt-4 md:pt-5'>
              <input
                type='checkbox'
                className='h-5 w-5 rounded-xl border-gray-300 focus:ring-primary-100 cursor-pointer checked:accent-primary-100 '
              />
              Remember Me
            </div>
          </div>

          {/* Button */}
          <button
            type='submit'
            disabled={!isFormValid || login.isPending}
            className='w-full rounded-full bg-primary-100 py-3 text-md-bold text-neutral-25 transition hover:bg-primary-200 cursor-pointer hover:opacity-70 disabled:opacity-50'
          >
            {login.isPending ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
