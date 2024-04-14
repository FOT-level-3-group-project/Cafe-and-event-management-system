import React, { useEffect, useState } from 'react';
import { Alert, Label, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEvent = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventType: '',
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

  const handleAddEventForm = () => {
      setFormData({
        eventName: '',
        eventType: '',
        eventDate: '',
        startTime: '',
        duration: '',
        budget: '',
        ticketPrice: '',
        ticketQuantity: '',
        entertainer: '',
        description: '',
      }); 
      setErrorMessage('');
      setBudgetErrorMessage('');
      setTicketPriceErrorMessage('');
      setTicketQuantityErrorMessage('');
      setDurationErrorMessage('');
  };

  const handleChange = (e) => {
    console.log("handleChange called");  
      const { name, value } = e.target;
      let errorMessage = '';

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

      setFormData({
        ...formData,
        [name]: value,
      });
      setErrorMessage(errorMessage); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleAddEventForm();

        try {
            const response = await axios.post('http://localhost:8080/api/add-event', formData);
            console.log(response.data);
            const successMessage = `Successfully added event ${formData.eventName}`;
            setErrorMessage(successMessage);
        } catch (error) {
            if (error.response) {
                // Extract the error message from the response data and display it
                setErrorMessage(error.response.data);
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
                    <h1 className='flex justify-center font-bold'> Add New Event</h1> <hr></hr>
                        <div>
                            <Label value='Event Name*' />
                            <TextInput type='text' placeholder='Event Name' id='EventName' value={formData.eventName} onChange={handleChange} name="eventName" required />
                        </div>
                        <div>
                            <Label value='Event Type' />
                            <TextInput type='text' placeholder='Event Type' id='EventType' value={formData.eventType} onChange={handleChange} name="eventType" />
                        </div>
                        <div>
                            <Label value='Event Date*' />
                             <TextInput type='date' placeholder='Event Date' id='EventDate' className='text-gray-400' value={formData.eventDate} onChange={handleChange} name="eventDate"/>
                        </div>

                        {/* Time picker */}
                        <div>
                          <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event time:</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                  <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                              </svg>
                            </div>
                            <input type="time" id="time" onChange={handleChange} name='startTime'
                              className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                              min="00:00"  max="23:59" 
                              // required 
                            />
                          </div>
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
                            <Label value='Ticket Price (Rs.)' />
                            <TextInput type='text' placeholder='Ticket Price' id='TicketPrice' value={formData.ticketPrice} onChange={handleChange} name="ticketPrice" />
                            {ticketPriceErrorMessage && <div className="text-red-500">{ticketPriceErrorMessage}</div>}
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
                    <div className="flex justify-between">
                        <button type="reset" className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 mr-2 rounded w-full md:w-1/2 " id="clearbtn" onClick={handleAddEventForm}> Clear </button>
                        <button type="submit" className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 ml-2 rounded w-full md:w-1/2 "> Register Employee </button>
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
