import{ useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UpdateEvent from './UpdateEvent';

const ViewAllEvents = () => {
    const [events, setEvents] = useState([]);
    
    //search bar
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('');

    //get eventID
    const [selectedEventId, setSelectedEventId] = useState(null);
    const handleUpdateClick = (eventId) => {
        setSelectedEventId(eventId);
    };

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
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="container mx-auto px-4 py-8 flex justify-between items-center ">
                <h1 className="text-3xl font-bold mb-4 ">Manage Events</h1>

                <div className="flex items-center">
                    {/* Add search bar */}
                    <div className='flex-grow px-4 py-2 border rounded-full dark:bg-gray-600 '>
                        <input type="search" placeholder="Search Event..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} id="search"   className='flex-grow px-4 py-2 border-none outline-none focus:ring-0 dark:bg-gray-600 dark:text-white' />   
                    </div>
            
                    {/* Add Event button */}
                    <Link to="/manager?tab=add-event" className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 ml-2 rounded  px-4 ">Add Event</Link>
                </div>
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full table-auto text-gray-700 dark:text-white-400 border-collapse bg-gray-50 ">
                    <thead className="text-gray-700 text-sm uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-700">
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700">
                            <th className="px-4 py-2 text-center bg-gray-200">ID</th>
                            <th className="px-4 py-2 text-center bg-gray-200">Name</th>
                            <th className="px-4 py-2 text-center bg-gray-200">Date</th>
                            <th className="px-4 py-2 text-center bg-gray-200">Starting Time</th>
                            <th className="px-4 py-2 text-center bg-gray-200">Duration (h)</th>
                            <th className="px-4 py-2 text-center bg-gray-200">Budget (Rs.)</th>
                            <th className="px-4 py-2 text-center bg-gray-200">Ticket Price (Rs.)</th>
                            <th className="px-4 py-2 text-center bg-gray-200">Quantity</th>
                            <th className="px-4 py-2 text-center bg-gray-200 w-32">Entertainer</th>
                            <th className="px-4 py-2 text-center bg-gray-200"> Description</th>
                            <th className="px-4 py-2 text-center bg-gray-200" colSpan='2'>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {events.filter(event => {
                            // Filter events based on the search query
                            if (!searchQuery) {
                                return true; // Return all events if there's no search query
                            } else {
                                // Check if any of the event properties contain the search query
                                return Object.values(event).some( value =>
                                    value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
                                );
                            }
                        })
                        .map((event, index) => (
                            <tr key={event.eventID} className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-600 dark:text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}>
                                <td className="px-4 py-2">{event.eventID}</td>
                                <td className="px-4 py-2">{event.eventName}</td>
                                <td className="px-4 py-2">{event.eventDate}</td>
                                <td className="px-4 py-2">{event.startTime}</td>
                                <td className="px-4 py-2">{event.duration}</td>
                                <td className="px-4 py-2">{event.budget}</td>
                                <td className="px-4 py-2">{event.ticketPrice}</td>
                                <td className="px-4 py-2">{event.ticketQuantity}</td>
                                <td className="px-4 py-2">{event.entertainer}</td>
                                <td className="px-4 py-2">{event.eventDescription}</td>
                                <td className="px-6 py-4 text-right">
                                    <a href="manager?tab=update-event" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={selectedEventId}>Update</a>
                                    {/* <Link to={`/manager?tab=update-event&eventId=${event.eventID}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update</Link> */}
                                </td>
                                <td className="px-6 py-4 text-right"> 
                                    <button onClick={() => handleDelete(event.eventID)} className="font-medium text-red-800 dark:text-red-500 hover:underline">Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default ViewAllEvents;
