'use client';

import Image from 'next/image';
import { useBestSellerResto } from '../useBestSellerResto';

export default function BestSellerResto() {
  const { data, isLoading, error } = useBestSellerResto({
    page: 1,
    limit: 20,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Gagal memuat data</p>;

  return (
    <div className='grid grid-cols-2 gap-4'>
      <h1>Best Seller Resto</h1>
      {data?.data.restaurants.map((resto) => (
        <div key={resto.id} className='border rounded-lg p-4'>
          <Image
            src={resto.logo}
            alt={resto.name}
            width={64}
            height={64}
            className='rounded-md object-cover'
          />
          <h3 className='font-semibold'>{resto.name}</h3>
          <p className='text-sm text-gray-500'>
            ⭐ {resto.star} · {resto.place}
          </p>
          <p className='text-sm'>
            Rp {resto.priceRange.min} - Rp {resto.priceRange.max}
          </p>
          <p className='text-xs text-gray-400'>
            {resto.distance} km · {resto.reviewCount} reviews
          </p>
        </div>
      ))}
    </div>
  );
}
