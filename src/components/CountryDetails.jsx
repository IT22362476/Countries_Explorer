export default function CountryDetails({ country, onBack }) {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <button onClick={onBack} className="text-blue-500 underline mb-4">← Back</button>
      <img src={country.flags.svg} alt={country.name.common} className="w-full h-60 object-cover rounded mb-4" />
      <h2 className="text-2xl font-bold mb-2">{country.name.common}</h2>
      <p><strong>Official Name:</strong> {country.name.official}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Subregion:</strong> {country.subregion}</p>
      <p><strong>Capital:</strong> {country.capital?.[0]}</p>
      <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
    </div>
  )
}