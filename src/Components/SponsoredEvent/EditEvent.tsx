import React from 'react';
import EventCreationForm from './CreateEvent';
import { useLocation } from 'react-router-dom';

const EditEvent = () => {
  const location = useLocation();
  const eventToEdit = location.state?.event;  // Retrieve the event passed through navigate

  return (
    <div>
      <EventCreationForm eventToEdit={eventToEdit} />
    </div>
  );
};

export default EditEvent;
