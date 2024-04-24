import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from "flowbite-react";
import { ToggleSwitch } from "flowbite-react";
import { Dropdown } from "flowbite-react";
import DeleteFoodItem from './DeleteFoodItem';
import { set } from 'firebase/database';
import EditFoodItem from './EditFoodItem';


export default function AllFood() {
    const [foods, setFoods] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null); // State to store item to delete
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // State to manage visibility of edit popup
    const [itemToEdit, setItemToEdit] = useState(null); // State to store item to edit
    const [switch2, setSwitch2] = useState(false);


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
        fe
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

    return (
        <div className="overflow-x-auto mt-4">
            <Table>
                <Table.Head>
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
                        <Table.Row key={food.foodId} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{food.foodId}</Table.Cell>
                            <Table.Cell>{food.foodName}</Table.Cell>
                            <Table.Cell>
                                <img src={`http://localhost:8080/api/food/image/${food.foodImageURL}`} alt={food.foodName} style={{ width: '100px' }} />
                                {console.log(food.foodImageURL)}
                            </Table.Cell>
                            <Table.Cell>{food.foodCategory}</Table.Cell>
                            <Table.Cell>{food.foodPrice}</Table.Cell>
                            <Table.Cell>

                                <ToggleSwitch checked={food.available} color='success' label="" onChange={() => handleAvailability(food.foodId)} />


                            </Table.Cell>
                            <Table.Cell>
                                <Dropdown label="Action" inline>
                                    <Dropdown.Item onClick={() => handleUpdateClick(food.foodId)} >Update</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleDeleteItem(food.foodId)}>Delete</Dropdown.Item>
                                </Dropdown>
                            </Table.Cell>

                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>


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
        </div>


    )
}
