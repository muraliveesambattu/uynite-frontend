import React, { useEffect, useState } from 'react'
import EventCard from '../EventCard'
import { useNavigate } from 'react-router-dom';

const EventsList = ({ }: any) => {

    const [createdEvents, setCreatedEvents] = useState<any[]>([
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
    const navigate = useNavigate();

    const handleEventDetails = (event: any) => {
        navigate(`/sponsored-event/event-details`, { state: { event } });
    }
    return (
        <div>
            {createdEvents.length > 0 ? (
                createdEvents.map((event, index) => (
                    <EventCard
                        key={index}
                        title={event.eventName}
                        location={event.country}
                        handleEventClick={() => handleEventDetails(event)} // Pass the event to details
                    />
                ))
            ) : (
                <p className="text-gray-600 text-center">No events available.</p>
            )}
        </div>
    )
}

export default EventsList
