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
                <th scope="col">Item Id</th>
                <th scope="col">Item Name</th>
                <th scope="col">Quantity(KG/Pics)</th>
                <th scope="col">Vendor Name</th>
                <th scope="col">Item Added Date</th>
                <th scope="col">Item Edited Date</th>
              </tr>
            </thead>
                    <tbody>
                        {items.map((item, index) =>(
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.itemName}</td>
                                <td>{item.quantity}</td>
                                <td>{item.vendorId}</td>
                                <td>{item.dateTime}</td>
                                <td>{item.lastModified}</td>
                                <td>
                                    <button className = "btn btn-primary mx-2" >View</button>
                                    <button className="btn btn-primary mx-2" >Edit</button>
                                    <button className = "btn btn-primary mx-2" >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );




}