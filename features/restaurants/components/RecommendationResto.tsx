'use client';

import Image from 'next/image';
import { useRecommendationRestaurant } from '../useRecommendationRestaurant';

function SafeImage({ src, alt }: { src: string; alt: string }) {
  const allowedDomains = ['res.cloudinary.com', 'logos-world.net'];

  const isAllowed = allowedDomains.some((d) => src.includes(d));

  if (!isAllowed) {
    return (
      <Image
        src={src}
        alt={alt}
        className='w-16 h-16 rounded-md object-cover'
      />
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

export default function RecommendationResto() {
  const { data, isLoading, error } = useRecommendationRestaurant();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Gagal memuat data</p>;

  const recommendations = data?.data.recommendations ?? [];

  if (recommendations.length === 0) {
    return <p>Tidak ada rekomendasi restoran</p>;
  }

  return (
    <div className='grid grid-cols-2 gap-4'>
      <h1>Recommendation Resto</h1>
      {recommendations.map((resto) => (
        <div key={resto.id} className='border rounded-lg p-4 space-y-2'>
          <SafeImage src={resto.logo} alt={resto.name} />

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
  );
}
