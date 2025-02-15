const express = require("express");
const {getLeaderboard, getUserPoints } = require("../controllers/userController");
const router = express.Router();

router.get("/get-user-points", getUserPoints);
router.get("/leaderboard", getLeaderboard);

module.exports = router;