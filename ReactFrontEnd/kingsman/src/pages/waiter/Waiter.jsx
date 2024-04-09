import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import WaiterSideBar from '../../components/WaiterSideBar'
import TakeOrder from './order/TakeOrder';

export default function Waiter() {

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

    <div>
        <div className='min-h-screen flex flex-col md:flex-row'>
            <div className='md:w-56'>
                {/* sidebar */}
                <WaiterSideBar/>
            </div>

                {/* Inventory */}
                {tab === 'take-order' && <TakeOrder/>}
                {/* profile */}
                {/* {tab === 'profile' && <ManagerProfile/>} */}
        </div>
    </div>

  )
}

