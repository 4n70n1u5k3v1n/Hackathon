const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const skillRoutes = require("./routes/skillsRoutes");
const app = express();

app.use(bodyParser.json()); 


app.use(cors());



app.use("/api", eventRoutes);
app.use("/api", userRoutes);
app.use("/api", itemRoutes);
app.use("/api", challengeRoutes);
app.use("/api", skillRoutes);


module.exports = app;
