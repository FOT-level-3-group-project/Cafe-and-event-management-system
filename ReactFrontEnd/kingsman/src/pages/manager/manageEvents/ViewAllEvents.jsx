import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table } from 'flowbite-react';
import UpdateEventModal from './UpdateEventModal';
import DoneEventModal from './DoneEventModal';

const ViewAllEvents = () => {
    const [events, setEvents] = useState([]);
    const [showEventUpdateModal, setShowEventUpdateModal] = useState(false);
    const [eventToUpdate, setEventUpdate] = useState(null);

    //search bar
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('');

    const [showDoneModal, setShowDoneModal] = useState(false);
    const [eventToMarkDone, setEventToMarkDone] = useState(null);

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

    //Delete employee
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

    const handleUpdateClick = (event) => {
        setEventUpdate(event);  
        setShowEventUpdateModal(true);
    };

    const handleUpdateClose = () => {
        setShowEventUpdateModal(false);
    };

 const handleStatusChange = (event) => {
  setEventToMarkDone(event);
  setShowDoneModal(true);
};


   const handleDoneModalClose = () => {
        setShowDoneModal(false);
    };

    return (
      <div className="flex flex-col w-full bg-green-50 ">
      {/* topic and searchbar & filter */}
        <div className="flex items-center m-4 justify-between border-b bg-white dark:bg-gray-500 p-3 shadow-md rounded-md">
          <h1 className="text-2xl font-bold mb-2">Manage Events</h1>

          <div className="flex items-center">
            {/* Search bar */}
            <div className="flex-grow px-3 border rounded-full dark:bg-gray-600 ">
              <input
                type="search"
                placeholder="Search Event..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="search"
                className="flex-grow px-4 py-2 border-none outline-none focus:ring-0 dark:bg-gray-600 dark:text-white"
              />
            </div>

            {/* Add Event button */}
            <Link
              to="/manager?tab=add-event"
              className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 ml-2 rounded px-4"
            >
              Add Event
            </Link>
          </div>
        </div>
        {/* Table */}
        <div className="m-4 relative overflow-x-auto shadow-md bg-white rounded-md">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="bg-green-100">ID</Table.HeadCell>
              <Table.HeadCell className="bg-green-100">Name</Table.HeadCell>
              <Table.HeadCell className="bg-green-100">Date</Table.HeadCell>
              <Table.HeadCell className="bg-green-100"> Starting Time </Table.HeadCell>
              <Table.HeadCell className="bg-green-100"> Duration (h) </Table.HeadCell>
              <Table.HeadCell className="bg-green-100"> Budget (Rs.) </Table.HeadCell>
              <Table.HeadCell className="bg-green-100"> Ticket Price (Rs.) </Table.HeadCell>
              <Table.HeadCell className="bg-green-100"> Sold Ticket Qty.</Table.HeadCell>
              <Table.HeadCell className="bg-green-100"> Entertainer </Table.HeadCell>
              <Table.HeadCell className="bg-green-100"> Description </Table.HeadCell>
              <Table.HeadCell className="bg-green-100"> Status </Table.HeadCell> <Table.HeadCell
                className="bg-green-100 text-center"
                colSpan={3}
              ></Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {events
                .filter((event) => {
                  // Filter events based on the search query
                  if (!searchQuery) {
                    return true; // Return all events if there's no search query
                  } else {
                    // Check if any of the event properties contain the search query
                    return Object.values(event).some(
                      (value) =>
                        value &&
                        value
                          .toString()
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                    );
                  }
                })
                .map((event, index) => (
                  <Table.Row key={event.eventID} className={ index % 2 === 0 ? "bg-green-50 dark:bg-gray-500 dark:text-white" : "bg-gray-150 dark:bg-gray-700 dark:text-white" } >
                    <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600"> {event.eventID}</Table.Cell>
                    <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{event.eventName}</Table.Cell>
                    <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{event.eventDate}</Table.Cell>
                    <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{event.startTime}</Table.Cell>
                    <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{event.duration}</Table.Cell>
                    <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{event.budget}</Table.Cell>
                    <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{event.ticketPrice}</Table.Cell>
                    <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600"> {event.soldTicketQuantity}</Table.Cell>
                    <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600"> {event.entertainer}</Table.Cell>
                    <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{event.description}</Table.Cell>
                    <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">
                      <button onClick={() => handleStatusChange(event)} className="font-medium text-green-800 dark:text-green-400 hover:scale-110">
            Mark as Done
          </button>
                    </Table.Cell>
                    <Table.Cell className="dark:bg-gray-600">
                      <button onClick={() => handleUpdateClick(event)} className="font-medium text-blue-600 dark:text-blue-400 hover:scale-110 ">Update</button>
                    </Table.Cell>
                    <Table.Cell className="dark:bg-gray-600">
                      <button onClick={() => handleDelete(event.eventID)} className="font-medium text-red-800 dark:text-red-400 hover:scale-110" > Remove  </button>
                    </Table.Cell>
                    <Table.Cell className="dark:bg-gray-600">
                      <button onClick={() => handleShare(event.eventID)}  className="font-medium text-green-800 dark:text-green-400 hover:scale-110" > Share </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>

          {showEventUpdateModal && (
            <UpdateEventModal
              event={eventToUpdate}
              handleClose={handleUpdateClose}
            />
          )}
          
         {showDoneModal && (
  <DoneEventModal
    event={eventToMarkDone}
    handleClose={handleDoneModalClose}
  />
)}

        </div>
      </div>
    );

};

export default ViewAllEvents;
