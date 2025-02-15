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

exports.redeemItem = async (userID, itemID) => {
    try {
        const [item] = await db.execute(`SELECT item_gc FROM ITEM WHERE item_id = ?`, [itemID]);
        if (item.length === 0) return { success: false, message: "Item not found." };

        const [user] = await db.execute(`SELECT user_gc FROM USER WHERE user_id = ?`, [userID]);
        if (user.length === 0) return { success: false, message: "User not found." };

        if (user[0].user_gc < item[0].item_gc) return { success: false, message: "Insufficient points." };

        await db.execute(`UPDATE USER SET user_gc = user_gc - ? WHERE user_id = ?`, [item[0].item_gc, userID]);
        await db.execute(`INSERT INTO USER_REDEMPTION (user_id, item_id, quantity, redemption_date) VALUES (?, ?, 1, NOW())`, [userID, itemID]);

        return { success: true, message: "Item redeemed successfully." };
    } catch (error) {
        throw error;
    }
};

exports.updatePoints = async (userId, ptIncrease) => {
    try {
        const query = 'UPDATE USER SET user_gc = user_gc + ? WHERE user_id = ?';
        await db.execute(query, [ptIncrease, userId]);
        console.log('Points update success');
        return { success: true, message: "User's points have been added successfully" };
    } catch (error) {
        console.error("Error updating points", error);
        throw error;
    }
};