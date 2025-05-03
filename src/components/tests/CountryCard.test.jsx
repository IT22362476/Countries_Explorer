import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CountryCard from '../CountryCard'

const mockCountry = {
  cca3: 'IND',
  name: { common: 'India' },
  population: 1393409038,
  region: 'Asia',
  capital: ['New Delhi'],
  flags: { svg: 'https://flagcdn.com/in.svg' }
}

describe('CountryCard', () => {
  it('renders country information', () => {
    render(<CountryCard country={mockCountry} onClick={() => {}} />)
    expect(screen.getByText(/India/i)).toBeInTheDocument()
    expect(screen.getByText(/Asia/i)).toBeInTheDocument()
    expect(screen.getByText(/New Delhi/i)).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', mockCountry.flags.svg)
  })

  it('calls onClick when clicked', () => {
    const mockClick = jest.fn()
    render(<CountryCard country={mockCountry} onClick={mockClick} />)

    const card = screen.getByText(/India/i).closest('div')
    fireEvent.click(card)

    expect(mockClick).toHaveBeenCalled()
  })
})
