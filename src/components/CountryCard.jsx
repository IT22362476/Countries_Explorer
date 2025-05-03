import React from 'react'
export default function CountryCard({ country, onClick }) {
    return (
      <div
        onClick={onClick}
        className="cursor-pointer bg-white p-4 rounded shadow hover:shadow-lg"
      >
        <img src={country.flags.svg} alt={country.name.common} className="w-full h-40 object-cover mb-2 rounded" />
        <h2 className="text-xl font-semibold">{country.name.common}</h2>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Capital:</strong> {country.capital?.[0]}</p>
      </div>
    )
  }