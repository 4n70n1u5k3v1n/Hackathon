const db = require("../db");
const bcrypt = require("bcrypt");

exports.getUserByUsername = async (username) => {
    try {
        const query = `SELECT * FROM USERS WHERE username = ?`;
        const [results] = await db.execute(query, [username]);
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

exports.verifyPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};