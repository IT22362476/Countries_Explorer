// App.jsx
import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import CountryCard from './components/CountryCard'
import CountryDetails from './components/CountryDetails'
import FavoritesPage from './pages/FavoritesPage'
import { saveSession, loadSession } from './utils/session'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'

export default function App() {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("All")
  const [favourites, setFavourites] = useState(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"))
    if (!user) return []
    const saved = localStorage.getItem(`favourites_${user.username}`) // use email if preferred
    return saved ? JSON.parse(saved) : []
  })


  const navigate = useNavigate()
  const location = useLocation()

  const updateFavourites = (country) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"))
    if (!user) return

    const key = `favourites_${user.username}`
    const exists = favourites.some(fav => fav.cca3 === country.cca3)
    const updated = exists
      ? favourites.filter(fav => fav.cca3 !== country.cca3)
      : [...favourites, country]

    setFavourites(updated)
    localStorage.setItem(key, JSON.stringify(updated))
  }

  const handleLogin = () => {
    navigate('/') // or wherever you want to go after login
  }
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => {
        setCountries(data)
        setLoading(false)

        const { lastSearch, lastRegion } = loadSession()
        setSearchQuery(lastSearch)
        setSelectedRegion(lastRegion)

        if (lastSearch) {
          const matched = data.filter(c =>
            c.name.common.toLowerCase().includes(lastSearch.toLowerCase())
          )
          setFiltered(matched)
        } else if (lastRegion && lastRegion !== 'All') {
          const matched = data.filter(c => c.region === lastRegion)
          setFiltered(matched)
        } else {
          setFiltered(data)
        }
      })
      .catch(err => {
        console.error("Failed to fetch countries", err)
        setLoading(false)
      })
  }, [])

  const handleSearch = (query) => {
    setSearchQuery(query)
    saveSession({ lastSearch: query })

    if (!query) {
      if (selectedRegion === "All") return setFiltered(countries)
      return setFiltered(countries.filter(c => c.region === selectedRegion))
    }

    const matched = countries.filter(c =>
      c.name.common.toLowerCase().includes(query.toLowerCase()) &&
      (selectedRegion === "All" || c.region === selectedRegion)
    )

    setFiltered(matched)
  }

  const handleFilter = (region) => {
    setSelectedRegion(region)
    saveSession({ lastRegion: region })

    if (region === "All" && !searchQuery) return setFiltered(countries)

    const matched = countries.filter(c =>
      (region === "All" || c.region === region) &&
      c.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    )

    setFiltered(matched)
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
    <div className="bg-gray-100 min-h-screen">
      {location.pathname !== '/login' && location.pathname !== '/signup' && (
        <header className="bg-white shadow-md sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1
              className="text-2xl font-bold text-indigo-600 cursor-pointer"
              onClick={() => navigate('/')}
            >
              🌍 Countries Explorer
            </h1>
            <div className="space-x-4">
              <Link to="/favourites" className="text-indigo-600 hover:underline">
                Favourites
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("loggedInUser")
                  navigate("/login")
                  setFavourites([]) // clear favourites on logout

                }}
                className="text-sm text-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </header>
      )}

      <main className="p-4 max-w-7xl mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              selectedCountry ? (
                <CountryDetails country={selectedCountry} onBack={() => setSelectedCountry(null)} />
              ) : (
                <>
                  <div className="bg-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row sm:items-center gap-4">
                    <SearchBar query={searchQuery} onSearch={handleSearch} />
                    <FilterBar region={selectedRegion} onFilter={handleFilter} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    {filtered.map(c => (
                      <CountryCard
                        key={c.cca3}
                        country={c}
                        onClick={() => handleSelectCountry(c.cca3)}
                        onToggleFavourite={() => updateFavourites(c)}
                        isFavourite={favourites.some(fav => fav.cca3 === c.cca3)}
                      />
                    ))}
                  </div>
                </>
              )
            }
          />
          <Route
            path="/favourites"
            element={
              <FavoritesPage
                favourites={favourites}
                onSelect={handleSelectCountry}
              />
            }
          />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUpPage />} />

        </Routes>
      </main>
    </div>
  )
}
