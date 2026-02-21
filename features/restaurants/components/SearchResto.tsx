'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSearchResto } from '../useSearchResto'

function SafeImage({
  src,
  alt,
}: {
  src: string
  alt: string
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={64}
      height={64}
      className="rounded-md object-cover"
    />
  )
}

export default function SearchResto() {
  const [query, setQuery] = useState('')

  const { data, isLoading, error } =
    useSearchResto({
      q: query,
      page: 1,
      limit: 20,
    })

  const restaurants =
    data?.data.restaurants ?? []

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">
        Search Restaurant
      </h1>

      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Cari restoran..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        className="w-full border rounded-md px-3 py-2"
      />

      {isLoading && <p>Loading...</p>}
      {error && (
        <p className="text-red-500">
          Gagal memuat data
        </p>
      )}

      {!isLoading &&
        restaurants.length === 0 &&
        query && (
          <p>Tidak ada restoran</p>
        )}

      <div className="grid grid-cols-2 gap-4">
        {restaurants.map((resto) => (
          <div
            key={resto.id}
            className="border rounded-lg p-4 space-y-2"
          >
            <SafeImage
              src={resto.logo}
              alt={resto.name}
            />

            <h3 className="font-semibold">
              {resto.name}
            </h3>

            <p className="text-sm text-gray-500">
              ⭐ {resto.star} ·{' '}
              {resto.place}
            </p>

            <p className="text-sm">
              Rp {resto.priceRange.min} – Rp{' '}
              {resto.priceRange.max}
            </p>

            <p className="text-xs text-gray-400">
              {resto.distance} km ·{' '}
              {resto.reviewCount} reviews
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}