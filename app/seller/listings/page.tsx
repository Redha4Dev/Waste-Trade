import SellCard from '@/components/SellCard'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { user } from '@/lib/user'
import React from 'react'

export default async function page() {
  const currentUser = await user();
  console.log("current user :",currentUser);
  return (
    <div className='w-full'>
      <h1 className='text-xl font-semibold '>All Listings</h1>
      <Separator className='my-4 min-w-sm'/>
      <div className='mt-4 flex gap-2 min-w-sm:flex-col items-center'>
        <Input placeholder='Search...' className='w-[200px]' />
        {/* filter select */}
      </div>
      <div className='flex my-4 gap-4 w-full'>
        <SellCard title='PET Bottles' description='any type empty plastic bottles ex: water bottles, energy drink bottles,
juice bottles...' date='10/10/2023' price='1000' quantity={30000} image='123' id='1'/>
        <SellCard title='HDPE Containers' description='natural and colored HDPE (high-density polyethylene) containers with or without a CRV label' date='10/10/2023' price='4000' quantity={30000}
        image='123' id='33'/>
        <SellCard title='Plastic bags' description='plastic bag, poly bag, or pouch is a type of container made of thin, flexible,plastic film, nonwoven fabric, or plastic textile.' date='10/10/2023'
         price='1000' quantity={30000} image='122' id='22'/>
      </div>
    </div>
  )
}
