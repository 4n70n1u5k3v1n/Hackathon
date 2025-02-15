const express = require("express");
const { getAllItems, getItem} = require("../controllers/itemController");

const router = express.Router();

router.get("/redeem", getAllItems);
router.get("/redeem-ones", getItem);

module.exports = router;