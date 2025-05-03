
const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"]

export default function FilterBar({ onFilter }) {
  return (
    <div className="flex justify-center flex-wrap gap-2 mt-4">
      {regions.map(region => (
        <button
          key={region}
          onClick={() => onFilter(region)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          {region}
        </button>
      ))}
    </div>
  )
}
