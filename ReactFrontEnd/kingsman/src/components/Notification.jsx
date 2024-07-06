import React, { useEffect, useState } from 'react';
import { Dropdown } from 'flowbite-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Notification() {
    const { currentUser } = useSelector((state) => state.user);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        // Fetch notifications initially
        fetchNotifications();

        // Set up interval to fetch notifications every 3 seconds
        const interval = setInterval(fetchNotifications, 3000);

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const fetchNotifications = () => {
        // Fetch notifications for the chef
        axios.get(`http://localhost:8080/api/notifications/forWho/${currentUser.position}`)
            .then(response => {
                setNotifications(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
        markAsRead();
        console.log(notifications);
    }

    const markAsRead = (id) => {
        axios.put(`http://localhost:8080/api/notifications/${id}/read`)
            .then(response => {
                // Update the local state
                setNotifications(notifications.map(notification =>
                    notification.id === id ? { ...notification, isRead: true } : notification
                ));
            })
            .catch(error => {
                console.error("Error marking notification as read", error);
            });
    };

    // Filter notifications to show today's notifications first
    const today = new Date();
    const isToday = (date) => {
        const notificationDate = new Date(date);
        return (
            notificationDate.getDate() === today.getDate() &&
            notificationDate.getMonth() === today.getMonth() &&
            notificationDate.getFullYear() === today.getFullYear()
        );
    };

    const todayNotifications = notifications.filter((notification) => isToday(notification.createdAt));
    const previousNotifications = notifications.filter((notification) => !isToday(notification.createdAt));

    const sortedNotifications = [...todayNotifications, ...previousNotifications]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, showAll ? notifications.length : 10);


    const getLinkForPosition = () => {
        switch (currentUser.position) {
            case 'chef':
                return '/chef?tab=availableOrders';
            case 'manager':
                return '/manager?tab=inventory';
            case 'waiter':
                return '/waiter?tab=orders';
            case 'cashier':
                return '/cashier?tab=orders';
            default:
                return '#';
        }
    }



        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error fetching notifications</div>;
        }

        // Filter to show only unread notifications
        const unreadNotifications = notifications.filter(notification => !notification.read);

        console.log('unreadNotifications:', unreadNotifications);
        return (
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    <div className='w-12 h-10 hidden sm:inline my-auto'>
                        <button className="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Notifications">
                            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 10-3 0v.68C7.64 5.36 6 7.93 6 11v3.159c0 .538-.214 1.053-.595 1.436L4 17h5m5 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                            </svg>
                            <span className="absolute inset-0 object-right-top -mr-6">
                                <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                                    {unreadNotifications.length}
                                </div>
                            </span>
                        </button>
                    </div>
                }
            >
                {notifications.length > 0 ? (
                    <div className={`overflow-y-auto`} style={{ maxHeight: showAll ? '700px' : '1000px' }}>
                        {todayNotifications.length > 0 && (
                            <>
                                <div className="font-semibold text-left text-sm px-4 py-2 ">Today</div>
                                {todayNotifications.map((notification, index) => (
                                    <Link to={getLinkForPosition()} key={index}>
                                        <Dropdown.Item
                                            onClick={() => markAsRead(notification.id)}
                                            className={!notification.read ? 'bg-green-100' : ''}
                                        >
                                            <div className='flex items-start'>
                                                <div>
                                                    <p className='font-semibold text-left'>{notification.title}</p>
                                                    <p className='text-sm text-gray-500'>{notification.message}</p>
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                    </Link>
                                ))}
                            </>
                        )}
                        {previousNotifications.length > 0 && (
                            <>
                                <div className="font-semibold text-left text-sm px-4 py-2 ">Previous</div>
                                {previousNotifications.map((notification, index) => (
                                    <Link to={getLinkForPosition()} key={index}>
                                        <Dropdown.Item
                                            onClick={() => markAsRead(notification.id)}
                                            className={!notification.read ? 'bg-green-100' : ''}
                                        >
                                            <div className='flex items-start'>
                                                <div>
                                                    <p className='font-semibold text-left'>{notification.title}</p>
                                                    <p className='text-sm text-gray-500'>{notification.message}</p>

                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                    </Link>
                                ))}
                            </>
                        )}
                    </div>
                ) : (
                    <Dropdown.Item>
                        <div className='flex items-center'>
                            <div>
                                <p className='font-semibold'>No Notifications</p>
                            </div>
                        </div>
                    </Dropdown.Item>
                )}
                {notifications.length > 10 && (
                    <div className='flex justify-center'>
                        <button onClick={() => setShowAll(!showAll)} className='font-semibold text-sm'>
                            {showAll ? 'Show Less' : 'Read More'}
                        </button>
                    </div>
                )}


            </Dropdown >
        );
    }
