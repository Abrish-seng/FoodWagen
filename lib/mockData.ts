// Shared mock data store for API routes
import BowLasagna from '../public/images/Bow lasagna.png'
export interface FoodData {
  id: string
  name: string
  price: string
  rating: number
  image: string
  restaurantName: string
  restaurantLogo: string
  restaurantStatus: 'Open' | 'Closed'
  createdAt?: string
  updatedAt?: string
}

export let foods: FoodData[] = [
  {
    id: '1',
    name: 'Bow Lasagna',
    price: '2.99',
    rating: 4.6,
    image: '/images/Bow lasagna.png',
    restaurantName: 'Subway',
    restaurantLogo: '/images/lasagna logo.png',
    restaurantStatus: 'Closed',
  },
  {
    id: '2',
    name: 'Mixed Avocado Sm',
    price: '5.99',
    rating: 4.0,
    image: '/images/Mixed Avocado Sm.png',
    restaurantName: 'PIZZA PINO RISTORANTE',
    restaurantLogo: '/images/mixed avocado logo.png',
    restaurantStatus: 'Closed',
  },
  {
    id: '3',
    name: 'Pancake',
    price: '3.99',
    rating: 5.0,
    image: '/images/Pancake.png',
    restaurantName: "DUNKIN' DONUTS",
    restaurantLogo: '/images/pancake logo.png',
    restaurantStatus: 'Open',
  },
  {
    id: '4',
    name: 'Cupcake',
    price: '111.99',
    rating: 5.0,
    image: '/images/Capcake.png',
    restaurantName: 'Subway',
    restaurantLogo: '/images/capcake logo.png',
    restaurantStatus: 'Open',
  },
  {
    id: '5',
    name: 'Creamy Stake',
    price: '12.99',
    rating: 4.5,
    image: '/images/Creamy Stake.png',
    restaurantName: 'Ruby Tuesday',
    restaurantLogo: '/images/creamy stake logo.png',
    restaurantStatus: 'Open',
  },
  {
    id: '6',
    name: 'Stake with Potatos',
    price: '15.99',
    rating: 5.0,
    image: '/images/Stake with Potatos.png',
    restaurantName: 'KFC',
    restaurantLogo: '/images/potato logo.png',
    restaurantStatus: 'Open',
  },
  {
    id: '7',
    name: 'Indian Spicy Soup',
    price: '9.99',
    rating: 4.5,
    image: '/images/Indian spaciy soap.png',
    restaurantName: 'Spice Kitchen',
    restaurantLogo: '/images/indian spacy logo.png',
    restaurantStatus: 'Open',
  },
  {
    id: '8',
    name: 'Stake Omlet',
    price: '11.99',
    rating: 4.9,
    image: '/images/Stake Olmlet.png',
    restaurantName: 'Taco Bell',
    restaurantLogo: '/images/stake olmet logo.png',
    restaurantStatus: 'Open',
  },
  {
    id: '9',
    name: 'Bow Lasagna',
    price: '2.99',
    rating: 4.6,
    image: '/images/Bow lasagna.png',
    restaurantName: 'Subway',
    restaurantLogo: '/images/lasagna logo.png',
    restaurantStatus: 'Closed',
  },
  {
    id: '10',
    name: 'Mixed Avocado Sm',
    price: '5.99',
    rating: 4.0,
    image: '/images/Mixed Avocado Sm.png',
    restaurantName: 'PIZZA PINO RISTORANTE',
    restaurantLogo: '/images/mixed avocado logo.png',
    restaurantStatus: 'Closed',
  },
  {
    id: '11',
    name: 'Pancake',
    price: '3.99',
    rating: 5.0,
    image: '/images/Pancake.png',
    restaurantName: "DUNKIN' DONUTS",
    restaurantLogo: '/images/pancake logo.png',
    restaurantStatus: 'Open',
  },
  {
    id: '12',
    name: 'Abrhaley special',
    price: '1.99',
    rating: 5.0,
    image: '/images/Capcake.png',
    restaurantName: 'Subway',
    restaurantLogo: '/images/capcake logo.png',
    restaurantStatus: 'Open',
  },
]
