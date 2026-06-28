import React from 'react'
import { Button } from './ui/button'

// for multicursor editing press ctrl + f2

const Hero = () => {
  return (
    <section className='bg-linear-to-r from-blue-600 to-purple-600 text-white py-16 '>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid md:grid-cols-2 gap-8 items-center'>
            <div>
                <h1 className='text-4xl md:text-6xl font-bold mb-4'>Latest Electronics at Best Prices</h1>
                <p>Discover cutting edge technology with unbeatable deals on smartphones, laptops and more.</p>
                <div className='flex flex-col sm:flex-row gap-4'></div>
                <Button className="bg-white text-blue-600 hover:bg-gray-100" >Shop Now</Button>
                <Button variant='outline' className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent" >View Deals </Button>
            </div>

            <div className='relative'>
                <img src='/heroimg.png' alt="" width={500} height={400}  className='rounded-lg shadow-2xl'/>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
