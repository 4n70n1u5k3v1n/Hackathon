const db = require("../db");

exports.fetchAllItems = async () => {
    try {
        const [items] = await db.execute("SELECT * FROM ITEM");
        console.log(items);
        return items;
    } catch (error) {
        console.error("Error fetching all items:", error);
        throw error;
    }
};

exports.getItemById = async (itemId) => {
    try {
        const query = "SELECT * FROM ITEM WHERE item_id = ?";
        const [items] = await db.execute(query, [itemId]);
        return items.length > 0 ? items[0] : null;
    } catch (error) {
        console.error("Error fetching item by id:", error);
        throw error;
    }
};