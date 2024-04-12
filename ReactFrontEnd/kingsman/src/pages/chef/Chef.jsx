import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChefProfile from './ChefProfile';
import ManageInventory from './inventory/ManageInventory';
import ChefSideBar from '../../components/ChefSideBar';


export default function Chef() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);
    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            <div className='md:w-56'>
                {/* sidebar */}
                <ChefSideBar/>
            </div>

                {/* Inventory */}
                {tab === 'inventory' && <ManageInventory/>}
                {/* profile */}
                {tab === 'profile' && <ChefProfile/>}

        </div>
    )
}
