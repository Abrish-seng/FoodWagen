import { NextRequest, NextResponse } from 'next/server'
import { foods } from '@/lib/mockData'

// GET /api/foods
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '8')

  const start = (page - 1) * limit
  const end = start + limit
  const paginatedFoods = foods.slice(start, end)
  const hasMore = end < foods.length

  return NextResponse.json({
    foods: paginatedFoods,
    hasMore,
    total: foods.length,
  })
}

// POST /api/foods
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newFood = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
    }
    foods.unshift(newFood)
    return NextResponse.json(newFood, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create food' },
      { status: 500 }
    )
  }
}
