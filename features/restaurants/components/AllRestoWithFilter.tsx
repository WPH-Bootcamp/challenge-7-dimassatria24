'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AllRestoPayload } from '../resto.type';
import { parseFilters, serializeFilters } from '@/lib/restoQuery';
import { useAllResto } from '../useAllResto';
import { DEFAULT_FILTERS } from '../defaultFilters';
import Image from 'next/image';

export default function AllRestoWithFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // INIT FROM URL
  const [filters, setFilters] = useState<AllRestoPayload>(() =>
    parseFilters(searchParams)
  );

  // SYNC TO URL
  useEffect(() => {
    const params = serializeFilters(filters);
    router.replace(`?${params.toString()}`, {
      scroll: false,
    });
  }, [filters, router]);

  const { data, isLoading, error } = useAllResto(filters);
  const restaurants = data?.data.restaurants ?? [];

  // 🔁 RESET HANDLER
  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    router.replace('?', { scroll: false }); // bersihkan URL
  };

  return (
    <section className='space-y-4'>
      <h1 className='text-xl font-semibold'>All Restaurants</h1>

      {/* FILTER BAR */}
      <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>
        {/* RANGE */}
        <select
          value={filters.range ?? ''}
          onChange={(e) =>
            setFilters({
              ...filters,
              range: e.target.value ? Number(e.target.value) : undefined,
              page: 1,
            })
          }
          className='border p-2 rounded'
        >
          <option value=''>Any distance</option>
          <option value={1}>Within 1 km</option>
          <option value={2}>Within 2 km</option>
          <option value={5}>Within 5 km</option>
        </select>

        {/* PRICE MIN */}
        <input
          type='number'
          placeholder='Min Price'
          value={filters.priceMin ?? ''}
          onChange={(e) =>
            setFilters({
              ...filters,
              priceMin: e.target.value ? Number(e.target.value) : undefined,
              page: 1,
            })
          }
          className='border p-2 rounded'
        />

        {/* RATING */}
        <select
          value={filters.rating ?? ''}
          onChange={(e) =>
            setFilters({
              ...filters,
              rating: e.target.value ? Number(e.target.value) : undefined,
              page: 1,
            })
          }
          className='border p-2 rounded'
        >
          <option value=''>Any rating</option>
          <option value={1}>⭐ 1+</option>
          <option value={2}>⭐ 2+</option>
          <option value={3}>⭐ 3+</option>
          <option value={4}>⭐ 4+</option>
          <option value={5}>⭐ 5</option>
        </select>

        {/* SORT */}
        <select
          value={filters.category ?? ''}
          onChange={(e) =>
            setFilters({
              ...filters,
              category: e.target.value
                ? (e.target.value as AllRestoPayload['category'])
                : undefined,
              page: 1,
            })
          }
          className='border p-2 rounded'
        >
          <option value=''>Default sort</option>
          <option value='price'>Sort by Price</option>
          <option value='distance'>Sort by Distance</option>
          <option value='rating'>Sort by Rating</option>
        </select>

        {/* 🔁 RESET */}
        <button
          onClick={handleReset}
          className='border rounded p-2 text-red-600 hover:bg-red-50'
        >
          Reset
        </button>
      </div>

      {/* CONTENT */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Gagal memuat data</p>}

      {!isLoading && restaurants.length === 0 ? (
        <p className='text-gray-500'>Tidak ada restoran</p>
      ) : (
        <div className='grid grid-cols-2 gap-4'>
          {data?.data.restaurants.map((resto) => (
            <div key={resto.id} className='border rounded-lg p-4 space-y-2'>
              <Image
                src={resto.logo}
                alt={resto.name}
                width={64}
                height={64}
                className='w-16 h-16 rounded object-cover'
              />

              <h3 className='font-semibold'>{resto.name}</h3>
              <p className='text-sm text-gray-500'>
                ⭐ {resto.star} · {resto.place}
              </p>
              <p className='text-xs text-gray-400'>
                {resto.distance} km · {resto.reviewCount} reviews
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
