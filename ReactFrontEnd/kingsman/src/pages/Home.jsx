import React from 'react'
import { Carousel } from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='' >
      <div className='flex flex-col items-center justify-center mt-8 mb-7'>
        <h1 className='text-7xl text- font-semibold text-green-700 shadow-xl dark:text-white font-serif'>Welcome to Kingsman Cafe & Events</h1>
        <p className='text-3xl text-gray-600 dark:text-gray-300 mt-7 font-mono'>"We are here to serve you the best food and events."</p>
      </div>
      <div style={{ height: '450px' }} className="h-56 sm:h-64 xl:h-96 2xl:h-96 ">
        <Carousel>
          <img src="../src/image/ss1.jpeg" alt="..." />
          <img src="../src/image/ss2.jpeg" alt="..." />
          <img src="../src/image/ss3.jpeg" alt="..." />
          <img src="../src/image/ss4.jpeg" alt="..." />
          <img src="../src/image/ss5.jpeg" alt="..." />
          <img src="../src/image/ss6.jpeg" alt="..." />
          <img src="../src/image/ss7.jpeg" alt="..." />
        </Carousel>
      </div>

      {/* add feedback button   */}
      <div className='flex justify-end mt-10 mr-10'>
        <Link to='/feedback'>
        <button className='px-5 py-2 bg-gradient-to-r from-green-800 via-green-600 to-green-400 rounded-lg text-white'>Feedback</button>
        </Link>
      </div>
      
      
    </div>
  )
}
