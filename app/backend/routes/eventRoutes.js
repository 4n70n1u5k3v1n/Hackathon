const express = require("express");
const { getAllEvents, getUserEventStatus, registerForEvent, takeAttendance } = require("../controllers/eventController");

const router = express.Router();

router.get("/events", getAllEvents);
router.get("/check", getUserEventStatus);
router.get("/takeattendance", takeAttendance);
router.post("/register", registerForEvent);

module.exports = router;
