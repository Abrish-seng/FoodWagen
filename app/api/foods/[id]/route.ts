import { NextRequest, NextResponse } from "next/server";
import { foods } from "@/lib/mockData";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // <-- await the params
  const food = foods.find((f) => f.id === id);

  if (!food) {
    return NextResponse.json({ error: "Food not found" }, { status: 404 });
  }

  return NextResponse.json(food);
}

// PUT /api/foods/[id]
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const index = foods.findIndex((f) => f.id === id)

    if (index === -1) {
      return NextResponse.json({ error: 'Food not found' }, { status: 404 })
    }

    foods[index] = {
      ...foods[index],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(foods[index])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update food' }, { status: 500 })
  }
}

// DELETE /api/foods/[id]
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const index = foods.findIndex((f) => f.id === id)

    if (index === -1) {
      return NextResponse.json({ error: 'Food not found' }, { status: 404 })
    }

    foods.splice(index, 1)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete food' }, { status: 500 })
  }
}
