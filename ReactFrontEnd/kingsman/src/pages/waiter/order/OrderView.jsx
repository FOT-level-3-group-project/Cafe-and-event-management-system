
import  { useState,useEffect, } from "react";
import axios from 'axios';


export default function OrderView() {

        const [OrderResponse, setOrderResponse] = useState({});

        const [customerData, setCustomerData] = useState({});
        

        const [orderItems, setOrderItems] = useState([]);
        const [tableNumber, setTableNumber] = useState(0);

        const [subtotal, setSubtotal] = useState(0);
        const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
        const [discountPercentage, setDiscountPercentage] = useState(0);

        useEffect(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const orderIDFromUrl = urlParams.get('order');
            
            axios.get(`http://localhost:8080/api/orders/${orderIDFromUrl}`)
                .then(response => {
                    if (response.status === 200){
                        setOrderResponse(response.data);
                        const { orderItems, tableNumber, subTotal, discountPercentage, totalAfterDiscount, customer } = response.data;
                        const convertedOrderItems = orderItems.map(item => ({
                            orderItemId: item.orderItemId,
                            foodId: item.foodItemId,
                            foodName:item.foodItemName, 
                            foodPrice:item.foodPrice,
                            quantity: item.quantity,
                            totalPrice: item.quantity * item.foodPrice,
                        }));
                        setOrderItems(convertedOrderItems);
                        setTableNumber(tableNumber);
                        setSubtotal(subTotal);
                        setDiscountPercentage(discountPercentage);
                        setTotalAfterDiscount(totalAfterDiscount);
                        if(customer){
                            setCustomerData(customer);
                        }
                    }else {
                        window.location.href = "/waiter?tab=manage-orders&error=order-not-found";
                    }
                })
                .catch(error => {
                    window.location.href = "/waiter?tab=manage-orders&error=order-not-found";
                    console.error("Error fetching order details:", error);
                });
        }, []);

        useEffect(() => {
            // Calculate subtotal by summing total prices of all products
            const newSubtotal = orderItems.reduce((total, item) => total + item.totalPrice, 0);
            setSubtotal(newSubtotal);
    
            // Calculate total after applying discount
            const discountAmount = (newSubtotal * discountPercentage) / 100;
            const newTotalAfterDiscount = newSubtotal - discountAmount;
            setTotalAfterDiscount(newTotalAfterDiscount);

        }, [orderItems, discountPercentage]);


        const convertDate = (dateString) => {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = date.getHours() % 12 || 12; // Convert 0 to 12
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const period = date.getHours() < 12 ? 'AM' : 'PM';
            return `${year}-${month}-${day} ${hours}.${minutes} ${period}`;
        };
    
        
    

        

  return (
    <div className="w-full bg-slate-200 dark:bg-slate-500 py-5">    
        <div className="w-full">
            <div className=" max-w-full  px-6">
                <div className="mx-auto justify-center md:flex md:space-x-6 xl:px-0">
                    <div className="h-full w-full">
                        <h1 className="mb-2 text-left text-xl font-bold dark:text-white">
                                #{OrderResponse.orderId}  &nbsp; |   &nbsp;

                                <span className={`inline-flex px-2 py-1 mr-auto items-center font-semibold text-base text-white rounded-lg ${
                                                    OrderResponse.orderStatus === "Pending" ? "bg-yellow-300" :
                                                    OrderResponse.orderStatus === "Processing" ? "bg-blue-300" :
                                                    OrderResponse.orderStatus === "Ready" ? "bg-green-300" :
                                                    OrderResponse.orderStatus === "Completed" ? "bg-purple-300" :
                                                    ""
                                                }`}
                                >
                                    &nbsp;
                                    {OrderResponse.orderStatus}
                                    &nbsp;
                                </span>
                                &nbsp;
                                |  &nbsp; {convertDate(OrderResponse.orderDateTime)}
                        </h1>

                        <div className="p-6 rounded-lg border bg-white mb-3 shadow-md md:mt-0 text-sm dark:bg-gray-600 dark: border-none">
                            <div>
                                <h4 className="font-bold">Customer Details</h4>
                                <hr className="my-2" />
                            </div>
                            <div className="rounded  pt-1">
                                <div className="w-full flex flex-col mb-2">
                                    <div className="w-full flex justify-between">
                                        <div className="w-1/3 mb-6 md:mb-0 mr-1">
                                            <label
                                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                                htmlFor="grid-name"
                                            >
                                                Name
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-transparent text-grey-darker rounded py-2 px-4 mb-3 selection:border-none focus:outline-none  focus:border-black focus:ring-0 dark:border-grey-darker dark:focus:border-gray-500"
                                                id="grid-name"
                                                type="text"
                                                value={customerData.cusName}
                                                readOnly
                                            />
                                        </div>
                                        <div className="w-1/3 mb-6 md:mb-0 mx-1">
                                            <label
                                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                                htmlFor="grid-mobile"
                                            >
                                                Mobile
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-transparent text-grey-darker border rounded py-2 px-4 mb-3 selection:border-none focus:outline-none  focus:border-black focus:ring-0 dark:border-grey-darker dark:focus:border-gray-500"
                                                id="grid-mobile"
                                                type="text"
                                                value={customerData.cusMobile}
                                                readOnly
                                            />
                                        </div>
                                        <div className="w-1/3  mb-6 md:mb-0 mx-auto ml-1">
                                            <label
                                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                                htmlFor="grid-email"
                                            >
                                                Email
                                            </label>
                                            <input
                                                className=" appearance-none block w-full bg-transparent text-grey-darker border rounded py-2 px-4 mb-3 selection:border-none focus:outline-none  focus:border-black focus:ring-0 dark:border-grey-darker dark:focus:border-gray-500"
                                                id="grid-email"
                                                type="email"
                                                value={customerData.cusEmail}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className=" py-2 flex flex-col justify-between rounded-lg border bg-white mb-6 shadow-md md:mt-0 dark:bg-gray-600 dark:border-none min-h-[calc(100vh-24rem)] h-auto">

                            <div className="overflow-x-auto overflow-scroll max-h-[calc(100vh-34rem)] h-auto px-6 py-2">
                                <table className="w-full table-auto">
                                    <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-2 py-1">
                                                <div className="text-left font-semibold"> Name</div>
                                            </th>
                                            <th className="px-2 py-1">
                                                <div className="text-center font-semibold">Price</div>
                                            </th>
                                            <th className="px-2 py-1">
                                                <div className="text-center font-semibold">Qut</div>
                                            </th>
                                            <th className="px-2 py-1">
                                                <div className="text-right font-semibold">Total LKR</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm">
                                        {orderItems.length < 1 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center text-gray-400 py-4">No items were found. Please Select from the Menu</td>
                                            </tr>
                                        ) : (
                                            orderItems.map(item => (
                                                <tr key={item.foodId}>
                                                    <td className="px-2 py-1">
                                                        <div className="font-medium capitalize text-gray-800 dark:text-gray-50">{item.foodName}</div>
                                                    </td>
                                                    <td className="px-2 py-1">
                                                        <div className="text-center font-medium text-green-500">{item.foodPrice.toFixed(2)}</div>
                                                    </td>
                                                    <td className="px-2 py-1">
                                                        <div className="text-center dark:text-gray-50">{item.quantity}</div>
                                                    </td>
                                                    <td className="px-2 py-1">
                                                        <div className="text-right font-medium text-green-500">{item.totalPrice.toFixed(2)}</div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}{}
                                    </tbody>
                                </table>
                            </div>

                            <div className="px-6 py-3">
                                <div className="flex justify-between">
                                    <p className="text-md">Subtotal</p>
                                    <div>
                                        <p className="mb-1 text-md">LKR {subtotal.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-md">Discount {discountPercentage}%</p>
                                    <div>
                                        <p className="mb-1 text-md">LKR {(subtotal * (discountPercentage / 100)).toFixed(2)}</p>
                                    </div>
                                </div>
                                <hr className="mt-2 mb-3"/>
                                <div className="flex justify-between">
                                    <p className="text-lg font-bold">Total</p>
                                    <div>
                                        <p className="mb-1 text-lg font-bold">LKR {totalAfterDiscount.toFixed(2)}</p>
                                    </div>
                                </div>
                                <hr className="mt-2 mb-3"/>
                                <div className="flex items-center mt- my-2">
                                    <p className="text-lg">Table - </p>
                                    <div>
                                        <p className="mx-1 text-lg">{tableNumber}</p>
                                    </div>
                                    
                                </div>

                                <div>
                                    <div className='flex items-center justify-between w-full overflow-hidden'>
                                        <a href="/waiter?tab=manage-orders" className="flex-grow flex items-center justify-center px-3 py-2 bg-cyan-500 text-white font-semibold rounded hover:bg-cyan-600 mx-1">
                                            <i className="ri-arrow-left-s-line"></i>
                                            <span className="ml-1">Back</span>
                                        </a>
                                        <a  href={`/waiter?tab=update-orders&order=${OrderResponse.orderId}`} className="flex-grow flex items-center justify-center px-3 py-2 bg-amber-500 text-white font-semibold rounded hover:bg-amber-600 mx-1">
                                            <i className="ri-edit-fill"></i>
                                            <span className="ml-1">Edit Order</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
