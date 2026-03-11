'use client';

import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
};

export function SafeImage({ src, alt }: Props) {
  const allowedDomains = ['res.cloudinary.com', 'logos-world.net'];

  const isAllowed = allowedDomains.some((d) => src.includes(d));

  if (!isAllowed) {
    return (
      <img src={src} alt={alt} className='w-16 h-16 rounded-md object-cover' />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={64}
      height={64}
      className='rounded-md object-cover'
    />
  );
}
