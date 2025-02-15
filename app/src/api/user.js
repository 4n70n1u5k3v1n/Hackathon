import axios from "axios";

const BASE_URL = "https://hackathon-lu32dxaw4a-uc.a.run.app/api";

export const getUserPoints = async (userID) => {
    try {
        const response = await axios.get(`${BASE_URL}/get-user-points`, {
            params: { userID }
        });
        return response.data.user_gc;
    } catch (error) {
        console.error("Error fetching user points:", error);
        return 0;
    }
};

export const redeemItem = async (userID, itemID) => {
    try {
        const response = await axios.post(`${BASE_URL}/redeem`, {
            userID,
            itemID
        });

        return response.data;
    } catch (error) {
        console.error("Error redeeming item:", error);
        return { success: false, message: "Error processing redemption." };
    }
};

export const addPoints = async (userId, points) => {
    try {
        const response = await axios.post(`${BASE_URL}/add-points`, {
            userId,
            points
        });

        return response.data;
    } catch (error) {
        console.error("Error adding points:", error);
        return { success: false, message: "Error adding points." };
    }
};