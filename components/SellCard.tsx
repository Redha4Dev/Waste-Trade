import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image' // Added Next.js Image component
import { Package, Tag, CalendarDays } from 'lucide-react' // Added icons

interface SellCardType {
    title: string,
    image: string, // Use a proper image path
    date: string,
    price: string, // Currency implied
    description: string,
    quantity: number, // Assuming 'grammes' for now
    id: string
}

const SellCard = ({title, image, date, price, description, quantity, id} : SellCardType ) => {
  return (
    // Card Container: Clean white background, subtle shadow, rounded corners, slight hover effect
    <div className='p-4 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col rounded-xl overflow-hidden'>
        
        {/* Image Placeholder */}
        <div className='relative w-full h-[180px] mb-3 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800'>
            {/* Using Next Image for better performance. Fill layout is often best for cards. */}
            <Image 
                src={image} // Ensure this path is valid, e.g., in your public folder
                alt={title}
                layout="fill"
                objectFit="cover"
                className='transition-transform duration-300 hover:scale-[1.02]'
            />
        </div>
        
        {/* Content */}
        <div className='flex flex-col flex-grow gap-2'>
            <h1 className='text-xl font-bold text-gray-900 dark:text-white line-clamp-2'>{title}</h1>
            
            {/* Description is limited for a clean look */}
            <p className='text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-2'>{description}</p>
        </div>

        {/* Key Details (Pills/Badges) */}
        <div className='flex flex-wrap gap-2 text-sm mb-4'>
            {/* Quantity */}
            <div className='flex items-center gap-1 px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300 rounded-full font-medium'>
                <Package className='w-4 h-4'/>
                <span className='whitespace-nowrap'>{quantity.toLocaleString()} g</span>
            </div>
            
            {/* Date */}
            <div className='flex items-center gap-1 px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full'>
                <CalendarDays className='w-4 h-4'/>
                <span>{date}</span>
            </div>
        </div>

        {/* Price and Action */}
        <div className='flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-800'>
            <div className='flex items-center gap-1 text-2xl font-extrabold text-gray-900 dark:text-white'>
                <Tag className='w-5 h-5 text-green-500'/>
                <span>{price}</span>
            </div>
            
            {/* Edit Button - Primary Action */}
            <Button 
                asChild // Use 'asChild' prop for Shadcn Button when wrapping a Link
                className='bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors duration-200'
            >
                <Link href={`/seller/listings/${id}`}>Edit Listing</Link>
            </Button>
        </div>
    </div>
  )
}

export default SellCard