import React, { useEffect, useState } from "react";
import { getAllEvents, checkUserEvent, registerUserForEvent } from "../api/events";

const EventList = ({ userId }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getAllEvents();
                setEvents(data.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching events:", err);
                setError("Failed to load events.");
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const handleEventClick = async (event) => {
        try {
            const response = await checkUserEvent(userId, event.event_id);
            setIsRegistered(response.isRegistered);
            setSelectedEvent(event);
        } catch (err) {
            console.error("Error checking event registration:", err);
            setError("Error checking registration.");
        }
    };

    const handleRegister = async () => {
        try {
            await registerUserForEvent(userId, selectedEvent.event_id);
            setIsRegistered(true);
        } catch (err) {
            console.error("Error registering for event:", err);
            setError("Failed to register.");
        }
    };

    const handleClosePopup = (e) => {
        if (e.target.id === "popup-container") {
            setSelectedEvent(null);
        }
    };

    const formatDateTime = (date, time) => {
        const eventDate = new Date(date);
        const formattedDate = eventDate.toLocaleDateString("en-US", {
            weekday: "long", 
            year: "numeric",
            month: "long", 
            day: "numeric"
        });

        const eventTime = new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true 
        });

        return `${formattedDate} at ${eventTime}`;
    };

    if (loading) {
        return <p>Loading events...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div style={styles.container}>
            <h2>Upcoming Events</h2>
            <ul style={styles.eventList}>
                {events.map(event => (
                    <li key={event.event_id} style={styles.eventItem} onClick={() => handleEventClick(event)}>
                        <strong>{event.event_name}</strong>
                        <p>{formatDateTime(event.event_date, event.event_time)}</p>
                        <p>Location: {event.event_location}</p>
                        <p>Description: {event.description}</p>
                    </li>
                ))}
            </ul>

            {selectedEvent && (
                <div id="popup-container" style={styles.popupContainer} onClick={handleClosePopup}>
                    <div style={styles.popup}>
                        <h3>{selectedEvent.event_name}</h3>
                        {isRegistered ? (
                            <>
                                <p>Scan the QR code to check in:</p>
                            </>
                        ) : (
                            <button style={styles.registerButton} onClick={handleRegister}>Register Event</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};


const styles = {
    container: {
        padding: "20px",
        backgroundColor: "#fffbf5",
        borderRadius: "10px",
        maxWidth: "600px",
        margin: "auto",
    },
    eventList: {
        listStyleType: "none",
        padding: 0,
    },
    eventItem: {
        backgroundColor: "#ffffff",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
    },
    popupContainer: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    popup: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    },
    registerButton: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default EventList;