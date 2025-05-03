import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '../Searchbar'

describe('SearchBar', () => {
  it('renders the input field', () => {
    render(<SearchBar onSearch={() => {}} />)
    const input = screen.getByPlaceholderText(/search for a country/i)
    expect(input).toBeInTheDocument()
  })

  it('calls onSearch with typed value', () => {
    const mockSearch = jest.fn()
    render(<SearchBar onSearch={mockSearch} />)

    const input = screen.getByPlaceholderText(/search for a country/i)
    fireEvent.change(input, { target: { value: 'India' } })

    expect(mockSearch).toHaveBeenCalledWith('India')
  })
})
