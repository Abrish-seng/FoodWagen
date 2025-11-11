import { GET } from '../app/api/foods/route'

test('GET returns paginated foods', async () => {
  const req = { nextUrl: new URL('http://localhost/api/foods?page=1&limit=2') } as any
  const res = await GET(req)
  // NextResponse.json returns a Response-like object
  const data = await (res as any).json()
  expect(data).toHaveProperty('foods')
  expect(Array.isArray(data.foods)).toBe(true)
  expect(data.foods.length).toBeLessThanOrEqual(2)
  expect(data).toHaveProperty('total')
})
