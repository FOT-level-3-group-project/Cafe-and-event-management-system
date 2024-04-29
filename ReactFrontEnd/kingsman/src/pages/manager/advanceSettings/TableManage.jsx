import React, { useEffect } from 'react'
import { Card, Label, Button, Modal } from 'flowbite-react'
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
    
    useEffect(() => {

        fetchData();
    });

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/table/all");
            console.log(response.data);
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


    return (
        <div className='bg-gray-200 p-5 w-full'>
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
                            <Link onClick={() => handleDeleteTablePopup(table.id)}><MdDelete color='red' className='' /></Link>
                            {/* Add more table details here as needed */}
                        </Card>
                    </div>

                ))}
            </div>
            {deleteTableModel &&
                <div>
                    <Modal show={deleteTableModel}size="md" onClose={() => setDeleteTableModel(false)} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this Table?
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
        </div>
    )
}
