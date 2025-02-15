const db = require("../db");

exports.getUserSkillsListings = async (userId) => {
    try {
        const query = `
            SELECT USM.*, U.user_fname, U.user_lname, S1.skill_name AS skill_1, S2.skill_name AS skill_2
            FROM USER_SKILL_MATCH USM
                     LEFT JOIN USER U ON USM.requestor_id = U.user_id
                     JOIN SKILLS S1 ON USM.skills_id = S1.skill_id
                     JOIN SKILLS S2 ON USM.skills_id_2 = S2.skill_id
            WHERE USM.requestor_id != ? AND USM.status IS NULL`;

        const [results] = await db.execute(query, [userId]);
        console.log(results);
        return results;
    } catch (error) {
        console.error("Error fetching user skills listings:", error);
        throw error;
    }
};

exports.getUserSkillsRequested = async (userId) => {
    try {
        const query = `
            SELECT USM.*, U.user_fname, U.user_lname, S1.skill_name AS skill_1, S2.skill_name AS skill_2
            FROM USER_SKILL_MATCH USM
                     JOIN USER U ON USM.requestor_id = U.user_id
                     JOIN SKILLS S1 ON USM.skills_id = S1.skill_id
                     JOIN SKILLS S2 ON USM.skills_id_2 = S2.skill_id
            WHERE USM.acceptor_id = ? AND USM.status = 'requested'`;

        const [results] = await db.execute(query, [userId]);
        console.log('entity me', results);
        return results;
    } catch (error) {
        console.error("Error fetching user skills requested:", error);
        console.log('error', error);
        throw error;
    }
};

exports.getUserSkillsOffered = async (userId) => {
    try {
        const query = `
            SELECT USM.*, U.user_fname, U.user_lname, S1.skill_name AS skill_1, S2.skill_name AS skill_2
            FROM USER_SKILL_MATCH USM
                     JOIN USER U ON USM.requestor_id = U.user_id
                     JOIN SKILLS S1 ON USM.skills_id = S1.skill_id
                     JOIN SKILLS S2 ON USM.skills_id_2 = S2.skill_id
            WHERE USM.requestor_id = ? AND USM.status = 'requested'`;

        const [results] = await db.execute(query, [userId]);
        return results;
    } catch (error) {
        console.error("Error fetching user skills offered:", error);
        throw error;
    }
};

exports.getUserSkillsAccepted = async (userId) => {
    try {
        const query = `
            SELECT USM.*, U.user_fname, U.user_lname, S1.skill_name AS skill_1, S2.skill_name AS skill_2
            FROM USER_SKILL_MATCH USM
                     JOIN USER U ON U.user_id =
                                    CASE
                                        WHEN USM.acceptor_id = ? THEN USM.requestor_id
                                        WHEN USM.requestor_id = ? THEN USM.acceptor_id
                                        END
                     JOIN SKILLS S1 ON USM.skills_id = S1.skill_id
                     JOIN SKILLS S2 ON USM.skills_id_2 = S2.skill_id
            WHERE (USM.requestor_id = ? OR USM.acceptor_id = ?)
              AND USM.status = 'accepted'`;

        const [results] = await db.execute(query, [userId, userId, userId, userId]);
        return results;
    } catch (error) {
        console.error("Error fetching user skills accepted:", error);
        throw error;
    }
};
