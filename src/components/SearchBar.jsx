import React from "react"

export default function SearchBar({ onSearch }) {
    return (
      <div className="text-center">
        <input
          type="text"
          placeholder="Search for a country..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full max-w-md p-2 border rounded shadow-sm"
        />
      </div>
    )
  }
  