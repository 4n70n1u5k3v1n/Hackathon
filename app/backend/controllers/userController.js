const { getLeaderboard} = require("../entities/userEntity");


exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await getLeaderboard();
        res.status(200).json(leaderboard);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ success: false, error: "Internal server error." });
    }
};
