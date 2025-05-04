import React, { useState, useEffect } from 'react'

export default function SearchBar({ query, onSearch }) {
  const [input, setInput] = useState(query || "")

  useEffect(() => {
    setInput(query)
  }, [query])

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(input)
    }, 400)
    return () => clearTimeout(delayDebounce)
  }, [input, onSearch])

  return (
    <input
      type="text"
      placeholder="Search by country name..."
      className="w-full flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  )
}
