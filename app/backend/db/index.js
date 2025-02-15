const mysql = require("mysql2/promise");
const dotenv= require("dotenv");
dotenv.config({ path: "../.env" });

const pool = mysql.createPool({
    host: process.env.DB_HOST || '34.67.118.54',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Vvs319338',
    database: process.env.DB_NAME ||  'HACKATON' ,
    port: process.env.DB_PORT || '8080',
    waitForConnections: true,
});

module.exports = pool;
