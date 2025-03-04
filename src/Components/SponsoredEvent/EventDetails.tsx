import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetail: React.FC = () => {
  const { eventId } = useParams();
  return (
    <div>
      <h2>Event Details for {eventId}</h2>
      {/* Fetch and display event details based on eventId */}
    </div>
  );
};

export default EventDetail;
