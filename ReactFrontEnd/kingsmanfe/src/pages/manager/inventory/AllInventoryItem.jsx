import React, {useEffect,useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllInventoryItem(){
    

    const [items, setItems] = useState([]);

    useEffect(() =>{ /*run the useEffect method, when lord the page and chenge the state*/
        lordItems();

    },[])

    const lordItems = async () =>{

        try {
            const response = await axios.get("http://localhost:8080/api/inventory/view");
            console.log(response.data); 
            setItems(response.data);
            
        } catch (error) {
            console.error("Error fetch data",error);
        }
    };

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col" className="text-center">Item Id</th>
                <th scope="col">Item Name</th>
                <th scope="col">Quantity (KG/Pics)</th>
                <th scope="col">Vendor Name</th>
                <th scope="col">Item Added Date</th>
                <th scope="col">Item Edited Date</th>
                <th scope="col" className="text-center">Actions</th>

              </tr>
            </thead>
                    <tbody>
                        {items.map((item, index) =>(
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td className="text-center">{item.id}</td>
                                <td className="text-center">{item.itemName}</td>
                                <td className="text-center">{item.quantity}</td>
                                <td className="text-center">{item.vendorId}</td>
                                <td>{new Date(item.dateTime).toLocaleString()}</td>
                                <td>{new Date(item.lastModified).toLocaleString()}</td>
                                <td>
                                    <button className= "btn btn-primary mx-2" >Edit</button>
                                    <button className = "btn btn-danger mx-2" >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );




}