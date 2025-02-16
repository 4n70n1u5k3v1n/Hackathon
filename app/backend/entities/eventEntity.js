
const db = require("../db");

exports.fetchAllEvents = async () => {
    try {
        const [events] = await db.execute("SELECT * FROM EVENT");
        return events;
    } catch (error) {
        console.error("Error fetching all events:", error);
        throw error;
    }
};


exports.getUserRecommendations = async (userId) => {
    try {
        const query = `
            SELECT E.*
            FROM USER_RECOMMENDATIONS UR
            JOIN EVENT E ON UR.event_id = E.event_id
            WHERE UR.user_id = ?
            ORDER BY UR.score DESC;
        `;
        console.log('userId entity: ',userId);
        const [results] = await db.execute(query, [userId]);
        console.log(results);
        return results;
    } catch (error) {
        throw error;
    }
};


exports.checkUserRegistration = async (userId, eventId) => {
    try {
        const query = 'SELECT * FROM USER_EVENT WHERE user_id = ? AND event_id = ?';
        const [results] = await db.execute(query, [userId, eventId]);
        return results.length > 0;  // Returns true if the user is registered
    } catch (error) {
        console.error("Error checking user event:", error);
        throw error;
    }
};

exports.registerUserForEvent = async (userId, eventId) => {
    try {
        const query = 'INSERT INTO USER_EVENT (user_id, event_id, status) VALUES (?, ?, "upcoming")';
        await db.execute(query, [userId, eventId]);
        return { success: true, message: "User registered successfully" };
    } catch (error) {
        console.error("Error registering user for event:", error);
        throw error;
    }
};

exports.unregisterUserFromEvent = async (userId, eventId) => {
    try {
        const query = 'DELETE FROM USER_EVENT WHERE user_id = ? AND event_id = ?';
        await db.execute(query, [userId, eventId]);
        return { success: true, message: "User successfully unregistered from the event." };
    } catch (error) {
        console.error("Error unregistering from event:", error);
        throw error;
    }
};

exports.getEventFromToken = async (eventToken) => {
    try {
        const query = 'SELECT * FROM EVENT WHERE event_qr = ?';
        const [events] = await db.execute(query, [eventToken]);
        return events;
    } catch (error) {
        console.error("Error fetching all events:", error);
    }
};

exports.getEventByUserID = async (userID) => {
    try {
        const query = 'SELECT * FROM USER_EVENT WHERE user_id = ?';
        const [events] = await db.execute(query, [userID]);
        return events;
    } catch (error) {
        console.error("Error fetching all events:", error);
    }
};

exports.editAttendance = async (userId, eventId) => {
    try {
        const query = 'UPDATE USER_EVENT SET STATUS = "attended" WHERE user_id = ? AND event_id = ?';
        await db.execute(query, [userId, eventId]);
        return { success: true, message: "User's attendance taken successfully" };
    } catch (error) {
        console.error("Error taking user's attendance");
    }
}
exports.getEventTags = async (eventId) => {
    try {
        const query = `
            SELECT T.tag_name 
            FROM EVENT_TAG ET
            JOIN TAG T ON ET.tag_id = T.tag_id
            WHERE ET.event_id = ?`;
        const [results] = await db.execute(query, [eventId]);
        return results;
    } catch (error) {
        throw error;
    }
};
