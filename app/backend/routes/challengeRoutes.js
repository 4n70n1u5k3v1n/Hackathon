const express = require("express");
const { getUsersChallenges } = require ("../controllers/challengeController");

const router = express.Router();

router.get("/challenges", getUsersChallenges);

module.exports = router;