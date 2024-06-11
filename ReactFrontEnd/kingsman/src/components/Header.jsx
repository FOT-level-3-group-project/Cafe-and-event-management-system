import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { logOutSuccess } from '../redux/user/userSlice'
import { Label } from 'flowbite-react'


export default function Header() {
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { theme } = useSelector((state) => state.theme);
    console.log(currentUser);

    const handleLogOut = async () => {

        try {
            dispatch(logOutSuccess());
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        // Top buttons

        <Navbar className='border-b-2'>

            <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <div className='flex items-center'>
                    <img src='../src/image/logo.png' alt='logo' className='w-12 rounded-3xl' />
                    <span className='px-2 py-1 bg-gradient-to-r from-green-800 via-green-600 to-green-400 rounded-lg text-white'>Kingsman Cafe & Events</span>
                </div>
            </Link>

            <div className='flex gap-3 md:order-2'>
                {currentUser && (
                    <div className='mr-5 mt-2'><Link to={'/' + (currentUser.position) + '?tab=dashboard'}><Label>My Dashboard</Label></Link></div>
                )}


                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                    {theme === 'light' ? <FaSun /> : <FaMoon />}
                </Button>
                
                {/* nortification button */}
                {currentUser ? (
                    <div className='w-12 h-10 hidden sm:inline my-auto'>
                    <button class="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Notifications">
                        <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 10-3 0v.68C7.64 5.36 6 7.93 6 11v3.159c0 .538-.214 1.053-.595 1.436L4 17h5m5 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                        </svg>
                        <span class="absolute inset-0 object-right-top -mr-6">
                            <div class="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                                6
                            </div>
                        </span>
                    </button>
                </div>
                ):(
                    <span></span>
                )}
                

                {/* user profile picture and log out button */}
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt='user'
                                img={currentUser.profilePicture}
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm'>{currentUser.first_name} {currentUser.last_name}</span>
                        </Dropdown.Header>
                        <Link to={'/' + (currentUser.position) + '?tab=profile'}>
                            <Dropdown.Item>
                                Profile
                            </Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogOut}>
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
