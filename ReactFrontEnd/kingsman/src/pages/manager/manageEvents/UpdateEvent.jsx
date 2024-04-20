// import React, { useEffect, useState } from 'react';
// import { Alert, Label, TextInput } from 'flowbite-react';
// import axios from 'axios';

// const UpdateEvent = () => {
//     const [formData, setFormData] = useState({
//         eventID: '',
//         eventName: '',
//         eventDate: '',
//         startTime: '',
//         duration: '',
//         budget: '',
//         ticketPrice: '',
//         ticketQuantity: '',
//         entertainer: '',
//         description: '',
//     });

    // const [errorMessage, setErrorMessage] = useState('');
    // const [durationErrorMessage, setDurationErrorMessage] = useState('');
    // const [budgetErrorMessage, setBudgetErrorMessage] = useState('');
    // const [ticketPriceErrorMessage, setTicketPriceErrorMessage] = useState('');
    // const [ticketQuantityErrorMessage, setTicketQuantityErrorMessage] = useState('');

//     const handleUpdateEventForm = () => {
//         setFormData({
            // ...formData,
            // eventDate: '',
            // startTime: '',
            // duration: '',
            // budget: '',
            // ticketPrice: '',
            // ticketQuantity: '',
            // entertainer: '',
            // description: '',
//         }); 
//         setErrorMessage('');
//         setBudgetErrorMessage('');
//         setTicketPriceErrorMessage('');
//         setTicketQuantityErrorMessage('');
//         setDurationErrorMessage('');
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//             setFormData(prevFormData => ({
//             ...prevFormData,
//             [name]: value,
//         }));

//     // Clear error messages for the corresponding field
    // switch (name) {
    //   case 'budget':
    //     setBudgetErrorMessage('');
    //     break;
    //   case 'ticketPrice':
    //     setTicketPriceErrorMessage('');
    //     break;
    //   case 'duration':
    //     setDurationErrorMessage('');
    //     break;
    //   case 'ticketQuantity':
    //     setTicketQuantityErrorMessage('');
    //     break;
    //   default:
    //     break;
    // }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     handleUpdateEventForm();

//      try {
//       // Update event details
//       const response = await axios.post('http://localhost:8080/api/events/update', formData);
//       console.log(response.data);
//       setErrorMessage(`Successfully updated event ${formData.eventName}`);
//     } catch (error) {
//       console.error(error);
//       setErrorMessage('Failed to update event. Please try again.');
//     }
//   };
  
//   return (
    // <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row w-full '>
    //     <div className='flex-1 flex justify-center'>
    //         <form className='flex flex-col gap-4 w-full' onSubmit={handleSubmit}>
    //             <h1 className='flex justify-center text-3xl font-bold mb-4 '> Update Event </h1> <hr />
    //             <div>
    //                 <Label value='Event ID' />
    //                 <TextInput type='text' id='EventID' value={formData.eventID} name='eventID' onChange={handleChange} readOnly />
    //             </div>
    //             <div>
    //                 <Label value='Event Name' />
    //                 <TextInput type='text' id='EventName' value={formData.eventName} name='eventName' onChange={handleChange} readOnly />
    //             </div>
    //             <div>
    //                 <Label value='Update Event Date' />
    //                 <TextInput type='date' placeholder='Event Date' id='EventDate' value={formData.eventDate} onChange={handleChange} name="eventDate" className='text-gray-400' />
    //             </div>
    //             <div>
    //                 <Label value='Update Starting Time' /> <br/>
    //                  <select className="border rounded-md dark:bg-gray-600 dark:font-white" onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}>
    //                     {Array.from({ length: 24 }, (_, i) => (
    //                         <option key={i} value={i < 10 ? `0${i}:00` : `${i}:00`}>{i < 10 ? `0${i}` : `${i}`}</option>
    //                     ))}
    //                 </select>
    //                 <span className="text-xl font-bold">:</span>
    //                 <select className="border rounded-md dark:bg-gray-600 dark:font-white" onChange={(e) => setFormData({ ...formData, startTime: `${formData.startTime.split(':')[0]}:${e.target.value}` })} >
    //                     {Array.from({ length: 60 }, (_, i) => (
    //                         <option key={i} value={i < 10 ? `0${i}` : `${i}`}>{i < 10 ? `0${i}` : `${i}`}</option>
    //                     ))}
    //                 </select>
    //             </div>
    //             <div>
    //                 <Label value='Update Duration (Hours)' />
    //                 <TextInput type='text' placeholder='Duration' id='Duration' value={formData.duration} onChange={handleChange} name="duration" />
    //                 {durationErrorMessage && <div className="text-red-500">{durationErrorMessage}</div>}
    //             </div>
    //             <div>
    //                 <Label value='Update Budget (Rs.)' />
    //                 <TextInput type='text' placeholder='Budget' id='Budget' value={formData.budget} onChange={handleChange} name="budget"  />
    //                 {budgetErrorMessage && <div className="text-red-500">{budgetErrorMessage}</div>}
    //             </div>
    //             <div>
    //                 <Label value='Update Ticket Price (Rs.)' />
    //                 <TextInput type='text' placeholder='Ticket Price' id='TicketPrice' value={formData.ticketPrice} onChange={handleChange} name="ticketPrice" />
    //                 {ticketPriceErrorMessage && <div className="text-red-500">{ticketPriceErrorMessage}</div>}
    //             </div>
    //             <div>
    //                 <Label value='Update Ticket Quantity' />
    //                 <TextInput type='text' placeholder='Ticket Quantity' id='TicketQuantity' value={formData.ticketQuantity} onChange={handleChange} name="ticketQuantity" />
    //                 {ticketQuantityErrorMessage && <div className="text-red-500">{ticketQuantityErrorMessage}</div>}
    //             </div>
    //             <div>
    //                 <Label value='Update Entertainer' />
    //                 <TextInput type='text' placeholder='Entertainer' id='Entertainer' value={formData.entertainer} onChange={handleChange} name="entertainer"/>
    //             </div>
    //             <div>
    //                 <Label value='Update Description' />
    //                 <TextInput type='text' placeholder='Description' id='Description' value={formData.description} onChange={handleChange} name="description"/> 
    //             </div>
    //             <div className="flex justify-between">
    //                 <button type="reset" className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 mr-2 rounded w-full md:w-1/2 " id="clearbtn" onClick={handleUpdateEventForm}> Clear </button>
    //                 <button type="submit" className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 ml-2 rounded w-full md:w-1/2 "> Update Event </button>
    //             </div>
    //             {errorMessage && <Alert className='mt-5' color='failure'>{errorMessage}</Alert>}
    //         </form>
    //     </div>
    // </div>
