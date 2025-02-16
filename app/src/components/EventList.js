import React, { useEffect, useState } from "react";
import { getAllEvents, checkUserEvent, registerUserForEvent, unregisterUserFromEvent, getEventTags } from "../api/events";
import { addPoints, getUserPoints } from "../api/user";
import LoadingSpinner from '../components/LoadingSpinner';
import Swal from 'sweetalert2';

const EventList = ({ userId }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [showInvitePopup, setShowInvitePopup] = useState(false);
    const [friendCode, setFriendCode] = useState('');
    const [userPoints, setUserPoints] = useState(0);

    const fetchEventTags = async (eventId) => {
        try {
            const tags = await getEventTags(eventId); 
            if (Array.isArray(tags)) {
                return tags; 
            }
            return [];
        } catch (error) {
            console.error("Error fetching event tags:", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getAllEvents();
                const eventsWithTags = await Promise.all(data.data.map(async (event) => {
                    const tags = await fetchEventTags(event.event_id); 
                    return { ...event, tags };
                }));
                setEvents(eventsWithTags);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching events:", err);
                setError("Failed to load events.");
                setLoading(false);
            }
        };
        
        const fetchUserPoints = async () => {
            try {
                const points = await getUserPoints(userId); 
                setUserPoints(points);
            } catch (err) {
                console.error("Error fetching user points:", err);
                setUserPoints(0);
            }
        };

        fetchEvents();
        fetchUserPoints();
    }, [userId]);

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
            Swal.fire({
                icon: 'success',
                title: 'Registered Successfully!',
                confirmButtonText: 'OK',
            });
        } catch (err) {
            console.error("Error registering for event:", err);
            setError("Failed to register.");
        }
    };

    const handleUnregister = async () => {
        try {
            const response = await unregisterUserFromEvent(userId, selectedEvent.event_id);
            if (response.success) {
                setIsRegistered(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Unregistered!',
                    text: 'You have successfully unregistered from the event.',
                    confirmButtonText: 'OK',
                });
            } else {
                throw new Error(response.message || 'Failed to unregister.');
            }
        } catch (error) {
            console.error('Error unregistering:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to unregister. Please try again.',
            });
        }
    };

    const handleClosePopup = (e) => {
        if (e.target.id === "popup-container") {
            setSelectedEvent(null);
        }
    };

    const handleInviteFriend = async () => {
        try {
            const response = await addPoints(userId, 100);
            if (response.success) {
                setUserPoints((prevPoints) => prevPoints + 100);
                Swal.fire({
                    icon: 'success',
                    title: 'Invitation Sent!',
                    text: `Friend code "${friendCode}" is invited.`,
                    confirmButtonText: 'OK',
                }).then(() => {
                    window.location.reload();
                });
            } else {
                throw new Error(response.message || 'Failed to add points');
            }
        } catch (err) {
            console.error('Error adding points:', err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to add points. Please try again.',
            });
        } finally {
            setFriendCode('');
            setShowInvitePopup(false);
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
        return <LoadingSpinner />;
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
                        {event.tags && (
                            <div style={styles.tagContainer}>
                                {event.tags.map((tag, index) => (
                                    <span key={index} style={styles.tag}>{tag.tag_name}</span>
                                ))}
                            </div>
                        )}

                    </li>
                ))}
            </ul>

            {selectedEvent && (
                <div id="popup-container" style={styles.popupContainer} onClick={handleClosePopup}>
                    <div style={styles.popup}>
                        <h3>{selectedEvent.event_name}</h3>
                        {isRegistered ? (
                            <>
                                <button
                                    style={styles.unregisterButton}
                                    onClick={handleUnregister}
                                >
                                    Unregister
                                </button>
                                <button style={styles.inviteButton} onClick={() => setShowInvitePopup(true)}>
                                    Invite a Friend
                                </button>
                            </>
                        ) : (
                            <button style={styles.registerButton} onClick={handleRegister}>Register Event</button>
                        )}
                    </div>
                </div>
            )}
            {showInvitePopup && (
                <div id="invite-popup-container" style={styles.popupContainer} onClick={() => setShowInvitePopup(false)}>
                    <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
                        <h3>Invite a Friend</h3>
                        <input
                            type="text"
                            placeholder="Enter friend's code here"
                            style={styles.inputField}
                            value={friendCode}
                            onChange={(e) => setFriendCode(e.target.value)}
                        />
                        <button style={styles.submitButton} onClick={handleInviteFriend}>
                            Invite
                        </button>
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
    inviteButton: {
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        margin: '2.5%',
    },
    inputField: {
        width: '90%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    submitButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    unregisterButton: {
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        margin: '2.5%',
    },
    tagContainer: {
        marginTop: "10px",
        display: "flex",
        flexWrap: "wrap",
        gap: "5px",
    },
    tag: {
        backgroundColor: "#e0e0e0",
        color: "#333",
        padding: "5px 10px",
        borderRadius: "15px",
        fontSize: "12px",
    },
};

export default EventList;
