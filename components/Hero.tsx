"use client";

import React, { useState } from "react";
import { FoodData, foods } from "../lib/mockData";
import { FaSearch } from "react-icons/fa";
export default function Hero({ initialFoods }: { initialFoods?: FoodData[] }) {
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">(
    "delivery"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFoods, setFilteredFoods] = useState<FoodData[]>([]);

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();

    if (query === "") {
      setFilteredFoods([]);
      return;
    }

    // Filter the mock data array (use injected initialFoods for tests if provided)
    const dataSource = initialFoods ?? foods;
    const results = dataSource.filter((food) =>
      food.name.toLowerCase().includes(query)
    );

    setFilteredFoods(results);
  };

  return (
    <section className="relative bg-[#ffb30e] text-white py-12 md:py-20 overflow-hidden">
      <div className="food-container">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 items-center">
          {/* Left Side */}
          <div className="space-y-6 md:col-span-1 lg:col-span-2">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Are you starving?
              </h1>
              <p className=" font-mono text-sm md:text-sm text-white opacity-90">
                Within a few clicks, find meals that are accessible near you
              </p>
            </div>

            {/* Search Interface */}
            <div className="bg-white rounded-lg p-4 md:p-6 space-y-4">
              {/* Delivery/Pickup Toggle */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setDeliveryType("delivery")}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-semibold transition-all duration-150 ${
                    deliveryType === "delivery"
                      ? "bg-food-orange-light text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                  <span>Delivery</span>
                </button>

                <button
                  onClick={() => setDeliveryType("pickup")}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-semibold transition-all duration-150 ${
                    deliveryType === "pickup"
                      ? "bg-food-orange-light text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span>Pickup</span>
                </button>
              </div>
              {/* Search Input */}
              <div className="flex space-x-2 items-center">
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200 text-xl" />
                  <input
                    type="text"
                    placeholder="What do you like to eat today?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="food-input w-full text-gray-800 border border-gray-200 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-food-orange-light"
                  />
                </div>

                {/* Button  */}
                <button
                  onClick={handleSearch}
                  className="food-btn flex items-center space-x-2 px-4 bg-food-orange-light text-white rounded-lg"
                >
                  <FaSearch className="text-sm" />
                  <span>Find Meal</span>
                </button>
              </div>
              {/* Search Results */}
              {filteredFoods.length > 0 ? (
                <div className="mt-4 space-y-2">
                  {filteredFoods.map((food) => (
                    <div
                      key={food.id}
                      className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
                    >
                      <span className="text-gray-800 font-semibold">
                        {food.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        ${food.price}
                      </span>
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

          {/* Right Side - positioned image */}
          <div className="hidden md:block ">
   
    <div className="absolute bottom-0 right-4 lg:right-8 z-10 pointer-events-none">
        
        <div className="w-80 h-full lg:w-70">
            <img
                src="/images/pasta.png"
                alt="Delicious food"
                className="w-70 h-full object-cover rounded-full shadow-2xl relative bottom-[-20px]"
                style={{
                    boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
                  }}
            />
        </div>
    </div>
</div>
        </div>
      </div>
    </section>
  );
}
