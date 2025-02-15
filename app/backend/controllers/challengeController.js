const { getAllUserChallenges } = require ("../entities/challengeEntity");

exports.getUsersChallenges = async (req, res) => {
    try {
        const { userId } = req.query;
        console.log ('controller', userId);
        const challenges = await getAllUserChallenges(userId);
        console.log("challenges in controller:", challenges);
        res.status(200).json({success: true, data: challenges});
    } catch (error) {
        console.error ("Error fetching user's challenges controller:", error);
        res.status(500).json({success: false, error: "Internal server error"});
    }
};