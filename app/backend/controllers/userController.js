const { getLeaderboard, getUserPoints} = require("../entities/userEntity");

exports.getUserPoints = async (req, res) => {
    try {
        const { userID } = req.query;

        if (!userID) {
            return res.status(400).json({ error: "User ID is required." });
        }

        const userPoints = await getUserPoints(userID);

        if (userPoints) {
            res.status(200).json(userPoints);
        } else {
            res.status(404).json({ error: "User not found." });
        }
    } catch (error) {
        console.error("Error fetching user points:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await getLeaderboard();
        res.status(200).json(leaderboard);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ success: false, error: "Internal server error." });
    }
};

exports.redeemItem = async(req, res) => {
    try{
        const {userID, itemID } = req.body;
        const result = await this.redeemItem(userID, itemID);
        res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({success: false, error: "Internal server error."});
    }
}
