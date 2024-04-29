import React, { useEffect } from 'react'
import { Card, Label, Button, Modal, TextInput, } from 'flowbite-react'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { set } from 'firebase/database'

export default function TableManage() {
    const [tables, setTable] = useState([]);
    const [deleteTableModel, setDeleteTableModel] = useState(false);
    const [tableToDelete, setTableToDelete] = useState(null);
    const [addNewTableModel, setAddNewTableModel] = useState(false);
    const [tableNumber, setTableNumber] = useState('');

    useEffect(() => {
        fetchData();
    });

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/table/all");
            setTable(response.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
        }
    }

    const handleDeleteTablePopup = async (id) => {
        setDeleteTableModel(true);
        setTableToDelete(id);
    }

    const handleDeleteTable = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/table/delete/${tableToDelete}`);
            setDeleteTableModel(false);
            fetchData();
            setTableToDelete(null);
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    }

    const handleAddTabe = () => {
        setAddNewTableModel(true);
    }

    const handleAddTable = async () => {
        if (tableNumber) {
            const newTable = {
                tableNumber,
                tableAvailability: true,
                date: new Date()
            };

            try {
                await axios.post("http://localhost:8080/api/table/add", newTable);
                fetchData();
                setAddNewTableModel(false);

            } catch (error) {
                console.error("Error adding data:", error);
            }
        }
        else {
            console.error("Please fill all the fields")
        }
    }



    return (
        <div className='bg-gray-200 p-5 w-full'>
            <div className='flex justify-between bg-white dark:bg-gray-600 p-3 rounded-lg shadow-md mb-2'>
                <Label className='text-2xl font-bold'>Table Management</Label>
                <Button color="success" className=' bg-green-500' onClick={handleAddTabe}>Add Table </Button>
            </div>
            <div className='flex flex-wrap'>
                {tables.map(table => (
                    <div key={table.id} className=' w-52 h-auto ml-5 my-4'>
                        <Card

                            className="max-w-sm"
                            imgAlt="Table with chairs"
                            imgSrc="../src/image/Table2.jpg"
                        >

                            <Label className="text-xl mb-0 font-bold tracking-tight text-gray-900 dark:text-white">
                                Table Number: {table.tableNumber}
                            </Label>
                            <Label> {table.tableAvailability ? <Label className=' text-green-500'>Available</Label> : <Label className=' text-red-500'>Customer In the Table</Label>}</Label>
                            {table.tableAvailability ? (
                                <Link onClick={() => handleDeleteTablePopup(table.id)}>
                                    <MdDelete color='red' />
                                </Link>
                            ) : (<MdDelete color="#dbd5d5"/>)}
                        </Card>
                    </div>

                ))}
            </div>
            {/* Delete table popup  */}
            {deleteTableModel &&
                <div>
                    <Modal show={deleteTableModel} size="md" onClose={() => setDeleteTableModel(false)} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this Table ?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button color="failure" onClick={handleDeleteTable}>
                                        {"Yes, I'm sure"}
                                    </Button>
                                    <Button color="gray" onClick={() => setDeleteTableModel(false)}>
                                        No, cancel
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>}

            {/* Add new table popup */}
            {addNewTableModel &&
                <div>
                    <Modal show={addNewTableModel} size="md" onClose={() => setAddNewTableModel(false)} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <div >
                                <div className="text-center">
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Add New Table
                                    </h3>
                                </div>
                                <div>
                                    <Label> Table Number : </Label>
                                    <TextInput placeholder="Table Number" onChange={(e) => setTableNumber(e.target.value)} />
                                </div>
                                <div className="flex justify-center gap-4 mt-3">
                                    <Button color="success" className=' bg-green-500' onClick={handleAddTable}>
                                        {"Add Table"}
                                    </Button>
                                    <Button color="gray" onClick={() => setAddNewTableModel(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>}


        </div>
    )
}
