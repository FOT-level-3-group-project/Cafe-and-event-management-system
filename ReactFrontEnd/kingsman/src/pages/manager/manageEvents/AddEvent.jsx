import React, { useEffect, useState } from 'react';
import { Alert, Label, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEvent = () => {
  const [formData, setFormData] = useState({
    event_name: '',
    event_type: '',
    event_date: '',
    start_time: '',
    end_time: '',
    budget: '',
    ticket_price: '',
    ticket_quantity: '',
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
        event_name: '',
        event_type: '',
        event_date: '',
        start_time: '',
        duration: '',
        budget: '',
        ticket_price: '',
        ticket_quantity: '',
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
      }else if (name === 'ticket_price'){
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
      }else if (name === 'ticket_quantity'){
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
            const response = await axios.post('http://localhost:8080/add-event', formData);
            console.log(response.data);
            const successMessage = `Successfully added event ${formData.event_name}`;
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
                            <TextInput type='text' placeholder='Event Name' id='EventName' value={formData.event_name} onChange={handleChange} name="event_name" required />
                        </div>
                        <div>
                            <Label value='Event Type' />
                            <TextInput type='text' placeholder='Event Type' id='EventType' value={formData.event_type} onChange={handleChange} name="event_type" />
                        </div>
                        <div>
                            <Label value='Event Date*' />
                             <TextInput type='date' placeholder='Joined Date' id='JoinedDate' className='text-gray-400' value={formData.event_date} onChange={handleChange} name="event_date"/>
                        </div>

                        {/* Time picker */}
                        <div>
                          <label for="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event time:</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                              </svg>
                            </div>
                            <input type="time" id="time" onChange={handleChange} name='start_time'
                              className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                              min="00:00"  max="23:59" 
                              required 
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
                            <TextInput type='text' placeholder='Ticket Price' id='TicketPrice' value={formData.ticket_price} onChange={handleChange} name="ticket_price" />
                            {ticketPriceErrorMessage && <div className="text-red-500">{ticketPriceErrorMessage}</div>}
                        </div>
                        <div>
                            <Label value='Ticket Quantity' />
                            <TextInput type='text' placeholder='Ticket Quantity' id='TicketQuantity' value={formData.ticket_quantity} onChange={handleChange} name="ticket_quantity" />
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
