import axios from "axios";

const BASE_URL = "https://hackathon-lu32dxaw4a-uc.a.run.app/api";
// const BASE_URL = "http://localhost:8080/api"; 


export const getAllItems = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/redeem`);
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        throw error;
    }
};

export const getItemById = async (itemId) => {
    try {
        const response = await axios.get(`${BASE_URL}/redeem-ones/${itemId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching item:", error);
        throw error;
    }
};
