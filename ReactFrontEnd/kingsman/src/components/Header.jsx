import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { logOutSuccess } from '../redux/user/userSlice'
import { Label } from 'flowbite-react'
import Notification from './Notification'


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
                    <Notification />
                ) : (
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
