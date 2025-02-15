const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { authenticateToken } = require("./middleware/authMiddleware");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

app.use(bodyParser.json()); 


const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:3000",
];
app.use(cors);
/* Draft for allowed origins for CORS
app.use(cors({
  origin: (origin, callback) => {
      if (!origin || allowedOrigins.some((allowed) => {
          return typeof allowed === "string"
              ? allowed === origin
              : allowed.test(origin); 
      })) {
          callback(null, true); 
      } else {
          callback(new Error("Not allowed by CORS"));
      }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  credentials: true, 
}));
*/

//app.use(authenticateToken);


app.use("/api", userRoutes);


module.exports = app;
