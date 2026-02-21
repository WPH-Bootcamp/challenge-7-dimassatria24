'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRestaurantDetail } from '../useRestaurantDetail';

export default function RestaurantDetail() {
  const [id, setId] = useState<number>(298);
  const [limitMenu, setLimitMenu] = useState(10);
  const [limitReview, setLimitReview] = useState(6);
  const [submitted, setSubmitted] = useState(true);

  const { data, isLoading, error } = useRestaurantDetail({
    id,
    limitMenu,
    limitReview,
    enabled: submitted,
  });

  const resto = data?.data;

  return (
    <div className='max-w-4xl mx-auto space-y-8'>
      {/* ===== FILTER ===== */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className='flex gap-4'
      >
        <input
          type='number'
          placeholder='Restaurant ID'
          value={id}
          onChange={(e) => setId(Number(e.target.value))}
          className='border px-3 py-2 rounded w-32'
        />
        <input
          type='number'
          placeholder='Limit Menu'
          value={limitMenu}
          onChange={(e) => setLimitMenu(Number(e.target.value))}
          className='border px-3 py-2 rounded w-32'
        />
        <input
          type='number'
          placeholder='Limit Review'
          value={limitReview}
          onChange={(e) => setLimitReview(Number(e.target.value))}
          className='border px-3 py-2 rounded w-32'
        />
        <button className='bg-black text-white px-4 rounded'>Load</button>
      </form>

      {/* ===== STATE ===== */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Gagal memuat data</p>}

      {resto && (
        <>
          {/* ===== HEADER ===== */}
          <section className='flex gap-6 items-center'>
            <Image
              src={resto.logo}
              alt={resto.name}
              width={80}
              height={80}
              className='rounded-full'
            />
            <div>
              <h1 className='text-2xl font-bold'>{resto.name}</h1>
              <p className='text-gray-600'>{resto.category}</p>
              <p className='text-sm'>{resto.place}</p>
              <p className='text-sm'>
                ⭐ {resto.averageRating} ({resto.totalReviews} reviews)
              </p>
            </div>
          </section>
          {/* ===== IMAGES ===== */}
          <section className='grid grid-cols-2 gap-3'>
            {resto.images.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt='Restaurant image'
                width={400}
                height={250}
                className='rounded object-cover'
              />
            ))}
          </section>
          {/* ===== MENUS ===== */}
          <section>
            <h2 className='text-xl font-semibold mb-3'>
              Menu ({resto.totalMenus})
            </h2>

            <div className='grid grid-cols-2 gap-4'>
              {resto.menus.map((menu) => (
                <div key={menu.id} className='border rounded p-3 flex gap-3'>
                  <Image
                    src={menu.image}
                    alt={menu.foodName}
                    width={80}
                    height={80}
                    className='rounded'
                  />
                  <div>
                    <p className='font-medium'>{menu.foodName}</p>
                    <p className='text-sm text-gray-500 capitalize'>
                      {menu.type}
                    </p>
                    <p className='font-semibold'>
                      Rp {menu.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* ===== REVIEWS ===== */}
          <section>
            <h2 className='text-xl font-semibold mb-3'>
              Reviews ({resto.totalReviews})
            </h2>

            <div className='space-y-3'>
              {resto.reviews.map((review) => {
                const initial = review.user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase();

                return (
                  <div
                    key={review.id}
                    className='border rounded p-4 flex gap-3'
                  >
                    {/* AVATAR */}
                    {review.user.avatar ? (
                      <Image
                        src={review.user.avatar}
                        alt={review.user.name}
                        width={40}
                        height={40}
                        className='rounded-full object-cover'
                      />
                    ) : (
                      <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600'>
                        {initial}
                      </div>
                    )}

                    {/* CONTENT */}
                    <div className='flex-1'>
                      <div className='flex justify-between items-center'>
                        <p className='font-medium'>{review.user.name}</p>
                        <span className='text-sm'>⭐ {review.star}</span>
                      </div>

                      <p className='text-sm text-gray-700'>{review.comment}</p>

                      <p className='text-xs text-gray-400'>
                        {new Date(review.createdAt).toLocaleDateString(
                          'id-ID',
                          {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          }
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>{' '}
        </>
      )}
    </div>
  );
}
