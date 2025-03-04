import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EventCreationForm = ({ handleCreateEventComp, eventToEdit }: any) => {
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Populate the form when editing an event
  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        ...eventToEdit
      });
    }
  }, [eventToEdit]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle schedule type selection
  const selectScheduleType = (type) => {
    setFormData(prev => ({
      ...prev,
      scheduleType: type
    }));
    setScheduleTypeOpen(false);
  };

  // Handle image upload
  const handleImageUpload = (e, field) => {
    const files = e.target.files;
    if (field === 'rootsPosters' || field === 'eventPosters') {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], ...Array.from(files)]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: files[0]
      }));
    }
  };

  // Remove image
  const removeImage = (field, index) => {
    if (field === 'rootsPosters' || field === 'eventPosters') {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  // Create or Update event handler
  const handleCreateOrEditEvent = () => {
    setLoading(true);

    setTimeout(() => {
      console.log(eventToEdit ? 'Event updated with data:' : 'Event created with data:', formData);
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 1500);
  };

  // Cancel form handler
  const handleCancel = () => {
    navigate(`/sponsored-event/events-list`);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg">
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {eventToEdit ? 'Event updated successfully!' : 'Event created successfully!'}
        </div>
      )}

      <div className="flex items-center mb-4">
        <button className="mr-4" onClick={handleCancel}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 19L5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h2 className="text-lg font-medium">{eventToEdit ? 'Edit Event' : 'Create Event'}</h2>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          placeholder="Event Name"
          className="w-full border rounded p-2"
        />

        <div className="flex items-center">
          <label className="w-32">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select Country</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="India">India</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="w-32">Scheduled Type</label>
          <button className="w-full border rounded p-2 text-left" onClick={() => setScheduleTypeOpen(!scheduleTypeOpen)}>
            {formData.scheduleType || "Select Schedule Type"}
          </button>
          {scheduleTypeOpen && (
            <div className="absolute bg-white border rounded mt-1 w-full">
              <ul>
                <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => selectScheduleType("Up Coming Event")}>Up Coming Event</li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => selectScheduleType("On-Going Event")}>On-Going Event</li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <label className="w-32">Post Type</label>
          <select
            name="postType"
            value={formData.postType}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="Video">Video</option>
            <option value="Image">Image</option>
            <option value="Text">Text</option>
          </select>
        </div>

        <div>
          <label>From:</label>
          <input type="text" name="fromDate" value={formData.fromDate} onChange={handleChange} className="w-full border rounded p-2" />
        </div>

        <div>
          <label>To:</label>
          <input type="text" name="toDate" value={formData.toDate} onChange={handleChange} className="w-full border rounded p-2" />
        </div>

        <div className="space-y-2 mt-4">
          <button className="w-full bg-blue-300 text-white rounded-full py-3 font-medium" onClick={handleCreateOrEditEvent} disabled={loading}>
            {loading ? "Processing..." : eventToEdit ? "Update Event" : "Create Event"}
          </button>
          <button className="w-full bg-blue-500 text-white rounded-full py-3 font-medium" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCreationForm;
