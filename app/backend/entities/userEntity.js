const db = require("../db");

exports.getLeaderboard = async () => {
    try {
        const query = `SELECT id, username, user_gc FROM USERS ORDER BY user_gc DESC LIMIT 100`;
        const [results] = await db.execute(query);
        return results;
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        throw error;
    }
};

module.exports = router;