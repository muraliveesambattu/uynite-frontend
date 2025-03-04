import React, { useState } from 'react';

const EventCreationForm = ({ handleCreateEventComp }: any) => {
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
      // For multiple image fields
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], ...Array.from(files)]
      }));
    } else {
      // For single image fields
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

  // Create event handler
  const handleCreateEvent = () => {
    setLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      console.log('Event created with data:', formData);
      setLoading(false);
      setSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 1500);
  };

  // Cancel form handler
  const handleCancel = () => {
    // Reset form or navigate back
    setFormData({
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
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg">
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Event created successfully!
        </div>
      )}

      <div className="flex items-center mb-4">
        <button className="mr-4" onClick={handleCreateEventComp}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 19L5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h2 className="text-lg font-medium">Event Type : <span className="font-bold">Sponsored Event</span></h2>
      </div>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            placeholder="Event Name"
            className="w-full border rounded p-2"
          />
        </div>

        <div className="flex items-center">
          <label className="w-32">Country</label>
          <div className="relative flex-1">
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full appearance-none border rounded p-2 pr-8 bg-white"
            >
              <option value="">Select Country</option>
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="India">India</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <label className="w-32">Scduled Type</label>
          <div className="relative flex-1">
            <button
              className="w-full border rounded p-2 text-left flex justify-between items-center"
              onClick={() => setScheduleTypeOpen(!scheduleTypeOpen)}
            >
              <span>{formData.scheduleType || "Select Scdule Type"}</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {scheduleTypeOpen && (
              <div className="absolute z-10 w-full bg-white border rounded mt-1">
                <ul>
                  <li
                    className="p-2 hover:bg-gray-100 cursor-pointer border-b"
                    onClick={() => selectScheduleType("Create Into List")}
                  >
                    Create Into List
                  </li>
                  <li
                    className="p-2 hover:bg-gray-100 cursor-pointer border-b"
                    onClick={() => selectScheduleType("Up Coming Event")}
                  >
                    Up Coming Event
                  </li>
                  <li
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectScheduleType("On-Going Event")}
                  >
                    On-Going Event
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <label className="w-32">Post Type</label>
          <select
            name="postType"
            value={formData.postType}
            onChange={handleChange}
            className="flex-1 border rounded p-2"
          >
            <option value="Video">Video</option>
            <option value="Image">Image</option>
            <option value="Text">Text</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Posters Display in Roots</label>
          <div className="border rounded p-8 flex flex-col items-center justify-center">
            {formData.rootsPosters.length > 0 ? (
              <div className="w-full">
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.rootsPosters.map((image, index) => (
                    <div key={index} className="relative">
                      <img src="/api/placeholder/80/80" alt="uploaded" className="w-20 h-20 object-cover rounded" />
                      <button
                        onClick={() => removeImage('rootsPosters', index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <label className="cursor-pointer text-center w-full block text-blue-500">
                  Add More
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'rootsPosters')}
                  />
                </label>
              </div>
            ) : (
              <label className="cursor-pointer">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
                <span className="text-sm">Add Image</span>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, 'rootsPosters')}
                />
              </label>
            )}
          </div>
          <div className="flex justify-center mt-2">
            <div className="h-2 w-2 rounded-full bg-gray-500 mx-1"></div>
            <div className="h-2 w-2 rounded-full bg-gray-300 mx-1"></div>
          </div>
        </div>

        <div>
          <label className="block mb-2">Posters Display into Event</label>
          <div className="border rounded p-8 flex flex-col items-center justify-center">
            {formData.eventPosters.length > 0 ? (
              <div className="w-full">
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.eventPosters.map((image, index) => (
                    <div key={index} className="relative">
                      <img src="/api/placeholder/80/80" alt="uploaded" className="w-20 h-20 object-cover rounded" />
                      <button
                        onClick={() => removeImage('eventPosters', index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <label className="cursor-pointer text-center w-full block text-blue-500">
                  Add More
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'eventPosters')}
                  />
                </label>
              </div>
            ) : (
              <label className="cursor-pointer">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
                <span className="text-sm">Add Image</span>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, 'eventPosters')}
                />
              </label>
            )}
          </div>
          <div className="flex justify-center mt-2">
            <div className="h-2 w-2 rounded-full bg-gray-500 mx-1"></div>
            <div className="h-2 w-2 rounded-full bg-gray-300 mx-1"></div>
          </div>
        </div>

        <div className="flex items-center">
          <label className="w-16">From :</label>
          <input
            type="text"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
            className="flex-1 border rounded p-2 text-xs"
          />
          <label className="w-16 ml-4">To :</label>
          <input
            type="text"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
            className="flex-1 border rounded p-2 text-xs"
          />
        </div>

        <div>
          <label className="block mb-2">Terms & Conditions</label>
          <div className="border rounded p-8 flex flex-col items-center justify-center">
            {formData.termsImage ? (
              <div className="relative w-full text-center">
                <img src="/api/placeholder/300/150" alt="terms" className="mx-auto mb-2 rounded" />
                <button
                  onClick={() => removeImage('termsImage')}
                  className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto"
                >
                  ×
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
                <span className="text-sm">Add Image</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, 'termsImage')}
                />
              </label>
            )}
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <button
            className="w-full bg-blue-300 text-white rounded-full py-3 font-medium flex items-center justify-center"
            onClick={handleCreateEvent}
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            Create Event
          </button>
          <button
            className="w-full bg-blue-500 text-white rounded-full py-3 font-medium"
            onClick={handleCreateEventComp}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCreationForm;