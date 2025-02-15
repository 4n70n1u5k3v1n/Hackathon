const express = require("express");
const { getUserSkillsListing, getUserSkillsRequested, getUserSkillsOffered, getUserSkillsAccepted } = require("../controllers/skillController");

const router = express.Router();

router.get("/get-user-skills-listings", getUserSkillsListing);
router.get("/get-user-skills-requested", getUserSkillsRequested);
router.get("/get-user-skills-offered", getUserSkillsOffered);
router.get("/get-user-skills-accepted", getUserSkillsAccepted);

module.exports = router;