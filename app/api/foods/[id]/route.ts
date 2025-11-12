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
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newFood = {
      id: Date.now().toString(), // auto-generated
      ...body,
      createdAt: new Date().toISOString(),
    };

    foods.unshift(newFood);

    return NextResponse.json(newFood, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create food' }, { status: 500 });
  }
}
