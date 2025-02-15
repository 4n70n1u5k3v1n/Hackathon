const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const app = express();

app.use(bodyParser.json()); 


app.use(cors());



app.use("/api", eventRoutes);
app.use("/api", userRoutes);
app.use("/api", itemRoutes);
app.use("/api", challengeRoutes);


module.exports = app;
