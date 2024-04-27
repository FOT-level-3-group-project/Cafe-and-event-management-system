import React, { useEffect, useState } from 'react';
import { Alert, Label, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GenerateTicketPriceModel from './GenerateTicketPriceModel';

const AddEvent = () => {
  const [formData, setFormData] = useState({
    eventID: 'event',
    eventIDNumber: '',
    eventName: '',
    eventDate: '',
    startTime: '',
    duration: '',
    budget: '',
    ticketPrice: '',
    ticketQuantity: '',
    entertainer: '',
    description: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [durationErrorMessage, setDurationErrorMessage] = useState('');
  const [budgetErrorMessage, setBudgetErrorMessage] = useState('');
  const [ticketPriceErrorMessage, setTicketPriceErrorMessage] = useState('');
  const [ticketQuantityErrorMessage, setTicketQuantityErrorMessage] = useState('');
  const [showTicketPriceModal, setShowTicketPriceModal] = useState(false);


  // const handleClear = () => {
  //     setFormData({
  //       eventIDNumber: '',
  //       eventName: '',
  //       eventDate: '',
  //       startTime: '',
  //       duration: '',
  //       budget: '',
  //       ticketPrice: '',
  //       ticketQuantity: '',
  //       entertainer: '',
  //       description: '',
  //     }); 
  //     setErrorMessage('');
  //     setBudgetErrorMessage('');
  //     setTicketPriceErrorMessage('');
  //     setTicketQuantityErrorMessage('');
  //     setDurationErrorMessage('');
  // };

  const handleShowTicketPriceModal = () => {
  setShowTicketPriceModal(true);
};

const handleCloseTicketPriceModal = () => {
  setShowTicketPriceModal(false);
};

const handleTicketPriceChange = (price) => {
    setFormData({
      ...formData,
      ticketPrice: price,
    });
  };


  const handleChange = (e) => {
    console.log(e.target.value);  
    const { name, value } = e.target;
    let errorMessage = '';

    if (name === 'eventID') {
      // Extract the number part of the eventID entered by the user
      const eventIDNumber = value.replace(/\D/g, '');
      // Update the eventID in the formData by concatenating the 'event' part and the user-entered number part
      setFormData({
        ...formData,
        eventID: `event${eventIDNumber.padStart(3, '0')}`, // Concatenate 'event' with the updated number part
      });
    } 

    if (name === 'budget'){
      if (value !== '' && !/^\d+(\.\d{1,2})?$/.test(value)) {
        setBudgetErrorMessage('Budget must be a valid number with up to two decimal places.');
      }else{
        setBudgetErrorMessage('');
      }
    }else if (name === 'ticketPrice'){
      if (value !== '' && !/^\d+(\.\d{1,2})?$/.test(value)) {
        setTicketPriceErrorMessage('Ticket price must be a valid number with up to two decimal places.');
      }else{
        setTicketPriceErrorMessage('');
      }
    }else if (name === 'duration'){
      if (value !== '' && !/^\d+(\.\d{1,2})?$/.test(value)) {
        setDurationErrorMessage('Duration must be a valid number with up to two decimal places.');
      }else{
        setDurationErrorMessage('');
      }
    }else if (name === 'ticketuantity'){
      if (value !== '' && !/^\d+$/.test(value)) {
        setTicketQuantityErrorMessage('Ticket quantity must be a valid integer.');
      }else{
        setTicketQuantityErrorMessage('');
      }
    }

    // For the time selects
    if (name === 'startTime') {
      // Split the selected time into hours and minutes
      const [selectedHour, selectedMinute] = formData.startTime.split(':');
      const selectedTime = value.replace(/^:/, '');
      setFormData({
        ...formData,
        startTime: selectedTime,
      });
    } else{
      setFormData({
        ...formData,
        [name]: value,
      });
      setErrorMessage(errorMessage); 
    };
  };


    const handleSubmit = async (e) => {
      e.preventDefault();
      // handleAddEventForm();

      // Concatenate 'event' with the manually entered number to form the complete event ID
      const completeEventID = formData.eventID + formData.eventIDNumber.padStart(3, '0');

      try {
          const response = await axios.post('http://localhost:8080/api/add-event', formData);
          console.log(response.data);
          const successMessage = `Successfully added event ${formData.eventName}`;
          setErrorMessage(successMessage);
      } catch (error) {
          if (error.response && error.response.data && error.response.data.error) {
              // Extract the error message from the response data and display it
              setErrorMessage(error.response.data.error);
          } else if (error.request) {
              // This usually indicates a network error or the server did not respond
              console.log(error.request);
              setErrorMessage('Network error occurred. Please try again later.');
          } else {
              // Something happened in setting up the request that triggered an error
              console.log('Error', error.message);
              setErrorMessage('Failed to add event. Please try again later.');
          };
      }
          };
    useEffect(() => {
        setFormData({
            ...formData,
        });
    }, []);

    return (
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row w-full '>
            <div className='flex-1 flex justify-center'>
                <form className='flex flex-col gap-4 w-full' onSubmit={handleSubmit}>
                    <h1 className='flex justify-center text-3xl font-bold mb-4 '> Add New Event</h1> <hr></hr>
                        
                        <div>
                          <Label value='Event ID*' />
                          <TextInput type='text' placeholder='Event ID' id='EventID' value={formData.eventID} onChange={handleChange} name="eventID" required />
                        </div>

                        <div>
                            <Label value='Event Name*' />
                            <TextInput type='text' placeholder='Event Name' id='EventName' value={formData.eventName} onChange={handleChange} name="eventName" required />
                        </div>

                        <div>
                            <Label value='Event Date*' />
                             <TextInput type='date' placeholder='Event Date' id='EventDate' value={formData.eventDate} onChange={handleChange} name="eventDate" className='text-gray-400' />
                        </div>

                        <div>
                          <Label value='Starting Time*' /> <br />
                          <select
                            className="border rounded-md dark:bg-gray-600 dark:font-white"
                            onChange={(e) => handleChange({ target: { name: 'startTime', value: e.target.value } })}
                          >
                            {Array.from({ length: 24 }, (_, i) => (
                              <option key={i} value={i < 10 ? `0${i}:00` : `${i}:00`}>{i < 10 ? `0${i}:00` : `${i}:00`}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                           <Label value='Duration (Hours)' />
                            <TextInput type='text' placeholder='Duration' id='Duration' value={formData.duration} onChange={handleChange} name="duration" />
                            {durationErrorMessage && <div className="text-red-500">{durationErrorMessage}</div>}
                        </div>

                        <div>
                            <Label value='Budget (Rs.)' />
                            <TextInput type='text' placeholder='Budget' id='Budget' value={formData.budget} onChange={handleChange} name="budget"  />
                            {budgetErrorMessage && <div className="text-red-500">{budgetErrorMessage}</div>}
                        </div>

                        <div>
                            <Label value='Ticket Quantity' />
                            <TextInput type='text' placeholder='Ticket Quantity' id='TicketQuantity' value={formData.ticketQuantity} onChange={handleChange} name="ticketQuantity" />
                            {ticketQuantityErrorMessage && <div className="text-red-500">{ticketQuantityErrorMessage}</div>}
                        </div>

                        <div>
                            <Label value='Entertainer' />
                            <TextInput type='text' placeholder='Entertainer' id='Entertainer' value={formData.entertainer} onChange={handleChange} name="entertainer"/>
                        </div>

                        <div>
                            <Label value='Description' />
                            <TextInput type='text' placeholder='Description' id='Description' value={formData.description} onChange={handleChange} name="description"/> 
                        </div>

                      
                        <div>
                            <Label value='Ticket Price (Rs.)' />
                            <div className="flex justify-between">
                             <TextInput type='text' placeholder='Ticket Price' value={formData.ticketPrice} onChange={handleChange} name="ticketPrice" className='mt-2 h-10 w-1/2'/>
                           <button type="button" className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded w-1/2 mt-2 h-10 " onClick={handleShowTicketPriceModal}> Calculate Ticket Price </button>
                            <GenerateTicketPriceModel show={showTicketPriceModal} onClose={handleCloseTicketPriceModal} onTicketPriceChange={handleTicketPriceChange}/>        
                          </div>
                        </div>
                        
                    <div className="flex justify-between">
                        {/* <button type="reset" className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 mr-2 rounded w-full md:w-1/2 " id="clearbtn" onClick={handleClear}> Clear </button> */}
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 ml-2 rounded w-full "> Add Event </button>
                    </div>
                    {errorMessage && (
                    <Alert className='mt-5' color='failure'>
                        {errorMessage}
                    </Alert>
                )}
                </form> 
            </div>
        </div>
    );
}


export default AddEvent;
