const express = require("express");
const { getAllItems, getItem} = require("../controllers/itemController");

const router = express.Router();
const app = express();
const cors = require("cors");

app.use(cors({
    origin: "https://localhost:3000",
    credentials: true
}));

router.get("/redeem", getAllItems);
router.get("/redeem-ones", getItem);

module.exports = router;