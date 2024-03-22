import { Button, Navbar } from 'flowbite-react'
import React from 'react'
import { FaMoon } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <Navbar className='border-b-2'>
        <div to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-green-500 via-green-500 rounded-lg text-black'>Kingsman</span>
        </div>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-12 ' color='gray' pill>
                <FaMoon />
            </Button>
        </div>
    </Navbar>
  )
}