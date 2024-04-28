
import { set } from "firebase/database";
import { Button, Label, Modal, TextInput, Alert, FileInput, Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import axios from "axios";

export function AddFoodItem({ onClose }) {
    const [openModal, setOpenModal] = useState(true);
    const [foodName, setFoodName] = useState('');
    const [foodPrice, setFoodPrice] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [selectedCat, setSelectedCat] = useState('');
    const [file, setFile] = useState(null);
    const [addFoodItemAlert, setAddFoodItemAlert] = useState(false);

    useEffect(() => {
        // Hide the alert after 2 seconds
        const timeout = setTimeout(() => {
            setAddFoodItemAlert(false);
        }, 2000);

        // Clear the timeout when the component unmounts
        return () => clearTimeout(timeout);
        }
    , [addFoodItemAlert]);



    const handleImageChange = (event) => {
        setFile(event.target.files[0]);
        console.log(event.target.files[0]);

    }

    const handleCategorySelect = (category) => {
        setSelectedCat(category);
        console.log(category);
    }

    const handleAddFood = async () => {
        if (foodName && foodPrice && selectedCat) {
            const addItem = {
                foodName,
                foodPrice,
                foodCategory: selectedCat,
            };

            try {
                const response = await axios.post('http://localhost:8080/api/food/add', addItem);
                console.log(response.data);



                // Upload the image after adding the food item
                const formData = new FormData();
                formData.append('file', file);

                try {
                    const imgRes = await axios.post(`http://localhost:8080/api/food/upload-image/${response.data.foodId}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });


                    console.log('Image uploaded:', imgRes.data);

                } catch (error) {
                    console.error('Error updating item:', error);
                }

                onClose();
            } catch (error) {
                console.error('Error adding food:', error);
            }
        } else {
            setAddFoodItemAlert(true);
            
        }
    }

    const handleAddImage = async () => {

    }



    return (
        <>
            {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
            <Modal show={openModal} size="2xl" onClose={onClose} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add Food Item for Menu</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="foodName" value="Food Name" />
                            </div>
                            <TextInput
                                id="foodName"
                                placeholder="Enter the food name"
                                onChange={(event) => setFoodName(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="price" value="Food Price" />
                            </div>
                            <TextInput
                                id="foodPrice"
                                placeholder="Enter the food Price"
                                onChange={(event) => {
                                    const value = event.target.value;
                                    console.log(value);
                                    // Check if the entered value is a valid floating-point number
                                    if (!isNaN(parseFloat(value)) && isFinite(value) || (value.includes(' '))) {
                                        // Update the state only if the entered value is a valid float
                                        setFoodPrice(value);
                                        setShowAlert(false);
                                    } else {
                                        // Show an error or handle invalid input as needed
                                        // For example, you can display an error message or prevent further action
                                        // Here, I'm resetting the state to an empty string
                                        setFoodPrice('');
                                        setShowAlert(true);
                                        console.error('Invalid input. Please enter a valid floating-point number.');
                                    }
                                }}
                                required
                            />
                            {showAlert && (
                                <Alert color="failure" icon={HiInformationCircle}>
                                    <span className="font-medium">Info alert!</span> Please fill in all fields before adding a food item.'
                                </Alert>
                            )}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="foodImage" value="Food Image" />
                            </div>
                            <FileInput id="file" helperText=" A Food Image" accept=".png, .jpeg, jpg" onChange={handleImageChange} />
                            {imageUrl && (
                                <img src={`http://localhost:8080/api/food/image/${imageUrl}`} alt="Food Image" style={{ width: '100px' }} />
                            )}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="foodCategory" value="Food Category" />
                            </div>
                            <Dropdown color='success' outline dismissOnClick={true} label={selectedCat || "Select Category"}>
                                <Dropdown.Item onClick={() => handleCategorySelect("Main Dish")}>Main Dish</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleCategorySelect("Side Dish")}>Side Dish</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleCategorySelect("Beverage")}>Beverage</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleCategorySelect("Dessert")}>Dessert</Dropdown.Item>
                            </Dropdown>
                        </div>
                        {/* add food item alert */}
                        {addFoodItemAlert && (
                                <Alert color="failure" icon={HiInformationCircle}>
                                    <span className="font-medium">Info alert!</span> Change a few things up and try submitting again.
                                </Alert>
                            )
                        }


                        <div className="w-full">
                            <Button className=" bg-green-400" color='success' onClick={handleAddFood}>Add</Button>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default AddFoodItem;
