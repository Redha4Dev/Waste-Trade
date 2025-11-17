import SellCard from '@/components/SellCard'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { user } from '@/lib/user'
import React from 'react'
import { Search, SlidersHorizontal } from 'lucide-react' 
import { Button } from '@/components/ui/button' 

export default async function ListingsPage() {
  // const currentUser = await user();
  // console.log("current user :", currentUser);
  let listingData  = [];

  // NOTE: Replace with actual data fetching logic later
  try {
    
    const listingsRes = await fetch('http://localhost:3000/api/product/getAllProducts', {
  method: 'GET',
  headers: { 
    'Content-type': 'application/json',
  "Cookie": `jwt` },
});
    
    listingData = await listingsRes.json()
    listingData = listingData.products
    console.log(listingData);
    
  } catch (error) {
    console.log(error);
    
  }
  const mockListings = [
    { title: 'PET Bottles', description: 'Any type empty plastic bottles ex: water bottles, energy drink bottles, juice bottles...', date: '10/10/2023', price: '1000', quantity: 30000, image: '/recycling-illustration.png', id: '1' },
    { title: 'HDPE Containers', description: 'Natural and colored HDPE (high-density polyethylene) containers with or without a CRV label.', date: '10/10/2023', price: '4000', quantity: 30000, image: '/recycling-illustration.png', id: '33' },
    { title: 'Plastic Bags', description: 'Flexible containers made of thin plastic film or nonwoven fabric. Ideal for recycling.', date: '10/10/2023', price: '1000', quantity: 30000, image: '/recycling-illustration.png', id: '22' },
    { title: 'Aluminum Cans', description: 'Clean, crushed aluminum cans from beverages and food products.', date: '11/05/2023', price: '2500', quantity: 15000, image: '/recycling-illustration.png', id: '44' },
  ];

  return (
    <div className='w-full max-w-7xl mx-auto p-4 sm:p-6'>
      <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-100'>Your Active Listings </h1>
      <Separator className='my-6 bg-gray-200 dark:bg-gray-700' />

      {/* note for me:  redha you have to impelment the search bar and the filter button */}
      <div className='mb-8 flex flex-col sm:flex-row gap-4 items-center'>
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input 
            placeholder='Search waste type, location, or listing ID...' 
            className='w-full pl-10 h-11 border-gray-300 dark:border-gray-600 focus:border-green-500' 
          />
        </div>
        
        {/* Filter Button (Placeholder for Shadcn Select/DropdownMenu) */}
        <Button 
          variant="outline" 
          className='flex items-center gap-2 h-11 px-4 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
        >
          <SlidersHorizontal className='w-4 h-4' />
          Filter
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8'>
        {listingData.map((listing) => (
          <SellCard 
            key={listing.id}
            title={listing.title}
            description={listing.description}
            date={listing.date || Date.now()}
            price={listing.price}
            quantity={listing.quantity}
            image={listing.image || '/recycling-illustration.png'}
            id={listing.id}
          />
        ))}
      </div>
    </div>
  )
}