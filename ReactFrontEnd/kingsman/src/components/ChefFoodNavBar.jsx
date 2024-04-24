
import { Button, Navbar } from "flowbite-react";
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AddFoodItem from "../pages/chef/foodManagement/AddFoodItem";

function ChefFoodNavBar() {

  const location = useLocation();
  const [tab, setTab] = useState('');
  const [addFoodPopup, setAddFoodPopup] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleAddFood = () => {
    setAddFoodPopup(true);
    
  }

  const cancelAddFood = () => {
    setAddFoodPopup(false);
  }

  return (
    <div className="justify-between flex">
      
      <div >
        <Navbar fluid rounded>

          <Navbar.Collapse>
            <Link to='/chef/foodMenu?tab=allFood'>
              <Navbar.Link active={tab === 'allFood'}>All </Navbar.Link>
            </Link>
            <Link to='/chef/foodMenu?tab=mainDish'>
              <Navbar.Link active={tab === 'mainDish'} > Main Dish </Navbar.Link>
            </Link>
            <Link to='/chef/foodMenu?tab=desert'>
              <Navbar.Link active={tab === 'desert'} >Desert </Navbar.Link>
            </Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="mr-3"> 
        <Link>
          <Button color='success' className=" bg-green-500" onClick={handleAddFood}> Add Food </Button>
        </Link>
      </div>
      {addFoodPopup && (
        <AddFoodItem
        onClose = {cancelAddFood}/>
        
        )}
    </div>
  );
}
export default ChefFoodNavBar;
