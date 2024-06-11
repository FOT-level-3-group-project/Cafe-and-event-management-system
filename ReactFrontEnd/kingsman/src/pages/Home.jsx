import React from 'react'
import { Carousel } from 'flowbite-react'

export default function Home() {
  return (
    <div className='' >
      <div className='flex flex-col items-center justify-center mt-8 mb-7'>
        <h1 className='text-6xl text- font-semibold text-gray-800 dark:text-white'>Welcome to Kingsman Cafe & Events</h1>
        <p className='text-3xl text-gray-600 dark:text-gray-300 mt-5'>"We are here to serve you the best food and events."</p>
      </div>
      <div className="h-56 sm:h-64 xl:h-96 2xl:h-96 ">
        <Carousel>
          <img src="../src/image/HomePage.jpg" alt="..." />
          <img src="../src/image/HomePage3.png" alt="..." />
        </Carousel>
      </div>

      {/* add feedback button   */}
      <div className='flex justify-end mt-10 mr-10'>
        <button className='px-5 py-2 bg-gradient-to-r from-green-800 via-green-600 to-green-400 rounded-lg text-white'>Feedback</button>
      </div>
      
      
    </div>
  )
}
