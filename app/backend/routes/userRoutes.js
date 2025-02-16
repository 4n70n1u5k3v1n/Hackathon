const express = require("express");
const {getLeaderboard, getUserPoints, redeemItem, updateUserPoints, getUserTagsController } = require("../controllers/userController");
const router = express.Router();

router.get("/get-user-points", getUserPoints);
router.get("/leaderboard", getLeaderboard);
router.post("/redeem", redeemItem);
router.post("/add-points", updateUserPoints);
router.get("/user-tags/:userId", getUserTagsController);

module.exports = router;