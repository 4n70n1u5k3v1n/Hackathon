const db = require("../db");

exports.getAllUserChallenges = async (userId) => {
    try {
        console.log (userId);
        const query = `SELECT uc.user_id, uc.bschallenge_id, uc.status, bc.bschallenge_title, bc.bchallenge_gc AS points
        FROM 
            USER_CHALLENGES uc
        JOIN 
            BASE_CHALLENGE bc ON uc.bschallenge_id = bc.bschallenge_id
        WHERE 
            uc.user_id = ?;
        `;
        const [challenges] = await db.execute (query, [userId]);
        console.log (challenges);
        return challenges;
    } catch (error) {
        console.log("Error fetching all challenges:", error);
    }
};

exports.getChallengeTitle = async (bschallenge_id) => {
    try {
        const query = `SELECT * FROM BASE_CHALLENGES WHERE bschallenge_id  = ? LIMIT 1`;
        const [result] = await db.execute (query, [bschallenge_id]);

        if (result > 0) {
            return result[0].bschallenge_title;
        } else {
            return null;
        }
    } catch (error) {
        console.log ("Error fetching challenge title", error);
    }
}

exports.withdrawChallenge = async (userId, challengeId) => {
    try {
        const query = `SELECT * FROM USER_CHALLENGES WHERE user_id = ? AND bschallenge_id = ?`;
        const [challenges] = await db.execute (query, [userId, challengeId]);
        
        if (challenges.length > 0 & challenges[0].status == "completed") {
            await db.execute(`UPDATE USER_CHALLENGES SET status = "pending"`);
            return { success: true, message: "Challenge withdrawn"}
        } else {
            console.log(challenges[0].status);
        }
        console.log ("updated status:", challenges[0].status);
    } catch (error) {
        console.log ("Error updating the challenge:", error);
    }
}

exports.completeChallenge = async (userId, challengeId) => {
    try {
        const query = `SELECT * FROM USER_CHALLENGES WHERE user_id = ? AND bschallenge_id = ?`;
        const [challenges] = await db.execute (query, [userId, challengeId]);
        
        if (challenges.length > 0 & challenges[0].status == "pending") {
            await db.execute(`UPDATE USER_CHALLENGES SET status = "completed"`);
            return { success: true, message: "Challenge completed"}
        } else {
            console.log(challenges[0].status);
        }
        console.log ("updated status:", challenges[0].status);
    } catch (error) {
        console.log ("Error updating the challenge:", error);
    }
}