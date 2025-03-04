import React, { useState, useEffect } from "react";
import BreadcrumbsWithFilter from "../Breadcrumbs";
import SidebarMenu from "../SidebarMenu";
import EventCard from "../EventCard";
import CreateEvent from "./CreateEvent";
import { useNavigate } from "react-router-dom";

const SponsoredEvent: React.FC = () => {
  const breadcrumbLinks = [
    { label: "Dashboard", path: "/" },
    { label: "Sponsored Event", path: "/sponsored-event" },
  ];
  const navigate = useNavigate()
  // State to manage active menu, selected event, and visibility of events
  const [activeMenu, setActiveMenu] = useState("Create Event and list");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleEvents, setVisibleEvents] = useState<any[]>([]); // Store visible events
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [createdEvents, setCreatedEvents] = useState<any[]>([
    // Manually added events
    {
      eventName: "Music Festival 2024",
      country: "USA",
      scheduleType: "Up Comming Event",
      postType: "Video",
      rootsPosters: ["rootPoster1.jpg", "rootPoster2.jpg"],
      eventPosters: ["eventPoster1.jpg", "eventPoster2.jpg"],
      termsImage: "termsImage.jpg",
      fromDate: "01 Jan 2024, 10:00 AM",
      toDate: "05 Jan 2024, 10:00 AM",
      category: "Up Comming Events",
    },
    {
      eventName: "Tech Innovation Awards",
      country: "India",
      scheduleType: "On-Going Event",
      postType: "Image",
      rootsPosters: ["techAwardRoot1.jpg"],
      eventPosters: ["techAwardEvent1.jpg"],
      termsImage: "techAwardTerms.jpg",
      fromDate: "10 Mar 2024, 09:00 AM",
      toDate: "15 Mar 2024, 06:00 PM",
      category: "On Going Event",
    },
    {
      eventName: "Startup Pitch Fest",
      country: "Europe",
      scheduleType: "Completed Event",
      postType: "Text",
      rootsPosters: ["pitchFestRoot1.jpg"],
      eventPosters: ["pitchFestEvent1.jpg"],
      termsImage: "pitchFestTerms.jpg",
      fromDate: "20 Dec 2023, 10:00 AM",
      toDate: "25 Dec 2023, 10:00 AM",
      category: "Completed Events",
    },
  ]);

  // Effect to filter events based on active menu
  useEffect(() => {
    if (activeMenu === "Create Event and list") {
      setVisibleEvents(createdEvents); // Show all created events
    } else {
      const filtered = createdEvents.filter(event => event.category === activeMenu);
      setVisibleEvents(filtered);
    }
  }, [activeMenu, createdEvents]);

  // Handle menu selection (filtering events by category)
  const handleMenuClick = (menuLabel: string) => {
    navigate(menuLabel);
    setActiveMenu(menuLabel);
    setSelectedEvent(null); // Clear selected event when switching menus
  };

  // Toggle visibility of the event creation form
  const handleCreateEvent = () => {
    setShowCreateEvent(!showCreateEvent);
  };

  // Handle event creation and add it to the list of created events
  const handleEventCreated = (eventData: any) => {
    const eventWithCategory = { ...eventData, category: eventData.scheduleType || "Up Comming Events" }; // Default to "Up Comming Events" if no category
    setCreatedEvents(prev => [...prev, eventWithCategory]); // Add new event to the list
    setShowCreateEvent(false);  // Hide the create event form after creation
  };

  // Menu items for filtering events by category
  const menuItems: any = [
    { label: "Create Event and list", onClick: () => handleMenuClick("create-event"), active: activeMenu === "create-event" },
    { label: "Up Comming Events", onClick: () => handleMenuClick("upcoming-events"), active: activeMenu === "upcoming-events" },
    { label: "On Going Event", onClick: () => handleMenuClick("ongoing-events"), active: activeMenu === "ongoing-events" },
    { label: "Completed Events", onClick: () => handleMenuClick("completed-events"), active: activeMenu === "completed-events" },
  ];

  const handleSelectEvent = (event: any) => {
    console.log(event)
    setSelectedEvent(event.eventName)
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Breadcrumb Navigation */}
      <BreadcrumbsWithFilter links={breadcrumbLinks} />

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar */}
        <div className="col-span-1">
          <SidebarMenu menuItems={menuItems} />
        </div>

        {/* Event List or Event Detail View */}
        <div className="col-span-2 bg-white rounded shadow p-6">
          {showCreateEvent ? (
            <CreateEvent handleCreateEventComp={handleCreateEvent} handleEventCreated={handleEventCreated} />
          ) : selectedEvent ? (
            <div>
              {/* Display the selected event details */}
              <h2 className="text-xl font-semibold">Event Details</h2>
              <p>{selectedEvent}</p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{activeMenu}</h2>
                {activeMenu === "Create Event and list" && (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
                    onClick={handleCreateEvent}
                    title="Click to create a new event"
                  >
                    Create Event
                  </button>
                )}
              </div>

              {visibleEvents.length > 0 ? (
                visibleEvents.map((event, index) => (
                  <EventCard
                    key={index}
                    title={event.eventName}
                    location={event.country}
                    onClick={() => handleSelectEvent(event)} // Show selected event details
                  />
                ))
              ) : (
                <p className="text-gray-600 text-center">No events available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SponsoredEvent;
