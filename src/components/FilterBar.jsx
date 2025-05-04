import React from 'react'

const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

export default function FilterBar({ region, onFilter }) {
  return (
    <select
      value={region}
      onChange={(e) => onFilter(e.target.value)}
      className="w-full sm:w-48 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {regions.map(r => (
        <option key={r} value={r}>{r}</option>
      ))}
    </select>
  )
}
