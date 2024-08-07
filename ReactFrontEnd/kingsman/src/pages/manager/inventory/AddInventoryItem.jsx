import { Button, Checkbox, Label, Modal, TextInput, Dropdown, Alert } from "flowbite-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { set } from "firebase/database";
import { HiCheck } from "react-icons/hi";
import { HiInformationCircle } from "react-icons/hi";

function AddInventoryItem({ onSubmit, onCancel }) {
    const [openModal, setOpenModal] = useState(true);
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');
    const [vendorId, setVendorId] = useState('');
    const [isaddSuccessModel, setAddSuccessModel] = useState(false);
    const [fillAllFieldsAlert, setFillAllFieldsAlert] = useState(false);

    useEffect(() => {
        // Hide the alert after 2 seconds
        const timeout = setTimeout(() => {
            setAddSuccessModel(false);
            setFillAllFieldsAlert(false);
        }, 2000);

        // Clear the timeout when the component unmounts
        return () => clearTimeout(timeout);
    }
        , [fillAllFieldsAlert, isaddSuccessModel]);

    useEffect(() => {

        setTotalPrice(quantity * price)

    }, [quantity, price]);


    const handleAddItem = async () => {


        // Validate input fields before adding the item
        if (itemName && quantity && vendorId && selectedUnit && totalPrice) {
            const newItem = {
                itemName,
                quantity,
                vendorId,
                unit: selectedUnit,
                totalPrice
            };
            try {
                const response = await axios.post('http://localhost:8080/api/inventory/add', newItem);

                if (response.data === 'Item added to inventory successfully') {
                    // Item added successfully
                    console.log('Item added successfully:', response.data);

                    onSubmit(); // Reload items after adding
                    setAddSuccessModel(true);


                    setItemName('');
                    setQuantity('');
                    setVendorId('');
                    setPrice('');



                } else {
                    console.error('Failed to add item:', response.data);
                }

            } catch (error) {
                console.error('Error adding item:', error.message);

            }

        } else {
            setFillAllFieldsAlert(true);
        }


    };

    const handleUnitSelect = (unit) => {
        setSelectedUnit(unit);
        console.log('Selected unit:', unit);
    };



    return (
        <>
            <Modal show={openModal} size="md" onClose={onCancel} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <Label className="text-xl font-medium text-gray-900 dark:text-white" htmlFor="quantity" value={"Add New Item"} />
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="itemName" value={"Item Name"} />
                            </div>
                            <TextInput
                                id="itemName"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="quantity" value={"Quantity"} />
                            </div>
                            <TextInput
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="unit" value={"Messure Unit"} />
                            </div>

                            <Dropdown color='success' outline dismissOnClick={true} label={selectedUnit || "Select Unit"}>
                                <Dropdown.Item onClick={() => handleUnitSelect("Kg")}>Kg</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleUnitSelect("Pcs")}>Pcs</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleUnitSelect("Liter")}>Liter</Dropdown.Item>
                            </Dropdown>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="price" value={"Rs. (Per Unit)"} />
                            </div>
                            <TextInput
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="vendorName" value="Vendor Name" />
                            </div>
                            <TextInput
                                id="vendorName"
                                type="text"
                                value={vendorId}
                                onChange={(e) => setVendorId(e.target.value)}
                                required />
                        </div>
                        {/* Fill all fields alert */}
                        {fillAllFieldsAlert && (
                            <Alert color="failure" icon={HiInformationCircle}>
                                <span className="font-medium">Please fill all fields!</span>
                            </Alert>
                        )}

                        <div className="w-full">
                            <Button color="success" onClick={handleAddItem} disabled={!selectedUnit} >Add</Button>
                        </div>

                    </div>

                </Modal.Body>
            </Modal>
            {/* inventory item added popup window */}
            {isaddSuccessModel && (
                <Modal show={isaddSuccessModel} size="md" onClose={() => setAddSuccessModel(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiCheck className="mx-auto mb-4 h-14 w-14 text-green-500 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Item added to inventory successfully
                            </h3>
                        </div>
                    </Modal.Body>
                </Modal>
            )}

        </>
    );
}
export default AddInventoryItem;
