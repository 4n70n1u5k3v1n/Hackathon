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
