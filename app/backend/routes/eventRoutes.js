const express = require("express");
const { getAllEvents, getUserEventStatus, registerForEvent, takeAttendance, unregisterFromEvent } = require("../controllers/eventController");

const router = express.Router();

router.get("/events", getAllEvents);
router.get("/check", getUserEventStatus);
router.get("/takeattendance", takeAttendance);
router.post("/register", registerForEvent);
router.post("/unregister", unregisterFromEvent);

module.exports = router;