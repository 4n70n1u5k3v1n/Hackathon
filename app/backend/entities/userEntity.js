const db = require("../db");
const bcrypt = require("bcrypt");

const user = {
    getUserByUsername: async (username) => {
        return new Promise ((resolve, reject) => {
            const query = `SELECT * FROM USERS WHERE username = ?`;
            
            const values = [username];
            db.query (query, values, (err, result) => {
                if (err) {return reject (err);}
                return resolve (result);
            });
        });
    },
}

module.exports = booking;