const { fetchAllEvents, checkUserRegistration, registerUserForEvent, getEventFromToken, getEventByUserID, editAttendance } = require("../entities/eventEntity");
const { updatePoints } = require ("../entities/userEntity");
// const { completeChallenge } = require ("../entities/challengeEntity");

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
    const {userId} = req.body;
    try{
        const result = await getEventByUserID(userId);
        res.status(201).json(result);
    } catch (error) {
        console.error ("Error getting event:", error);
        res.status(500).json({ success: false, error: "Internal server error." });
    }
}

exports.takeAttendance = async (req, res) => {
    const {userId, eventToken} = req.query;
    try {
        const event = await getEventFromToken(eventToken);
        
        if (event.length > 0) {
            const eventID = event[0].event_id;
            const eventName = event[0].event_name;
            const userAttends = await checkUserRegistration(userId, eventID);
            console.log('eventID:', eventID);
            console.log('userAttends:', userAttends);
            
            if (userAttends) {
                await editAttendance (userId, eventID);
                console.log ("edit attendance done");
                await updatePoints (userId, 500);
                console.log ("update points done");
                // await completeChallenge (userId, '1');  // complete join event mission
            }
            return res.status(201).json({
                success: userAttends,
                eventName: eventName
            });
        }

        return res.status(201).json({
            success: false,
            eventName: null
        });

    } catch (error) {
        console.error ("Error checking attendance: ", error);
        res.status(500).json({ success: false, error: "Internal server error." });
    }
}