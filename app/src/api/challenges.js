import axios from "axios";

const BASE_URL = "https://hackathon-lu32dxaw4a-uc.a.run.app/api"; 
// const BASE_URL = "http://localhost:8080/api"; 

export const getAllChallenges = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/challenges`, {
            params: {userId}
        });
        console.log("api response", response.data);
        return response.data;
    } catch (error) {
        console.error ("Error fetching challenges api:", error);
        throw error;
    }
};
