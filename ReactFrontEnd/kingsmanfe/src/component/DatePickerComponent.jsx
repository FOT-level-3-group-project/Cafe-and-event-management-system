// CalendarOnly.jsx

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import InventoryManagerPopupWindow from './InventoryManagerPopupWindow';


const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDateToISO = (date) => {
    return date.toISOString();
  };

  const handleSubmit = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <h2>Calendar Component</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        inline
      />
      <button onClick={handleSubmit}>Submit</button>

      {isPopupOpen && (
        <InventoryManagerPopupWindow
            selectedDate={formatDateToISO(selectedDate)}
            onClose={closePopup}
        />
      )}
    </div>
  );
};

export default DatePickerComponent;
