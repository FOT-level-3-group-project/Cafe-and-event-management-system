import React, { useEffect } from 'react'
import { Card } from 'flowbite-react'
import axios from 'axios'
import { useState } from 'react'
import { MdDelete } from "react-icons/md";



export default function ManagerDash() {
  const [tables, setTable] = useState([]);

  useEffect(() => {
    fetchData();
  }
    , []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/table/all");
      setTable(response.data)
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Calculate the quantity of available tables
  const availableTables = tables.filter(table => table.tableAvailability === true).length;

  return (
    <div className='bg-gray-100 p-5 w-full'>
      <div className='flex flex-wrap'>

        <div key="" className=' w-fit h-auto ml-5 my-4'>
          <Card

            className="max-w-sm"
            imgAlt="Table with chairs"
            imgSrc="./src/image/638523.png"
            horizontal
          >
            <div className=' mt-8'>
            <div className=' w-40 justify-center'>
              <h2 className=' font-bold text-2xl text-center'>Available </h2>
            </div>
            <div className=' w-40 justify-center mt-2'>
              <h2 className=' font-bold text-2xl text-center'><span className='text-4xl text-green-600'>{availableTables}</span> <span className=' text-gray-500'>/ {tables.length} </span> </h2>
            </div>
            </div>
          </Card>
        </div>


      </div>
    </div>
  )
}
