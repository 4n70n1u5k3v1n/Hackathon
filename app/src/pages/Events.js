import React, { useState } from 'react';
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import EventList from "../components/EventList";
import ClientWebCam from "../components/ClientWebCam";
import Swal from 'sweetalert2'; // Import SweetAlert2
import "./Events.css"; // Import the CSS file
import ProfileSidebar from '../components/ProfileSidebar';

const Events = ({ userID }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCreateEventOpen, setIsCreateEventOpen] = useState(false); // State for create event pop-up
    const [eventName, setEventName] = useState(''); // State for event name
    const [eventDate, setEventDate] = useState(''); // State for event date
    const [eventTime, setEventTime] = useState(''); // State for event time
    const [eventLocation, setEventLocation] = useState(''); // State for event location
    const [eventDescription, setEventDescription] = useState(''); // State for event description

    const handleProfileClick = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        if (!eventName || !eventDate || !eventTime || !eventLocation || !eventDescription) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields!',
            });
            return;
        }

        // Simulate form submission (you can replace this with an API call)
        console.log('Event Created:', {
            eventName,
            eventDate,
            eventTime,
            eventLocation,
            eventDescription,
        });

        // Show success message
        Swal.fire({
            icon: 'success',
            title: 'Event Created!',
            text: 'Your event has been successfully created.',
            showConfirmButton: false,
            timer: 1500,
        });

        // Reset form and close pop-up
        setEventName('');
        setEventDate('');
        setEventTime('');
        setEventLocation('');
        setEventDescription('');
        setIsCreateEventOpen(false);
    };

    return (
        <div>
            <Header onProfileClick={handleProfileClick} userID={userID} />
            <div className="events-container">
                {/* Create Event Button */}
                <button
                    className="create-event-button"
                    onClick={() => setIsCreateEventOpen(true)}
                >
                    Create +
                </button>

                {/* Main Content */}
                <div
                    className="events-content"
                    style={{
                        filter: isSidebarOpen || isCreateEventOpen ? 'blur(5px)' : 'none',
                        opacity: isSidebarOpen || isCreateEventOpen ? 0.5 : 1,
                        pointerEvents: isSidebarOpen || isCreateEventOpen ? 'none' : 'auto',
                    }}
                >
                    <div style={{ padding: "10px" }}>
                        <EventList EventList userId={userID} />
                        <ClientWebCam />
                    </div>
                </div>
            </div>
            <Navbar />

            {/* Profile Sidebar */}
            {isSidebarOpen && (
                <ProfileSidebar
                    onClose={() => setIsSidebarOpen(false)}
                    style={{ left: isSidebarOpen ? '0' : '-50%' }}
                />
            )}

            {/* Create Event Pop-up */}
            {isCreateEventOpen && (
                <div className="create-event-popup-overlay">
                    <div className="create-event-popup-container">
                        {/* Close Button */}
                        <button
                            className="close-popup-button"
                            onClick={() => setIsCreateEventOpen(false)}
                        >
                            &times;
                        </button>
                        <h2>Create Event</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Event Name:</label>
                                <input
                                    type="text"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Event Date:</label>
                                <input
                                    type="date"
                                    value={eventDate}
                                    onChange={(e) => setEventDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Event Time:</label>
                                <input
                                    type="time"
                                    value={eventTime}
                                    onChange={(e) => setEventTime(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Event Location:</label>
                                <input
                                    type="text"
                                    value={eventLocation}
                                    onChange={(e) => setEventLocation(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Event Description:</label>
                                <textarea
                                    value={eventDescription}
                                    onChange={(e) => setEventDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-button">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;