//   );
// }

// export default UpdateEvent;


// import React, { useState, useEffect } from 'react';
// import { Alert, Label, TextInput } from 'flowbite-react';
// import axios from 'axios';

// // const UpdateEvent = ({ eventId, eventName }) => {
//   const UpdateEvent = () => {
//     const [eventDetails, setEventDetails] = useState({
//         eventDate: '',
//         startTime: '',
//         duration: '',
//         budget: '',
//         ticketPrice: '',
//         ticketQuantity: '',
//         entertainer: '',
//         description: '',
//     });
//     const [errorMessage, setErrorMessage] = useState('');
//     const [durationErrorMessage, setDurationErrorMessage] = useState('');
//     const [budgetErrorMessage, setBudgetErrorMessage] = useState('');
//     const [ticketPriceErrorMessage, setTicketPriceErrorMessage] = useState('');
//     const [ticketQuantityErrorMessage, setTicketQuantityErrorMessage] = useState('');

//   // const handleUpdateEventForm = () => {
//   //   setEventDetails({
//   //     ...eventDetails,
//   //     eventDate: '',
//   //     startTime: '',
//   //     duration: '',
//   //     budget: '',
//   //     ticketPrice: '',
//   //     ticketQuantity: '',
//   //     entertainer: '',
//   //     description: '',
//   //   }); 
//   //   setErrorMessage('');
//   //   setBudgetErrorMessage('');
//   //   setTicketPriceErrorMessage('');
//   //   setTicketQuantityErrorMessage('');
//   //   setDurationErrorMessage('');
//   // };


//   // Fetch existing event details from the backend
//   useEffect(() => {
//     fetch(`http://localhost:8080/api/events/get/${eventID}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setEventDetails(data); // Set existing event details in state
//       })
//       .catch((error) => {
//         console.error('Error fetching event details:', error);
//       });
//   }, [eventID]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEventDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));

//     if (name === 'budget'){
//       if (value !== '' && !/^\d+(\.\d{1,2})?$/.test(value)) {
//         setBudgetErrorMessage('Budget must be a valid number with up to two decimal places.');
//       }else{
//         setBudgetErrorMessage('');
//       }
//     }else if (name === 'ticketPrice'){
//       if (value !== '' && !/^\d+(\.\d{1,2})?$/.test(value)) {
//         setTicketPriceErrorMessage('Ticket price must be a valid number with up to two decimal places.');
//       }else{
//         setTicketPriceErrorMessage('');
//       }
//     }else if (name === 'duration'){
//       if (value !== '' && !/^\d+(\.\d{1,2})?$/.test(value)) {
//         setDurationErrorMessage('Duration must be a valid number with up to two decimal places.');
//       }else{
//         setDurationErrorMessage('');
//       }
//     }else if (name === 'ticketuantity'){
//       if (value !== '' && !/^\d+$/.test(value)) {
//         setTicketQuantityErrorMessage('Ticket quantity must be a valid integer.');
//       }else{
//         setTicketQuantityErrorMessage('');
//       }
//   };
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // fetch(`http://localhost:8080/api/events/update/${eventId}`, {
//       fetch(`http://localhost:8080/api/events/update`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(eventDetails),
//     })
//       .then((response) => response.json())
//       .then((updatedData) => {
//         setErrorMessage(`Successfully updated event: ${eventDetails.eventName}`);
//         // Handle success (e.g., show a success message)
//       })
//       .catch((error) => {
//         setErrorMessage(`Error updating event: ${eventDetails.eventName}`);
//         // Handle error (e.g., show an error message)
//       });
//   };

