import { NextRequest, NextResponse } from 'next/server'
import { foods } from '@/lib/mockData'

// PUT /api/foods/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const index = foods.findIndex((f) => f.id === id)

    if (index === -1) {
      return NextResponse.json({ error: 'Food not found' }, { status: 404 })
    }

    foods[index] = {
      ...foods[index],
      name: body.name,
      rating: body.rating,
      image: body.image,
      restaurantName: body.restaurantName,
      restaurantLogo: body.restaurantLogo,
      restaurantStatus: body.restaurantStatus,
      updatedAt: new Date().toISOString(),
    }
    return NextResponse.json(foods[index])
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update food' },
      { status: 500 }
    )
  }
}

// DELETE /api/foods/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const index = foods.findIndex((f) => f.id === id)

    if (index === -1) {
      return NextResponse.json({ error: 'Food not found' }, { status: 404 })
    }

    foods.splice(index, 1)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete food' },
      { status: 500 }
    )
  }
}

