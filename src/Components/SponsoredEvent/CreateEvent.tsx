import React, { useState, useEffect } from 'react';

const EventCreationForm = ({ handleCreateEventComp, eventToEdit }: any) => {
  const [scheduleTypeOpen, setScheduleTypeOpen] = useState(false);
  const [formData, setFormData] = useState({
    eventName: '',
    country: '',
    scheduleType: '',
    postType: 'Video',
    rootsPosters: [],
    eventPosters: [],
    termsImage: null,
    fromDate: '13 Aug 2021, 10:00 AM',
    toDate: '28 Aug 2021, 10:00 AM'
  });

  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        ...eventToEdit,
      });
    }
  }, [eventToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateEvent = () => {
    console.log('Event created or edited:', formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg">
      <div className="mb-4">
        <input
          type="text"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          placeholder="Event Name"
          className="w-full border rounded p-2"
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="w-32">Country</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full appearance-none border rounded p-2 pr-8 bg-white"
        >
          <option value="USA">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          <option value="India">India</option>
        </select>
      </div>

      {/* Add more form fields as needed */}

      <div className="space-y-2 mt-4">
        <button
          className="w-full bg-blue-300 text-white rounded-full py-3 font-medium"
          onClick={handleCreateEvent}
        >
          {eventToEdit ? 'Update Event' : 'Create Event'}
        </button>
        <button
          className="w-full bg-blue-500 text-white rounded-full py-3 font-medium"
          onClick={handleCreateEventComp}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EventCreationForm;
