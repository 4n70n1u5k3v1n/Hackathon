const {
    fetchAllItems,
    getItemById
} = require("../entities/itemEntity");

exports.getAllItems = async (req, res) => {
    try {
        const items = await fetchAllItems();
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ success: false, error: "Internal server error." });
    }
};

exports.getItem = async (req, res) => {
    const { itemId } = req.params;
    try {
        const item = await getItemById(itemId);
        if (!item) {
            return res.status(404).json({ success: false, error: "Item not found." });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        console.error("Error retrieving item:", error);
        res.status(500).json({ success: false, error: "Internal server error." });
    }
};