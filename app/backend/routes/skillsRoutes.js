const express = require("express");
const { getUserSkillsListing, getUserSkillsRequested, getUserSkillsOffered, getUserSkillsAccepted, acceptSkillMatchStatus, rejectSkillMatchStatus, requestSkillMatch } = require("../controllers/skillController");

const router = express.Router();

router.get("/get-user-skills-listings", getUserSkillsListing);
router.get("/get-user-skills-requested", getUserSkillsRequested);
router.get("/get-user-skills-offered", getUserSkillsOffered);
router.get("/get-user-skills-accepted", getUserSkillsAccepted);
router.post("/accept-skill-match-status", acceptSkillMatchStatus);
router.post("/reject-skill-match-status", rejectSkillMatchStatus);
router.post("/request-skill-match", requestSkillMatch);

module.exports = router;