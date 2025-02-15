const express = require("express");
const { getAllEvents, getUserEventStatus, registerForEvent } = require("../controllers/eventController");

const router = express.Router();

router.get("/events", getAllEvents);
router.get("/check", getUserEventStatus);
router.post("/register", registerForEvent);

module.exports = router;
