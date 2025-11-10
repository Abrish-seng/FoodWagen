'use client'

import React, { useState, FormEvent, useEffect } from 'react'
import { Food } from './FoodCard'
import { MealFormData } from './AddMealModal'

interface EditMealModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (id: string, data: MealFormData) => Promise<void>
  food: Food | null
}

export default function EditMealModal({
  isOpen,
  onClose,
  onSubmit,
  food,
}: EditMealModalProps) {
  const [formData, setFormData] = useState<MealFormData>({
    name: '',
    rating: '',
    image: '',
    restaurantName: '',
    restaurantLogo: '',
    restaurantStatus: 'Open',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (food) {
      setFormData({
        name: food.name,
        rating: food.rating.toString(),
        image: food.image,
        restaurantName: food.restaurantName,
        restaurantLogo: food.restaurantLogo,
        restaurantStatus: food.restaurantStatus,
      })
      setErrors({})
    }
  }, [food])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Food Name is required'
    }

    if (!formData.rating.trim()) {
      newErrors.rating = 'Food Rating must be a number'
    } else {
      const rating = parseFloat(formData.rating)
      if (isNaN(rating) || rating < 1 || rating > 5) {
        newErrors.rating = 'Food Rating must be between 1 and 5'
      }
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Food Image URL is required'
    } else {
      try {
        new URL(formData.image)
      } catch {
        newErrors.image = 'Food Image URL is invalid'
      }
    }

    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = 'Restaurant Name is required'
    }

    if (!formData.restaurantLogo.trim()) {
      newErrors.restaurantLogo = 'Restaurant Logo URL is required'
    } else {
      try {
        new URL(formData.restaurantLogo)
      } catch {
        newErrors.restaurantLogo = 'Restaurant Logo URL is invalid'
      }
    }

    if (
      formData.restaurantStatus !== 'Open' &&
      formData.restaurantStatus !== 'Closed'
    ) {
      newErrors.restaurantStatus =
        "Restaurant Status must be 'Open Now' or 'Closed'"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!food || !validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      await onSubmit(food.id, formData)
      onClose()
    } catch (error) {
      console.error('Error updating food:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    // Map input names to state keys
    const nameMap: Record<string, keyof MealFormData> = {
      food_name: 'name',
      food_rating: 'rating',
      food_image: 'image',
      restaurant_name: 'restaurantName',
      restaurant_logo: 'restaurantLogo',
      restaurant_status: 'restaurantStatus',
    }
    const stateKey = nameMap[name] || name
    setFormData((prev) => ({ ...prev, [stateKey]: value }))
    // Clear error when user starts typing
    if (errors[stateKey]) {
      setErrors((prev) => ({ ...prev, [stateKey]: '' }))
    }
  }

  if (!isOpen || !food) return null

  return (
    <div className="food-modal" onClick={onClose}>
      <div
        className="food-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-food-orange mb-6 text-center">
          Edit Meal
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Food Name */}
          <div>
            <label
              htmlFor="edit_food_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Food name
            </label>
            <input
              type="text"
              id="edit_food_name"
              name="food_name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter food name"
              className={`food-input ${errors.name ? 'food-input-error' : ''}`}
              aria-describedby={errors.name ? 'food-name-error' : undefined}
            />
            {errors.name && (
              <p id="food-name-error" className="food-error">
                {errors.name}
              </p>
            )}
          </div>

          {/* Food Rating */}
          <div>
            <label
              htmlFor="edit_food_rating"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Food rating
            </label>
            <input
              type="number"
              id="edit_food_rating"
              name="food_rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Enter food rating (1-5)"
              min="1"
              max="5"
              step="0.1"
              className={`food-input ${errors.rating ? 'food-input-error' : ''}`}
              aria-describedby={errors.rating ? 'food-rating-error' : undefined}
            />
            {errors.rating && (
              <p id="food-rating-error" className="food-error">
                {errors.rating}
              </p>
            )}
          </div>

          {/* Food Image */}
          <div>
            <label
              htmlFor="edit_food_image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Food image (link)
            </label>
            <input
              type="url"
              id="edit_food_image"
              name="food_image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter food image URL"
              className={`food-input ${errors.image ? 'food-input-error' : ''}`}
              aria-describedby={errors.image ? 'food-image-error' : undefined}
            />
            {errors.image && (
              <p id="food-image-error" className="food-error">
                {errors.image}
              </p>
            )}
          </div>

          {/* Restaurant Name */}
          <div>
            <label
              htmlFor="edit_restaurant_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Restaurant name
            </label>
            <input
              type="text"
              id="edit_restaurant_name"
              name="restaurant_name"
              value={formData.restaurantName}
              onChange={handleChange}
              placeholder="Enter restaurant name"
              className={`food-input ${
                errors.restaurantName ? 'food-input-error' : ''
              }`}
              aria-describedby={
                errors.restaurantName ? 'restaurant-name-error' : undefined
              }
            />
            {errors.restaurantName && (
              <p id="restaurant-name-error" className="food-error">
                {errors.restaurantName}
              </p>
            )}
          </div>

          {/* Restaurant Logo */}
          <div>
            <label
              htmlFor="edit_restaurant_logo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Restaurant logo (link)
            </label>
            <input
              type="url"
              id="edit_restaurant_logo"
              name="restaurant_logo"
              value={formData.restaurantLogo}
              onChange={handleChange}
              placeholder="Enter restaurant logo URL"
              className={`food-input ${
                errors.restaurantLogo ? 'food-input-error' : ''
              }`}
              aria-describedby={
                errors.restaurantLogo ? 'restaurant-logo-error' : undefined
              }
            />
            {errors.restaurantLogo && (
              <p id="restaurant-logo-error" className="food-error">
                {errors.restaurantLogo}
              </p>
            )}
          </div>

          {/* Restaurant Status */}
          <div>
            <label
              htmlFor="edit_restaurant_status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Restaurant status (open/close)
            </label>
            <select
              id="edit_restaurant_status"
              name="restaurant_status"
              value={formData.restaurantStatus}
              onChange={handleChange}
              className={`food-input ${
                errors.restaurantStatus ? 'food-input-error' : ''
              }`}
              aria-describedby={
                errors.restaurantStatus ? 'restaurant-status-error' : undefined
              }
            >
              <option value="Open Now">Open Now</option>
              <option value="Closed">Closed</option>
            </select>
            {errors.restaurantStatus && (
              <p id="restaurant-status-error" className="food-error">
                {errors.restaurantStatus}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="food-btn flex-1"
              disabled={isLoading}
              data-test-id="food-edit-submit-btn"
            >
              {isLoading ? 'Updating Food...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="food-btn-secondary flex-1"
              disabled={isLoading}
              data-test-id="food-edit-cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
