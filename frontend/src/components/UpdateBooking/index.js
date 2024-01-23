import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UpdateBookingModal = ({ startDate, endDate, bookingId, onUpdate }) => {
  const isTodayOrLater = (date) => {
    const today = new Date().setHours(0, 0, 0, 0);
    return new Date(date).setHours(0, 0, 0, 0) >= today;
  };

  const [newStartDate, setNewStartDate] = useState(null);
  const [newEndDate, setNewEndDate] = useState(null);

  useEffect(() => {
    setNewStartDate(startDate ? new Date(startDate) : null);
    setNewEndDate(endDate ? new Date(endDate) : null);
  }, [startDate, endDate]);

  const handleUpdate = () => {
    onUpdate({
      bookingId,
      newStartDate,
      newEndDate,
    });
  };

  return (
    <div>
      <h3>Update Booking</h3>
      <div>
        <label>Start Date:</label>
        <DatePicker
          selected={newStartDate}
          onChange={(date) => setNewStartDate(date)}
          placeholderText="Select start date"
        />
      </div>
      <div>
        <label>End Date:</label>
        <DatePicker
          selected={newEndDate}
          onChange={(date) => setNewEndDate(date)}
          placeholderText="Select end date"
        />
      </div>
      <button onClick={handleUpdate}>Update Booking</button>
    </div>
  );
};

export default UpdateBookingModal;

