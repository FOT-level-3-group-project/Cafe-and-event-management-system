// CalendarOnly

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import InventoryManagerPopupWindow from './InventoryManagerPopupWindow';


const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  //conslole
  console.log(selectedDate);

  return (
    <div>
      <h4>Select the date -</h4>
      <div className="container text-center">
        <DatePicker
          className="mx-auto"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy/MM/dd"
          inline
        />


      </div>
      <br />

      <div className='text-center'><button onClick={handleSubmit} className="mt-3 btn btn-success ">Submit</button></div>
      <div className='shadow'> 
        {isPopupOpen && (
          <InventoryManagerPopupWindow
            selectedDate={selectedDate}
            onClose={closePopup}
          />

        )}
      </div>

    </div>
  );
};

export default DatePickerComponent;
