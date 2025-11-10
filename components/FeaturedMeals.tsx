'use client'

import React, { useState } from 'react'
import FoodCard, { Food } from './FoodCard'

interface FeaturedMealsProps {
  foods: Food[]
  onEdit: (food: Food) => void
  onDelete: (foodId: string) => void
  onLoadMore: () => void
  hasMore: boolean
  isLoading?: boolean
}

export default function FeaturedMeals({
  foods,
  onEdit,
  onDelete,
  onLoadMore,
  hasMore,
  isLoading = false,
}: FeaturedMealsProps) {
  if (foods.length === 0 && !isLoading) {
    return (
      <section className="py-12">
        <div className="food-container">
          <div className="empty-state-message">
            <h2 className="text-2xl font-bold mb-2">No meals available</h2>
            <p>Be the first to add a meal!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="food-container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Featured Meals
        </h2>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8 gap-x-2 gap-y-6 ">
          {foods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={onLoadMore}
              className="food-btn"
              disabled={isLoading}
              data-test-id="food-load-more-btn"
            >
              {isLoading ? 'Loading...' : 'Load more >'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
