const express = require("express");
const { getAllEvents, getUserEventStatus, registerForEvent, takeAttendance, getEventTagsController, unregisterFromEvent } = require("../controllers/eventController");

const router = express.Router();

router.get("/events", getAllEvents);
router.get("/check", getUserEventStatus);
router.get("/takeattendance", takeAttendance);
router.post("/register", registerForEvent);
router.get("/event-tags/:eventId", getEventTagsController);
router.post("/unregister", unregisterFromEvent);

module.exports = router;