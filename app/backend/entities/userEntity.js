const db = require("../db");

exports.getLeaderboard = async () => {
    try {
        const query = `SELECT user_id, user_username, user_gc FROM USER ORDER BY user_gc DESC LIMIT 100`;
        const [results] = await db.execute(query);
        return results;
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        throw error;
    }
};

exports.getUserPoints = async (userID) => {
    try {
        const query = `SELECT user_gc FROM USER WHERE user_id = ?`;
        const [results] = await db.execute(query, [userID]);
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        console.error("Error fetching user points:", error);
        throw error;
    }
};
