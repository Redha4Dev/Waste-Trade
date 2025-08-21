import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

interface SellCardType {
    title: string,
    image: string,
    date: string,
    price: string,
    description: string,
    quantity: number,
    id: string
}

const SellCard = ({title, image, date, price, description, quantity, id} : SellCardType ) => {
  return (
    <div className='p-3 shadow-xl max-w-[300px] gap-2 flex flex-col rounded-lg'>
        <div className='w-[280px] h-[150px] rounded-lg bg-gray-200'>
        {/* image */}
        {image}
        </div>
        <h1 className='text-xl font-semibold bricolage-grotesque'>{title}</h1>
        <p className='text-sm text-gray-500'>{description}</p>
        <p className='text-md '>Date: {date}</p>
        <p className='text-md font-medium'>quantity remain: {quantity} grammes </p>
        <div className='flex justify-between items-center'>
            <p className='text-md font-medium'>Price: {price}</p>
            <Button className=''><Link href={`/seller/listings/${id}`}>Edit</Link></Button>
        </div>
    </div>
  )
}

export default SellCard