const express = require("express");
const {getLeaderboard, getUserPoints, redeemItem, updateUserPoints } = require("../controllers/userController");
const router = express.Router();

router.get("/get-user-points", getUserPoints);
router.get("/leaderboard", getLeaderboard);
router.post("/redeem", redeemItem);
router.post("/add-points", updateUserPoints);

module.exports = router;