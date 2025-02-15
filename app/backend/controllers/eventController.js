const { fetchAllEvents, checkUserRegistration, registerUserForEvent, getEventFromToken, getEventByUserID } = require("../entities/eventEntity");

exports.getAllEvents = async (req, res) => {
    try {
        const events = await fetchAllEvents();
        res.status(200).json({ success: true, data: events });
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ success: false, error: "Internal server error." });
    }
};

exports.getUserEventStatus = async (req, res) => {
    const { userId, eventId } = req.query;
    try {
        const isRegistered = await checkUserRegistration(userId, eventId);
        res.status(200).json({ isRegistered });
    } catch (error) {
        console.error("Error retrieving user event status:", error);
        res.status(500).json({ success: false, error: "Internal server error." });
    }
};

exports.registerForEvent = async (req, res) => {
    const { userId, eventId } = req.body;
    try {
        const result = await registerUserForEvent(userId, eventId);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error registering for event:", error);
        res.status(500).json({ success: false, error: "Internal server error." });
    }
};

exports.getEventbyToken = async (req, res) => {
    const { eventToken } = req.body;
    try {
        const result = await getEventFromToken(eventToken);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error getting event:", error);
        res.status(500).json({ success: false, error: "Internal server error." });
    }
}

exports.getEventbyUserID = async (req, res) => {
    const {userID} = req.body;
    try{
        const result = await getEventByUserID(userID);
        res.status(201).json(result);
    } catch (error) {
        console.error ("Error getting event:", error);
        res.status(500).json({ success: false, error: "Internal server error." });
    }
}

exports.takeAttendance = async (req, res) => {
    const {userID, eventToken} = req.query;
    try {
        const eventName = await getEventFromToken(eventToken);
        res.status(201).json(eventName);
    } catch (error) {
        console.error ("Error checking attendance: ", error);
        res.status(500).json({ success: false, error: "Internall server error." });
    }
}