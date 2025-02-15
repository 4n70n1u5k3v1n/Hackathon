const express = require("express");
const {getLeaderboard } = require("../controllers/userController");
const router = express.Router();


router.get("/leaderboard", getLeaderboard);

module.exports = router;