'use client'

import React from 'react'

interface NavbarProps {
  onAddMealClick: () => void
}

export default function Navbar({ onAddMealClick }: NavbarProps) {
  return (
    <header className="bg-white shadow-sm">
      <nav className="food-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-food-orange rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold text-food-orange">FoodWagen</span>
          </div>

          {/* Add Meal Button */}
          <button
            onClick={onAddMealClick}
            className="food-btn"
            data-test-id="food-add-meal-btn"
          >
            Add Meal
          </button>
        </div>
      </nav>
    </header>
  )
}
