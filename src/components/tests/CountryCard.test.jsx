// tests/CountryCard.test.jsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CountryCard from '../CountryCard'

const mockCountry = {
  name: { common: 'Japan' },
  region: 'Asia',
  capital: ['Tokyo'],
  flags: { svg: 'https://restcountries.com/data/jpn.svg' },
}

describe('CountryCard', () => {
  it('renders country details correctly', () => {
    render(
      <CountryCard
        country={mockCountry}
        onClick={() => {}}
        onToggleFavourite={() => {}}
        isFavourite={false}
      />
    )

    expect(screen.getByText('Japan')).toBeInTheDocument()
    expect(screen.getByText('Asia')).toBeInTheDocument()
    expect(screen.getByText(/Capital: Tokyo/)).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', mockCountry.flags.svg)
  })

  it('handles image and title clicks with onClick', () => {
    const mockClick = jest.fn()

    render(
      <CountryCard
        country={mockCountry}
        onClick={mockClick}
        onToggleFavourite={() => {}}
        isFavourite={false}
      />
    )

    fireEvent.click(screen.getByRole('img'))
    fireEvent.click(screen.getByText('Japan'))

    expect(mockClick).toHaveBeenCalledTimes(2)
  })

  it('calls onToggleFavourite when heart icon is clicked', () => {
    const mockToggleFavourite = jest.fn()

    render(
      <CountryCard
        country={mockCountry}
        onClick={() => {}}
        onToggleFavourite={mockToggleFavourite}
        isFavourite={false}
      />
    )

    const heartButton = screen.getByRole('button')
    fireEvent.click(heartButton)

    expect(mockToggleFavourite).toHaveBeenCalledTimes(1)
  })

  it('displays HeartOff icon when isFavourite is true', () => {
    render(
      <CountryCard
        country={mockCountry}
        onClick={() => {}}
        onToggleFavourite={() => {}}
        isFavourite={true}
      />
    )

    expect(screen.getByTestId('lucide-icon')).toBeInTheDocument()
  })

  it('shows "N/A" when capital is missing', () => {
    const countryWithoutCapital = {
      ...mockCountry,
      capital: undefined,
    }

    render(
      <CountryCard
        country={countryWithoutCapital}
        onClick={() => {}}
        onToggleFavourite={() => {}}
        isFavourite={false}
      />
    )

    expect(screen.getByText(/Capital: N\/A/)).toBeInTheDocument()
  })
})
