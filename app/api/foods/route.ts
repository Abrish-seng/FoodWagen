import { NextRequest, NextResponse } from 'next/server'
import { foods } from '@/lib/mockData'



// POST /api/foods
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body)
    const newFood = {
      id: Date.now().toString(), 
      ...body,
      createdAt: new Date().toISOString(),
    };

    foods.unshift(newFood);

    return NextResponse.json(newFood, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create food' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json(foods);
}
