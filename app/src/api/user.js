import axios from "axios";

const BASE_URL = "https://hackathon-lu32dxaw4a-uc.a.run.app/api";

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, { username, password });
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

export async function logoutUser() {
    try {
        await axios.post(`${BASE_URL}/logout`);
    } catch (error) {
        console.error("Logout failed:", error);
    }
}
