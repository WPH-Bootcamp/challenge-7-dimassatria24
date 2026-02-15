'use client';

import { useState } from 'react';
import EditProfileForm from '@/features/auth/components/editProfileForm';

export default function EditProfile() {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='space-y-4 p-4'>
        <EditProfileForm onSuccess={() => setIsEdit(false)} />
    </div>
  );
}