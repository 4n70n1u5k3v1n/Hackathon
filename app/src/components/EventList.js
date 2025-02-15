import React, { useEffect, useState } from "react";
import { getAllEvents, checkUserEvent, registerUserForEvent } from "../api/events";
import { addPoints, getUserPoints } from "../api/user";
import LoadingSpinner from '../components/LoadingSpinner';
import Swal from 'sweetalert2';

const EventList = ({ userId }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [showInvitePopup, setShowInvitePopup] = React.useState(false);
    const [friendCode, setFriendCode] = React.useState('');
    const [userPoints, setUserPoints] = useState(0);

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
        const fetchUserPoints = async () => {
            try {
                const points = await getUserPoints(userId); // Fetch user points
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

    const handleInviteFriend = async () => {
        try {
            // Call the backend API to add 100 points
            const response = await addPoints(userId, 100);

            if (response.success) {
                // Update the user's points in the frontend state
                setUserPoints((prevPoints) => prevPoints + 100);
        //console.log('Friend Code:', friendCode);
        Swal.fire({
            icon: 'success',
            title: 'Invitation Sent!',
            text: `Friend code "${friendCode}" is invited.`,
            confirmButtonText: 'OK',
        });
          }else {
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
            // Reset the input field and close the popup
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
        marginTop: '10px',
      },
      inputField: {
        width: '100%',
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
};

export default EventList;