//   return (
//     <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row w-full '>
//         <div className='flex-1 flex justify-center'>
//             <form className='flex flex-col gap-4 w-full' onSubmit={handleSubmit}>
//                 <h1 className='flex justify-center text-3xl font-bold mb-4 '> Update Event </h1> <hr />
//                 <div>
//                     <Label value= 'Event ID' />
//                     <TextInput readOnly />
//                 </div>
//                 <div>
//                     <Label value= 'Event Name' />
//                     <TextInput readOnly/>
//                 </div>
//                 <div>
//                     <Label value='Update Event Date' />
//                     <TextInput type='date' placeholder='Event Date' id='EventDate' value={eventDetails.eventDate} onChange={handleInputChange} name="eventDate" className='text-gray-400' />
//                 </div>
//                 <div>
//                     <Label value='Update Starting Time' /> <br/>
//                      <select className="border rounded-md dark:bg-gray-600 dark:font-white" onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}>
//                         {Array.from({ length: 24 }, (_, i) => (
//                             <option key={i} value={i < 10 ? `0${i}:00` : `${i}:00`}>{i < 10 ? `0${i}` : `${i}`}</option>
//                         ))}
//                     </select>
//                     <span className="text-xl font-bold">:</span>
//                     <select className="border rounded-md dark:bg-gray-600 dark:font-white" onChange={(e) => setFormData({ ...formData, startTime: `${formData.startTime.split(':')[0]}:${e.target.value}` })} >
//                         {Array.from({ length: 60 }, (_, i) => (
//                             <option key={i} value={i < 10 ? `0${i}` : `${i}`}>{i < 10 ? `0${i}` : `${i}`}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <Label value='Update Duration (Hours)' />
//                     <TextInput type='text' placeholder='Duration' id='Duration' value={eventDetails.duration} onChange={handleInputChange} name="duration" />
//                     {durationErrorMessage && <div className="text-red-500">{durationErrorMessage}</div>}
//                 </div>
//                 <div>
//                     <Label value='Update Budget (Rs.)' />
//                     <TextInput type='text' placeholder='Budget' id='Budget' value={eventDetails.budget} onChange={handleInputChange} name="budget"  />
//                     {budgetErrorMessage && <div className="text-red-500">{budgetErrorMessage}</div>}
//                 </div>
//                 <div>
//                     <Label value='Update Ticket Price (Rs.)' />
//                     <TextInput type='text' placeholder='Ticket Price' id='TicketPrice' value={eventDetails.ticketPrice} onChange={handleInputChange} name="ticketPrice" />
//                     {ticketPriceErrorMessage && <div className="text-red-500">{ticketPriceErrorMessage}</div>}
//                 </div>
//                 <div>
//                     <Label value='Update Ticket Quantity' />
//                     <TextInput type='text' placeholder='Ticket Quantity' id='TicketQuantity' value={eventDetails.ticketQuantity} onChange={handleInputChange} name="ticketQuantity" />
//                     {ticketQuantityErrorMessage && <div className="text-red-500">{ticketQuantityErrorMessage}</div>}
//                 </div>
//                 <div>
//                     <Label value='Update Entertainer' />
//                     <TextInput type='text' placeholder='Entertainer' id='Entertainer' value={eventDetails.entertainer} onChange={handleInputChange} name="entertainer"/>
//                 </div>
//                 <div>
//                     <Label value='Update Description' />
//                     <TextInput type='text' placeholder='Description' id='Description' value={eventDetails.description} onChange={handleInputChange} name="description"/> 
//                 </div>
//                 <div className="flex justify-between">
//                     <button type="reset" className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 mr-2 rounded w-full md:w-1/2 " id="clearbtn" onClick={handleUpdateEventForm}> Clear </button>
//                     <button type="submit" className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 ml-2 rounded w-full md:w-1/2 "> Update Event </button>
//                 </div>
//                 {errorMessage && <Alert className='mt-5' color='failure'>{errorMessage}</Alert>}
//             </form>
//         </div>
//     </div>
//   );
// };

// export default UpdateEvent;