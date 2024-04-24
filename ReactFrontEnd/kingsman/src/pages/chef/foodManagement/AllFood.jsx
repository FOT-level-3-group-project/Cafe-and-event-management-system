import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, TextInput } from "flowbite-react";
import { ToggleSwitch } from "flowbite-react";
import { Dropdown} from "flowbite-react";
import DeleteFoodItem from './DeleteFoodItem';
import { set } from 'firebase/database';
import EditFoodItem from './EditFoodItem';
import AddFoodItem from './AddFoodItem';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // Import the search icon from react-icons




export default function AllFood() {
    const [foods, setFoods] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null); // State to store item to delete
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // State to manage visibility of edit popup
    const [itemToEdit, setItemToEdit] = useState(null); // State to store item to edit
    const [switch2, setSwitch2] = useState(false);
    const [addFoodPopup, setAddFoodPopup] = useState(false);
    const navigate = useNavigate();
    const [searchFood, setSearchFood] = useState('');


    useEffect(() => {

        fetchFoods();
    }, []);

    const fetchFoods = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/food/all');
            setFoods(response.data);
        } catch (error) {
            console.error('Error fetching foods:', error);
        }
    };

    const handleAvailability = async (foodId) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/food/update-availability/${foodId}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error updating food availability:', error);
        }
        fetchFoods();
    }

    const handleUpdateClick = (foodId) => {
        setIsEditPopupOpen(true);
        setItemToEdit(foodId);
    }

    const handleDeleteItem = async (foodId) => {
        setShowDeleteConfirmation(true);
        setItemToDelete(foodId);
    }

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
    }

    const deleteFood = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/food/delete/${itemToDelete}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting food:', error);
        }
        setShowDeleteConfirmation(false);
        setItemToDelete(null);
        fetchFoods();
    }

    const cancelEdit = () => {
        setIsEditPopupOpen(false);
        setItemToEdit(null);
    }

    const handleUpdateSubmit = (updatedItem) => {
        fetchFoods();
        setIsEditPopupOpen(false);
        console.log('Updated item:', updatedItem);
    }

    const handleAddFood = () => {
        setAddFoodPopup(true);

    }

    const cancelAddFood = () => {
        fetchFoods();
        setAddFoodPopup(false);
        navigate('/chef/foodMenu?tab=allFood')

    }

    const handleSearchItem = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/food/search/${searchFood}`);
            setFoods(response.data);
        } catch (error) {
            console.error('Error fetching foods:', error);
        }
    }

    return (
        <div className="overflow-x-auto mt-4 h-screen drop-shadow-md mr-3 bg-gray-100  dark:bg-slate-500">
            <div className='flex justify-between m-4 bg-white rounded-lg shadow-md dark:bg-slate-600'>
                {/* <h1 className="text-2xl font-semibold text-gray-900 dark:text-white p-2">All Food Items</h1> */}
                <div className='p-3 flex'>
                    <div className=' m-3'><FaSearch className="text-gray-400 mx-3" /> {/* Search icon */}</div>
                    <TextInput placeholder={'Search Name '} onChange={(event) => setSearchFood(event.target.value)} className=' w-64'/>
                    {/* <Button color='success' className=" ml-3 size-fit bg-green-500" onClick={handleSearchItem}>Search</Button> */}

                </div>
                <div className="mr-3 p-3">
                    <Link>
                        <Button color='success' className=" bg-green-500" onClick={handleAddFood}> + Add Food </Button>
                    </Link>
                </div>
            </div>
            <div className=" m-4 bg-white rounded-lg shadow-md">
                <Table>
                    <Table.Head className=' w-full'>
                        <Table.HeadCell>Food Id</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Image</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell>Price</Table.HeadCell>
                        <Table.HeadCell>Availability</Table.HeadCell>
                        <Table.HeadCell></Table.HeadCell>

                    
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {foods.map(food => (
                            food.foodName.toLowerCase().includes(searchFood.toLowerCase()) ? (
                            <Table.Row key={food.foodId} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{food.foodId}</Table.Cell>
                                <Table.Cell>{food.foodName}</Table.Cell>
                                <Table.Cell>
                                    <img src={`http://localhost:8080/api/food/image/${food.foodImageURL}`} alt={food.foodName} style={{ width: '100px' }} />
                                    {console.log(food.foodImageURL)}
                                </Table.Cell>
                                <Table.Cell>{food.foodCategory}</Table.Cell>
                                <Table.Cell>{food.foodPrice}</Table.Cell>
                                <Table.Cell className=''>

                                    <ToggleSwitch className='' checked={food.available} color='success' label="" onChange={() => handleAvailability(food.foodId)} />


                                </Table.Cell>
                                <Table.Cell>
                                    <Dropdown label="Action" inline>
                                        <Dropdown.Item onClick={() => handleUpdateClick(food.foodId)} >Update</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleDeleteItem(food.foodId)}>Delete</Dropdown.Item>
                                    </Dropdown>
                                </Table.Cell>

                            </Table.Row>
                            ) : null
                        ))}
                    </Table.Body>
                </Table>
            </div>


            {/* Delete confirmation popup */}
            {showDeleteConfirmation && (
                <DeleteFoodItem
                    foodName={foods.find(food => food.foodId === itemToDelete)?.foodName || ""}
                    onCancel={cancelDelete}
                    onDelete={deleteFood}
                />
            )}

            {/* Edit popup */}
            {isEditPopupOpen && (
                <EditFoodItem
                    foodId={itemToEdit}
                    onCancel={cancelEdit}
                    onSubmit={handleUpdateSubmit} // Reload items after editing
                />
            )}
            {/* Add food popup */}
            {addFoodPopup && (
                <AddFoodItem
                    onClose={cancelAddFood} />

            )}
        </div>


    )
}
