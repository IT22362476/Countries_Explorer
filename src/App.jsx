import React, { useEffect, useState } from 'react'
import SearchBar from './components/Searchbar'
import FilterBar from './components/FilterBar'
import CountryCard from './components/CountryCard'
import CountryDetails from './components/CountryDetails'
import { saveSession, loadSession } from './utils/session'

export default function App() {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => {
        setCountries(data)
        setLoading(false)

        const { lastSearch, lastRegion } = loadSession()
        if (lastRegion && lastRegion !== 'All') {
          handleFilter(lastRegion, data)
        } else if (lastSearch) {
          handleSearch(lastSearch, data)
        } else {
          setFiltered(data)
        }
      })
      .catch(err => {
        console.error("Failed to fetch countries", err)
        setLoading(false)
      })
  }, [])

  const handleSearch = async (query) => {
    saveSession({ lastSearch: query })
    if (!query) return setFiltered(countries)
  
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${query}`)
      if (!res.ok) throw new Error("Search failed")
      const data = await res.json()
      setFiltered(data)
    } catch (err) {
      console.error("Failed to search country", err)
      setFiltered([])
    }
  }
  

  const handleFilter = async (region) => {
    saveSession({ lastRegion: region })
  
    if (region === 'All') return setFiltered(countries)
  
    try {
      const res = await fetch(`https://restcountries.com/v3.1/region/${region}`)
      if (!res.ok) throw new Error("Region fetch failed")
      const data = await res.json()
      setFiltered(data)
    } catch (err) {
      console.error("Failed to fetch region", err)
      setFiltered([])
    }
  }
  

  const handleSelectCountry = async (code) => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      const data = await res.json()
      setSelectedCountry(data[0])
    } catch (err) {
      console.error("Failed to fetch country details", err)
    }
  }

  if (loading) return <div className="p-6 text-center">Loading countries...</div>

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">REST Countries Explorer</h1>
      {!selectedCountry && (
        <>
          <SearchBar onSearch={handleSearch} />
          <FilterBar onFilter={handleFilter} />
        </>
      )}
      {selectedCountry ? (
        <CountryDetails country={selectedCountry} onBack={() => setSelectedCountry(null)} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {filtered.map(c => (
            <CountryCard key={c.cca3} country={c} onClick={() => handleSelectCountry(c.cca3)} />
          ))}
        </div>
      )}
    </div>
  )
}
