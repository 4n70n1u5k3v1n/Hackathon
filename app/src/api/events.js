import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const getAllEvents = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/events`);
        return response.data;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
};
