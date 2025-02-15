const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

app.use(bodyParser.json()); 


app.use(cors());



app.use("/api", eventRoutes);


module.exports = app;
