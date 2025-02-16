const express = require("express");
const { getAllEvents, getUserEventStatus, registerForEvent, takeAttendance, getEventTagsController, unregisterFromEvent,  getUserRecommendationsController } = require("../controllers/eventController");

const router = express.Router();

router.get("/events", getAllEvents);
router.get("/check", getUserEventStatus);
router.get("/takeattendance", takeAttendance);
router.post("/register", registerForEvent);
router.get("/event-tags/:eventId", getEventTagsController);
router.post("/unregister", unregisterFromEvent);
router.get("/user-recommendations/:userId", getUserRecommendationsController);

module.exports = router;