'use client'

import React, { useState } from 'react'

interface DeleteMealModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  foodName?: string
}

export default function DeleteMealModal({
  isOpen,
  onClose,
  onConfirm,
  foodName = 'this meal',
}: DeleteMealModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm()
      onClose()
    } catch (error) {
      console.error('Error deleting food:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="food-modal" onClick={onClose}>
      <div
        className="food-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-food-orange mb-4 text-center">
          Delete Meal
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to delete {foodName}? Actions cannot be
          reversed.
        </p>

        <div className="flex space-x-4">
          <button
            onClick={handleConfirm}
            className="food-btn flex-1"
            disabled={isLoading}
            data-test-id="food-delete-confirm-btn"
          >
            {isLoading ? 'Deleting Meal...' : 'Yes'}
          </button>
          <button
            onClick={onClose}
            className="food-btn-secondary flex-1"
            disabled={isLoading}
            data-test-id="food-delete-cancel-btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
