// components/CountryCard.jsx

import React from 'react'
import { Heart, HeartOff } from 'lucide-react'

export default function CountryCard({ country, onClick, onToggleFavourite, isFavourite }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer relative">
      <img
        src={country.flags.svg}
        alt={country.name.common}
        className="w-full h-32 object-cover rounded-md"
        onClick={onClick}
      />
      <h2 className="mt-2 text-lg font-semibold text-gray-700" onClick={onClick}>
        {country.name.common}
      </h2>
      <p className="text-sm text-gray-500" onClick={onClick}>
        {country.region}
      </p>
      <p className="text-sm text-gray-500">
        Capital: {country.capital?.[0] ?? 'N/A'}
      </p>

      <button
        className="absolute top-2 right-2 text-red-500"
        onClick={(e) => {
          e.stopPropagation()
          onToggleFavourite()
        }}
      >
        {isFavourite ? (
          <Heart data-testid="lucide-icon" size={18} />
        ) : (
          <HeartOff data-testid="lucide-icon" size={18} />
        )}
      </button>
    </div>
  )
}