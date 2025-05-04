// tests/SearchBar.test.jsx
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchBar from '../SearchBar'

describe('SearchBar', () => {
  it('renders the input field with correct placeholder', () => {
    render(<SearchBar query="" onSearch={() => {}} />)
    const input = screen.getByPlaceholderText(/search by country name/i)
    expect(input).toBeInTheDocument()
  })

  it('initializes input with provided query prop', () => {
    render(<SearchBar query="Sri Lanka" onSearch={() => {}} />)
    const input = screen.getByDisplayValue(/sri lanka/i)
    expect(input).toBeInTheDocument()
  })

  it('calls onSearch with debounced input', async () => {
    jest.useFakeTimers()
    const mockSearch = jest.fn()
    render(<SearchBar query="" onSearch={mockSearch} />)

    const input = screen.getByPlaceholderText(/search by country name/i)
    fireEvent.change(input, { target: { value: 'India' } })

    jest.advanceTimersByTime(400)

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('India')
    })

    jest.useRealTimers()
  })
})
