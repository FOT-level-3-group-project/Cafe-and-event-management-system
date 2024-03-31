import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaMoon } from 'react-icons/fa'
import {  useSelector } from 'react-redux'

export default function Header() {
    const path = useLocation().pathname;
    const { currentUser } = useSelector((state) => state.user);
    console.log(currentUser);
    return (
        <Navbar className='border-b-2'>
            <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-lime-900 via-lime-600 to-lime-500 rounded-lg text-white'>Kingsman Cafe & Events</span>
            </Link>
            <div className='flex gap-3 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                    <FaMoon />
                </Button>
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt='user'
                                img={currentUser.profilePictrue}
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm'>{currentUser.first_name} {currentUser.last_name}</span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}> 
                            <Dropdown.Item>
                                Profile
                            </Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                            Log out
                        </Dropdown.Item>

                    </Dropdown>
                ) : (
                    <Link to='/login'>
                        <Button outline gradientDuoTone="greenToBlue" >
                            Log in
                        </Button>
                    </Link>

                )}



                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'}>
                    <Link to='/about'>
                        About
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>

        </Navbar>
    )
}
