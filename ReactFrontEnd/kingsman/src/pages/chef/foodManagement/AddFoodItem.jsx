
import { set } from "firebase/database";
import { Button, Checkbox, Label, Modal, TextInput, Alert, FileInput } from "flowbite-react";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import axios from "axios";

export function AddFoodItem({ onClose }) {
    const [openModal, setOpenModal] = useState(true);
    const [foodName, setFoodName] = useState('');
    const [foodPrice, setFoodPrice] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`http://localhost:8080/api/food/upload-image/${foodId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setImageUrl(response.data);
            console.log('Image uploaded:', response.data);

        } catch (error) {
            console.error('Error updating item:', error);
        }
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
                                    <span className="font-medium">Info alert!</span> Change a few things up and try submitting again.
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

                        <div className="w-full">
                            <Button>Log in to your account</Button>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?&nbsp;
                            <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">
                                Create account
                            </a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default AddFoodItem;
