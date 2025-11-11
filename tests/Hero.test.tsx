import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Hero from '../components/Hero'
import type { FoodData } from '../lib/mockData'

const sampleFoods: FoodData[] = [
  {
    id: 't1',
    name: 'Pancake',
    price: '3.99',
    rating: 5,
    image: '',
    restaurantName: 'Test',
    restaurantLogo: '',
    restaurantStatus: 'Open',
  },
  {
    id: 't2',
    name: 'Cupcake',
    price: '1.99',
    rating: 4,
    image: '',
    restaurantName: 'Test',
    restaurantLogo: '',
    restaurantStatus: 'Open',
  },
]

describe('Hero component', () => {
  test('renders heading and input', () => {
    render(<Hero initialFoods={sampleFoods} />)
    expect(screen.getByText(/Are you starving\?/i)).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText(/What do you like to eat today\?/i)
    ).toBeInTheDocument()
  })

  test('search interaction shows matching result', async () => {
    render(<Hero initialFoods={sampleFoods} />)
    const user = userEvent.setup()
    const input = screen.getByPlaceholderText(/What do you like to eat today\?/i)
    await user.type(input, 'pancake')
    const btn = screen.getByRole('button', { name: /Find Meal/i })
    await user.click(btn)
    // Should show Pancake result
    expect(await screen.findByText(/Pancake/i)).toBeInTheDocument()
    expect(screen.getByText(/\$3.99/)).toBeInTheDocument()
  })
})
