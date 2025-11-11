'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FeaturedMeals from '@/components/FeaturedMeals'
import Footer from '@/components/Footer'
import AddMealModal from '@/components/AddMealModal'
import EditMealModal from '@/components/EditMealModal'
import DeleteMealModal from '@/components/DeleteMealModal'
import { Food } from '@/components/FoodCard'
import { MealFormData } from '@/components/AddMealModal'
import axios from 'axios'

export default function Home() {
  const [foods, setFoods] = useState<Food[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [deleteFoodId, setDeleteFoodId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  const fetchFoods = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await axios.get('/api/foods', {
        params: { page: 1, limit: 8 },
      })
      setFoods(response.data.foods)
      setHasMore(response.data.hasMore)
    } catch (error) {
      console.error('Error fetching foods:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Fetch foods on component mount
  useEffect(() => {
    fetchFoods()
  }, [fetchFoods])

  const handleLoadMore = async () => {
    try {
      setIsLoading(true)
      const nextPage = page + 1
      const response = await axios.get('/api/foods', {
        params: { page: nextPage, limit: 8 },
      })
      setFoods((prev) => [...prev, ...response.data.foods])
      setHasMore(response.data.hasMore)
      setPage(nextPage)
    } catch (error) {
      console.error('Error loading more foods:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddMeal = async (data: MealFormData) => {
    try {
      const response = await axios.post('/api/foods', {
        name: data.name,
        price: '0.00', 
        rating: parseFloat(data.rating),
        image: data.image,
        restaurantName: data.restaurantName,
        restaurantLogo: data.restaurantLogo,
        restaurantStatus: data.restaurantStatus,
      })
      setFoods((prev) => [response.data, ...prev])
      setIsAddModalOpen(false)
    } catch (error) {
      console.error('Error adding food:', error)
      throw error
    }
  }

  const handleEditMeal = async (id: string, data: MealFormData) => {
    try {
      const response = await axios.put(`/api/foods/${id}`, {
        name: data.name,
        rating: parseFloat(data.rating),
        image: data.image,
        restaurantName: data.restaurantName,
        restaurantLogo: data.restaurantLogo,
        restaurantStatus: data.restaurantStatus,
      })
      setFoods((prev) =>
        prev.map((food) => (food.id === id ? response.data : food))
      )
      setIsEditModalOpen(false)
      setSelectedFood(null)
    } catch (error) {
      console.error('Error updating food:', error)
      throw error
    }
  }

  const handleDeleteMeal = async () => {
    if (!deleteFoodId) return

    try {
      await axios.delete(`/api/foods/${deleteFoodId}`)
      setFoods((prev) => prev.filter((food) => food.id !== deleteFoodId))
      setIsDeleteModalOpen(false)
      setDeleteFoodId(null)
    } catch (error) {
      console.error('Error deleting food:', error)
      throw error
    }
  }

  const openEditModal = (food: Food) => {
    setSelectedFood(food)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (foodId: string) => {
    setDeleteFoodId(foodId)
    const food = foods.find((f) => f.id === foodId)
    setSelectedFood(food || null)
    setIsDeleteModalOpen(true)
  }

  return (
    <main className="min-h-screen">
      <Navbar onAddMealClick={() => setIsAddModalOpen(true)} />
      <Hero />
      <FeaturedMeals
        foods={foods}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        isLoading={isLoading}
      />
      <Footer />

      {/* Modals */}
      <AddMealModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddMeal}
      />

      <EditMealModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedFood(null)
        }}
        onSubmit={handleEditMeal}
        food={selectedFood}
      />

      <DeleteMealModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setDeleteFoodId(null)
          setSelectedFood(null)
        }}
        onConfirm={handleDeleteMeal}
        foodName={selectedFood?.name}
      />
    </main>
  )
}
