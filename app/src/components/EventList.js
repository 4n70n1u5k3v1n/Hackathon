import React, { useEffect, useState } from "react";
import { getAllEvents } from "../api/events";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                    <li key={event.event_id} style={styles.eventItem}>
                        <strong>{event.event_name}</strong>
                        <p>{event.event_date} at {event.event_time}</p>
                        <p>Location: {event.event_location}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        backgroundColor: "#f8f9fa",
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
    }
};

export default EventList;
