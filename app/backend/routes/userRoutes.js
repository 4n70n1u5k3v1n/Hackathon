const express = require("express");
const {getLeaderboard, getUserPoints, redeemItem } = require("../controllers/userController");
const router = express.Router();

router.get("/get-user-points", getUserPoints);
router.get("/leaderboard", getLeaderboard);
router.post("/redeem", redeemItem);

module.exports = router;