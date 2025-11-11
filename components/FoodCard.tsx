"use client";

import React, { useState, useEffect, useRef } from "react";

export interface Food {
  id: string;
  name: string;
  price: string;
  rating: number;
  image: string;
  restaurantName: string;
  restaurantLogo: string;
  restaurantStatus: "Open" | "Closed";
}

interface FoodCardProps {
  food: Food;
  onEdit: (food: Food) => void;
  onDelete: (foodId: string) => void;
}

export default function FoodCard({ food, onEdit, onDelete }: FoodCardProps) {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Close options menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  return (
    <div className="flex justify-center items-center bg-gray-50">
      <article className="food-card food-card-hover ">
        {/* Food Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
          />
          {/* Price Tag */}
          <div className="absolute top-2 left-2 bg-food-orange text-white px-3 py-1 rounded-lg font-semibold">
            <span className="food-price">${food.price}</span>
          </div>
        </div>

        {/* Food Details */}
        <div className="p-4 space-y-3">
          {/* Restaurant Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2  w-[100%]">
              <img
                src={food.restaurantLogo}
                alt={food.restaurantName}
                className="food-restaurant-logo w-8 h-8 rounded object-cover"
              />
              <div className="flex-1">
                <span className="food-restaurant-name text-sm  font-black text-gray-900">
                  {food.name}
                </span>
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="food-rating text-sm font-semibold text-gray-700">
                    {food.rating}
                  </span>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                  data-test-id="food-options-btn"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>

                {showOptions && (
                  <div className="absolute right-0 mt-0 w-25 bg-white rounded-lg shadow-lg py-2 z-10">
                    <button
                      onClick={() => {
                        setShowOptions(false);
                        onEdit(food);
                      }}
                      className="w-full text-left px-4 py-1 hover:bg-gray-100 text-sm"
                      data-test-id="food-edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setShowOptions(false);
                        onDelete(food.id);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                      data-test-id="food-delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Rating and Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold border 
        ${
          food.restaurantStatus === "Open"
            ? "bg-[#97b93c] border-[#97b93c] text-white"
            : "bg-[#ffd2c2] border-[#ffd2c2] text-[#ff6b35]"
        }`}
              >
                {food.restaurantStatus}
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
