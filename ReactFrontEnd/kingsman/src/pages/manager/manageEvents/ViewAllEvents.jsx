import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Label, TextInput, Alert } from 'flowbite-react';
import { Table } from "flowbite-react";
// import UpdateEvent from './UpdateEvent';

const ViewAllEvents = () => {
    const [events, setEvents] = useState([]);
    const [eventToUpdate, setEventToUpdate] = useState(null); // State to hold event details for update

    const [errorMessage, setErrorMessage] = useState('');
    const [durationErrorMessage, setDurationErrorMessage] = useState('');
    const [budgetErrorMessage, setBudgetErrorMessage] = useState('');
    const [ticketPriceErrorMessage, setTicketPriceErrorMessage] = useState('');
    const [ticketQuantityErrorMessage, setTicketQuantityErrorMessage] = useState('');

    //search bar
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('');

    useEffect(() => {
        const viewEvents = async () => {
            try {
                let url = 'http://localhost:8080/api/events/view-events';
                if (searchQuery) {
                    url += `?${searchCriteria}=${searchQuery}`;
                }
                const response = await fetch(url);
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.log(error.message);
            }
        };
        viewEvents();
    }, [searchQuery, searchCriteria]);

    const handleDelete = async (eventID) => {
        if (window.confirm(`Are you sure you want to delete the event with event ID: ${eventID}?`)) {
            try {
                await axios.delete(`http://localhost:8080/api/events/delete/${eventID}`);
                setEvents(events.filter(event => event.eventID !== eventID));
            } catch (error) {
                console.error(error);
            }
        }
    }

     const handleUpdate = async (eventID) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/events/get/${eventID}`);
            const eventData = response.data;
            setEventToUpdate(eventData); // Set event details in the state
        } catch (error) {
            console.error(error);
        }
    }

    // Function to handle form submission for updating event
    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        try {
            // Make API call to update event with updated details
            await axios.put(`http://localhost:8080/api/events/update/${eventToUpdate.eventID}`, eventToUpdate);
            // Clear the eventToUpdate state and fetch updated events
            setEventToUpdate(null);
            viewAllEvents();
        } catch (error) {
            console.error(error);
        }
    };

    //handle search
    const handleSearch = async () => {
        try {
            let url = 'http://localhost:8080/api/events/view-events';
            if (searchQuery && searchCriteria) {
                url += `?${searchCriteria}=${searchQuery}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            setEvents(data);
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleChange = (e) => {
    // Update the eventToUpdate state with the new value based on the input's name
    setEventToUpdate({ ...eventToUpdate, [e.target.name]: e.target.value });
};

    // Function to fetch event details by eventID
    const fetchEventDetails = async (eventID) => {
        try {
            // Send a GET request to the backend endpoint to fetch event details
            const response = await axios.get(`http://localhost:8080/api/inform/get/${eventID}`);
            
            // Check if the response is successful
            if (response.status === 200) {
                return response.data; // Return event details
            } else {
                // Handle other response statuses if needed
                console.error('Unexpected response:', response);
                throw new Error('Failed to fetch event details');
            }
        } catch (error) {
            console.error('Error fetching event details:', error);
            throw new Error('Failed to fetch event details');
        }
    };

    // Function to handle sharing event details
    const handleShare = async (eventID) => {
        try {
            // Fetch event details
            const eventDetails = await fetchEventDetails(eventID);
            
            // Send a POST request to share event details
            const response = await axios.post('http://localhost:8080/api/inform/share-event-details', { eventID: eventID });
            
            // Check if the response is successful
            if (response.status === 200) {
                console.log(response.data);
                alert('Emails sent successfully!');
            } else {
                // Handle other response statuses if needed
                console.error('Unexpected response:', response);
                alert('Failed to send emails. Please try again later.');
            }
        } catch (error) {
            console.error('Error sending emails:', error);
            alert('Failed to send emails. Please try again later.');
        }
    };

    // Render form if eventToUpdate is not null
    if (eventToUpdate) {
        return (
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row w-full '>
            <div className='flex-1 flex justify-center'>
                <form className='flex flex-col gap-4 w-full' onSubmit={handleSubmitUpdate}>
                    <h1 className='flex justify-center text-3xl font-bold mb-4 '> Update Event </h1> <hr />
                    <div>
                        <Label value='Event ID' />
                        <TextInput type='text' id='EventID' value={eventToUpdate.eventID || ''} name='eventID' onChange={handleChange} readOnly />
                    </div>
                    <div>
                        <Label value='Event Name' />
                        <TextInput type='text' id='EventName' value={eventToUpdate.eventName || '' } name='eventName' onChange={handleChange} readOnly  />
                    </div>
                    <div>
                        <Label value='Update Event Date' />
                        <TextInput type='date' placeholder='Event Date' id='EventDate' value={eventToUpdate.eventDate || ''} onChange={handleChange} name="eventDate" className='text-gray-400' />
                    </div>
                    <div>
                        <Label value='Update Starting Time' /> <br/>
                        <select className="border rounded-md dark:bg-gray-600 dark:font-white" onChange={(e) => setEventToUpdate({ ...eventToUpdate, startTime: `${e.target.value}:${eventToUpdate.startTime ? eventToUpdate.startTime.split(':')[1] : ''}` })} value={eventToUpdate.startTime ? eventToUpdate.startTime.split(':')[0] : ''} >
                            {Array.from({ length: 24 }, (_, i) => (
                                <option key={i} value={i < 10 ? `0${i}` : `${i}`}>{i < 10 ? `0${i}` : `${i}`}</option>
                            ))}
                        </select>
                        <span className="text-xl font-bold">:</span>
                        <select className="border rounded-md dark:bg-gray-600 dark:font-white" onChange={(e) => setEventToUpdate({ ...eventToUpdate, startTime: `${eventToUpdate.startTime ? eventToUpdate.startTime.split(':')[0] : ''}:${e.target.value}` })} value={eventToUpdate.startTime ? eventToUpdate.startTime.split(':')[1] : ''} >
                            {Array.from({ length: 60 }, (_, i) => (
                                <option key={i} value={i < 10 ? `0${i}` : `${i}`}>{i < 10 ? `0${i}` : `${i}`}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <Label value='Update Duration (Hours)' />
                        <TextInput type='text' placeholder='Duration' id='Duration' value={eventToUpdate.duration || ''} onChange={handleChange} name="duration" />
                        {durationErrorMessage && <div className="text-red-500">{durationErrorMessage}</div>}
                    </div>
                    <div>
                        <Label value='Update Budget (Rs.)' />
                        <TextInput type='text' placeholder='Budget' id='Budget' value={eventToUpdate.budget || ''} onChange={handleChange} name="budget"  />
                        {budgetErrorMessage && <div className="text-red-500">{budgetErrorMessage}</div>}
                    </div>
                    <div>
                        <Label value='Update Ticket Price (Rs.)' />
                        <TextInput type='text' placeholder='Ticket Price' id='TicketPrice' value={eventToUpdate.ticketPrice || ''} onChange={handleChange} name="ticketPrice" />
                        {ticketPriceErrorMessage && <div className="text-red-500">{ticketPriceErrorMessage}</div>}
                    </div>
                    <div>
                        <Label value='Update Ticket Quantity' />
                        <TextInput type='text' placeholder='Ticket Quantity' id='TicketQuantity' value={eventToUpdate.ticketQuantity || ''} onChange={handleChange} name="ticketQuantity" />
                        {ticketQuantityErrorMessage && <div className="text-red-500">{ticketQuantityErrorMessage}</div>}
                    </div>
                    <div>
                        <Label value='Update Entertainer' />
                        <TextInput type='text' placeholder='Entertainer' id='Entertainer' value={eventToUpdate.entertainer || ''} onChange={handleChange} name="entertainer"/>
                    </div>
                    <div>
                        <Label value='Update Description' />
                        <TextInput type='text' placeholder='Description' id='Description' value={eventToUpdate.description || ''} onChange={handleChange} name="description"/> 
                    </div>
                    <div className="flex justify-between">
                        <button type="reset" className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 mr-2 rounded w-full md:w-1/2 " id="clearbtn" onClick={handleSubmitUpdate}> Clear </button>
                        <button type="submit" className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 ml-2 rounded w-full md:w-1/2 "> Update Event </button>
                    </div>
                    {errorMessage && <Alert className='mt-5' color='failure'>{errorMessage}</Alert>}
                </form>
            </div>
        </div>
        );
    }
    
    return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="container mx-auto px-4 py-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">Manage Events</h1>

        <div className="flex items-center">
          {/* Search bar */}
          <div className='flex-grow px-3 border rounded-full dark:bg-gray-600 '>
            <input 
              type="search" 
              placeholder="Search Event..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              id="search"   
              className='flex-grow px-4 py-2 border-none outline-none focus:ring-0 dark:bg-gray-600 dark:text-white' 
            />   
          </div>

          {/* Add Event button */}
          <Link to="/manager?tab=add-event" className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 ml-2 rounded px-4">Add Event</Link>
        </div>
      </div>

      <div className="relative overflow-x-auto drop-shadow-lg bg-slate-50">
        {/* <Table hoverable className='bg-gray-200 dark:bg-gray-700 dark:text-white overflow-x-auto mt-1' > */}
        <Table className='drop-shadow-lg' hoverable >
          <Table.Head>
            <Table.HeadCell  className='bg-green-100'>ID</Table.HeadCell>
            <Table.HeadCell  className='bg-green-100'>Name</Table.HeadCell>
            <Table.HeadCell  className='bg-green-100'>Date</Table.HeadCell>
            <Table.HeadCell  className='bg-green-100'>Starting Time</Table.HeadCell>
            <Table.HeadCell  className='bg-green-100'>Duration (h)</Table.HeadCell>
            <Table.HeadCell  className='bg-green-100'>Budget (Rs.)</Table.HeadCell>
            <Table.HeadCell  className='bg-green-100'>Ticket Price (Rs.)</Table.HeadCell>
            <Table.HeadCell  className='bg-green-100'>Quantity</Table.HeadCell>
            <Table.HeadCell  className='bg-green-100'>Entertainer</Table.HeadCell>
            <Table.HeadCell  className='bg-green-100'>Description</Table.HeadCell>
            <Table.HeadCell  className='bg-green-100 text-center' colSpan={3} >Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {events
              .filter(event => {
                // Filter events based on the search query
                if (!searchQuery) {
                  return true; // Return all events if there's no search query
                } else {
                  // Check if any of the event properties contain the search query
                  return Object.values(event).some(value =>
                    value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
                  );
                }
              })
              .map((event, index) => (
                <Table.Row key={event.eventID} >
                  <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{event.eventID}</Table.Cell>
                  <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{event.eventName}</Table.Cell>
                  <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{event.eventDate}</Table.Cell>
                  <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{event.startTime}</Table.Cell>
                  <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600' >{event.duration}</Table.Cell>
                  <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600' >{event.budget}</Table.Cell>
                  <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{event.ticketPrice}</Table.Cell>
                  <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{event.ticketQuantity}</Table.Cell>
                  <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{event.entertainer}</Table.Cell>
                  <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{event.description}</Table.Cell>
                  <Table.Cell className='dark:bg-gray-600'>
                    <button onClick={() => handleUpdate(event.eventID)} className="font-medium text-blue-600 dark:text-blue-400 hover:scale-110 "  >Update</button>
                  </Table.Cell>
                  <Table.Cell className='dark:bg-gray-600'> 
                    <button onClick={() => handleDelete(event.eventID)} className="font-medium text-red-800 dark:text-red-400 hover:scale-110">Remove</button>
                  </Table.Cell>
                  <Table.Cell className='dark:bg-gray-600'> 
                    <button onClick={() => handleShare(event.eventID)} className="font-medium text-green-800 dark:text-green-400 hover:scale-110">Share</button>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );

};

export default ViewAllEvents;