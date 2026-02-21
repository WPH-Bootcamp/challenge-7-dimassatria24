'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRegister } from '../useRegister';
import Image from 'next/image';
import { FieldErrors } from '../auth.types';

export default function RegisterForm() {
  const router = useRouter();
  const register = useRegister();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (register.isSuccess) {
      router.replace('/login');
    }
  }, [register.isSuccess, router]);

  // ========================
  // Validation helpers
  // ========================
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (phone: string) => /^[0-9]{9,15}$/.test(phone);

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
      case 'name':
        if (!value.trim()) error = 'Name wajib diisi';
        break;

      case 'email':
        if (!value.trim()) error = 'Email wajib diisi';
        else if (!isValidEmail(value)) error = 'Format email tidak valid';
        break;

      case 'phone':
        if (!value.trim()) error = 'Nomor HP wajib diisi';
        else if (!isValidPhone(value))
          error = 'Nomor HP harus 9–15 digit angka';
        break;

      case 'password':
        if (!value) error = 'Password wajib diisi';
        else if (value.length < 8) error = 'Password minimal 8 karakter';
        break;

      case 'confirmPassword':
        if (!value) error = 'Confirm password wajib diisi';
        else if (value !== compareValue) error = 'Password tidak sama';
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
    name &&
    email &&
    phone &&
    password &&
    confirmPassword &&
    Object.values(errors).every((e) => !e);

  // ========================
  // Submit handler
  // ========================
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    register.mutate({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
    });
  };

  return (
    <div className='grid min-h-screen grid-cols-1 lg:grid-cols-2'>
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
      <div className='flex items-center justify-center bg-white md:px-43 px-6'>
        <form
          onSubmit={handleSubmit}
          className='w-full min-w-86 space-y-4 md:space-y-5'
        >
          {/* Logo */}
          <Image
            src='/images/logo-food.png'
            alt='Food'
            width={114}
            height={32}
            priority
          />

          {/* Heading */}
          <div>
            <h1 className='md:display-xl-extrabold display-xs-extrabold text-neutral-950'>
              Create Account
            </h1>
            <p className='md:text-md-medium text-sm-medium text-neutral-950'>
              Join us and start ordering food
            </p>
          </div>

          {/* Tabs */}
          <div className='flex items-center bg-neutral-100 p-1 rounded-xl h-12'>
            <button
              type='button'
              onClick={() => router.push('/login')}
              className='w-full text-neutral-950'
            >
              Sign in
            </button>
            <button
              type='button'
              className='w-full h-full bg-white text-neutral-950 rounded-xl'
            >
              Sign up
            </button>
          </div>

          {/* Inputs */}
          <div className='space-y-4'>
            {/* Name */}
            <div>
              <div className='w-full rounded-xl border border-gray-300 md:px-3 py-1 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 flex-col flex md-h-14 text-sm-regular'>
                <label className='md:text-xs-regular text-neutral-500 hidden md:block'>
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => {
                    const v = e.target.value;
                    setName(v);
                    validateField('name', v);
                  }}
                  placeholder='Name'
                  className='md:text-md-semibold focus:outline-none text-neutral-950 md:placeholder:opacity-0 p-2.5'
                />
              </div>
              {errors.name && (
                <p className='mt-1 text-xs text-primary-100'>{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <div className='relative w-full rounded-xl border border-gray-300 md:px-3 py-1 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 flex-col md:flex md-h-14'>
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
            </div>

            {/* Phone */}
            <div>
              <div className='relative w-full rounded-xl border border-gray-300 md:px-3 py-1 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 flex-col md:flex md-h-14'>
                <label className='md:text-xs-regular text-neutral-500 hidden md:block'>
                  Phone
                </label>
                <input
                  value={phone}
                  onChange={(e) => {
                    const v = e.target.value;
                    setPhone(v);
                    validateField('phone', v);
                  }}
                  placeholder='Phone'
                  className='md:text-md-semibold focus:outline-none text-neutral-950 text-sm-regular md:placeholder:opacity-0 p-2.5'
                />
              </div>
              {errors.phone && (
                <p className='mt-1 text-xs text-red-500'>{errors.phone}</p>
              )}
            </div>

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
                    validateField('confirmPassword', confirmPassword, v);
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

            {/* Confirm Password */}
            <div>
              <div className='relative w-full rounded-xl border border-gray-300 md:px-3 py-1 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 flex-col md:flex md-h-14'>
                <label className='md:text-xs-regular text-neutral-500 hidden md:block'>
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    const v = e.target.value;
                    setConfirmPassword(v);
                    validateField('confirmPassword', v, password);
                  }}
                  placeholder='Confirm Password'
                  className='md:text-md-semibold focus:outline-none text-neutral-950 text-sm-regular md:placeholder:opacity-0 p-2.5'
                />
                <Image
                  src='/images/eye-Icon.png'
                  alt='toggle confirm password'
                  width={16}
                  height={16}
                  className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
                  onClick={() => setShowConfirmPassword((p) => !p)}
                />
              </div>
              {errors.confirmPassword && (
                <p className='mt-1 text-xs text-red-500'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type='submit'
            disabled={!isFormValid || register.isPending}
            className='w-full rounded-full bg-primary-100 py-3 text-md-bold text-neutral-25 transition hover:bg-primary-200 cursor-pointer hover:opacity-70 disabled:opacity-50'
          >
            {register.isPending ? 'Creating account...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
