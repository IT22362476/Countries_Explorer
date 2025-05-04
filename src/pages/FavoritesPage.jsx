import React from 'react'
import CountryCard from '../components/CountryCard'

export default function FavoritesPage({ favourites, onSelect }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">❤️ Your Favourites</h2>
      {favourites.length === 0 ? (
        <p className="text-gray-500">You haven’t added any favourite countries yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {favourites.map(country => (
            <CountryCard
              key={country.cca3}
              country={country}
              onClick={() => onSelect(country.cca3)}
              onToggleFavourite={() => {}}
              isFavourite={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}
