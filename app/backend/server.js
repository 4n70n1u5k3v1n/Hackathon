const express = require("express");
const dotenv = require("dotenv");
const app = require("./app"); 


dotenv.config({ path: "../.env" });

const PORT = process.env.SERVER_PORT || 8080;



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
