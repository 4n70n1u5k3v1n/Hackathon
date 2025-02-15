const db = require("../db");

// exports.fetchAllEvents = async () => {
//     try {
//         const [events] = await db.execute("SELECT * FROM EVENT");
//         return events;
//     } catch (error) {
//         console.error("Error fetching all events:", error);
//         throw error;
//     }
// };

// exports.checkUserRegistration = async (userId, eventId) => {
//     try {
//         const query = `SELECT * FROM USER_EVENT WHERE user_id = ? AND event_id = ?`;
//         const [results] = await db.execute(query, [userId, eventId]);
//         return results.length > 0;  // Returns true if the user is registered
//     } catch (error) {
//         console.error("Error checking user event:", error);
//         throw error;
//     }
// };

// exports.registerUserForEvent = async (userId, eventId) => {
//     try {
//         const query = `INSERT INTO USER_EVENT (user_id, event_id, status) VALUES (?, ?, 'upcoming')`;
//         await db.execute(query, [userId, eventId]);
//         return { success: true, message: "User registered successfully" };
//     } catch (error) {
//         console.error("Error registering user for event:", error);
//         throw error;
//     }
// };

const event = {
    fetchAllEvents: async () => {
        return new Promise ((resolve, reject) => {
            const query = `SELECT * FROM EVENT`;
            db.query (query, (err, res) => {
                if (err) {return reject(err);}
                return resolve (res);
            })
        });
    },

    checkUserRegistration: async(userID, eventID) => {
        return new Promise ((resolve, reject) => {
            const query = `SELECT * FROM USER_EVENT WHERE user_id = ? AND event_id = ?`;
            
            const value = [userID, eventID];
            db.query (query, value, (err, result) => {
                if (err) {return reject(err);}

                if (result && result.length > 1) {
                    resolve(true);
                } else {
                resolve(false);
                }
            });
        });
    },

    registerUserForEvent: async(userID, eventID) => {
        return new Promise ((resolve, reject) => {
            const query = `INSERT INTO USER_EVENT (user_id, event_id, status) VALUES (?, ?, 'upcoming')`
            const value = [userID, eventID];

            db.query(query, value, (err, result) => {
                if (err) {return reject(err);}
                resolve({
                    success: true,
                    message: 'User registered for event successfully',
                    result: result
                })
            });
        });
    },

    getEventFromToken: async(eventToken) => {
        return new Promise ((resolve, reject) => {
            const query = `SELECT * FROM EVENT WHERE event_qr = ?`;

            const values = [eventToken];
            db.query(query, values, (err, result) => {
                if (err) {return reject(err);}
                return resolve(result)
            });
        });
    }
}