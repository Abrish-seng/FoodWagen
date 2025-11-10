'use client'

import React, { useState } from 'react'
import { foods, FoodData } from '../lib/mockData'

export default function Hero() {
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredFoods, setFilteredFoods] = useState<FoodData[]>([])

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase()

    if (query === '') {
      setFilteredFoods([])
      return
    }

    // Filter mock data
    const results = foods.filter(food =>
      food.name.toLowerCase().includes(query)
    )

    setFilteredFoods(results)
  }

  return (
    <section className="bg-food-orange text-white py-12 md:py-20">
      <div className="food-container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Are you starving?</h1>
              <p className="text-lg md:text-xl text-white opacity-90">
                Within a few clicks, find meals that are accessible near you
              </p>
            </div>

            {/* Search Interface */}
            <div className="bg-white rounded-lg p-4 md:p-6 space-y-4">
              {/* Delivery/Pickup Toggle */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setDeliveryType('delivery')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-semibold transition-all duration-150 ${
                    deliveryType === 'delivery'
                      ? 'bg-food-orange-light text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Delivery
                </button>
                <button
                  onClick={() => setDeliveryType('pickup')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-semibold transition-all duration-150 ${
                    deliveryType === 'pickup'
                      ? 'bg-food-orange-light text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Pickup
                </button>
              </div>

              {/* Search Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="What do you like to eat today?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="food-input flex-1 text-gray-800 border border-gray-200 rounded-lg px-3 py-2"
                />
                <button
                  onClick={handleSearch}
                  className="food-btn px-6 bg-food-orange-light text-white rounded-lg"
                >
                  Find Meal
                </button>
              </div>

              {/* Search Results */}
              {filteredFoods.length > 0 ? (
                <div className="mt-4 space-y-2">
                  {filteredFoods.map(food => (
                    <div
                      key={food.id}
                      className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
                    >
                      <span className="text-gray-800 font-semibold">{food.name}</span>
                      <span className="text-sm text-gray-500">${food.price}</span>
                    </div>
                  ))}
                </div>
              ) : (
                searchQuery && (
                  <p className="text-gray-700 mt-2">No meals found.</p>
                )
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="w-full h-96 bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop"
                  alt="Delicious food"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
