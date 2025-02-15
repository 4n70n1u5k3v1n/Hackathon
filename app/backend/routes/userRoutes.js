const express = require("express");
const {loginUser, getUserID, logoutUser } = require("../controllers/userController");
const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;