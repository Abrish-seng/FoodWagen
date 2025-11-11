'use client'

import React from 'react'
import burger from '../public/images/burger.png'
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
            <div className="w-10 h-10  rounded-lg flex items-center justify-center">
              <img
                className="w-6 h-6 text-white"
                src={burger.src}
                alt="FoodWagen Logo"
                
              />
                
              
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
