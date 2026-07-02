// import React from 'react'
// import { Button } from './ui/button'
// import heroimg from "../assets/hero11.jpg";

// // for multicursor editing press ctrl + f2

// const Hero = () => {
//   return (
//     <section className='bg-linear-to-r from-blue-600 to-purple-600 text-white py-16 '>
//       <div className='max-w-7xl mx-auto px-4'>
//         <div className='grid md:grid-cols-2 gap-8 items-center'>
//             <div>
//                 <h1 className='text-4xl md:text-6xl font-bold mb-4'>Latest Electronics at Best Prices</h1>
//                 <p>Discover cutting edge technology with unbeatable deals on smartphones, laptops and more.</p>
//                 <div className='flex flex-col sm:flex-row gap-4'></div>
//                 <Button className="bg-white text-blue-600 hover:bg-gray-100" >Shop Now</Button>
//                 <Button variant='outline' className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent" >View Deals </Button>
//             </div>

//             <div className='relative'>
//                 <img src={heroimg} alt=""  width={500} height={400} className='rounded-lg shadow-2xl'/>
//             </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Hero


import React from 'react'
import { Button } from './ui/button'
import heroimg from "../assets/hero11.jpg";

// for multicursor editing press ctrl + f2

const Hero = () => {
  return (
    <section className='bg-linear-to-br from-[#2A6BE6] via-[#1E85C7] to-[#0EA5B4] text-white py-16 md:py-24 flex items-center min-h-[70vh]'>
      <div className='max-w-7xl mx-auto px-6 w-full'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          
          {/* Left Content Side */}
          <div className='flex flex-col justify-center'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight py-5 my-5'>
              Latest Electronics at Best Prices
            </h1>
            <p className='text-lg opacity-90 mb-8 max-w-xl'>
              Discover cutting edge technology with unbeatable deals on smartphones, laptops and more.
            </p>
            {/* Fixed Button Spacing & Alignment */}
            <div className='flex flex-row gap-4 items-center'>
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-md font-medium shadow-sm transition-colors">
                Shop Now
              </Button>
              <Button 
                variant='outline' 
                className="border border-white text-white hover:bg-white hover:text-blue-600 bg-transparent px-6 py-2 rounded-md font-medium transition-colors"
              >
                View Deals
              </Button>
            </div>
          </div>

          {/* Right Image Side */}
          <div className='flex justify-center md:justify-start w-full md:pl-18 md:pt-8'>
            <img 
              src={heroimg} 
              alt="Latest Smartphone"  
              className='rounded-2xl shadow-2xl max-w-full h-auto object-cover max-h-137.5'
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
