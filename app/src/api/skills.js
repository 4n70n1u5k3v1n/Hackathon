import axios from "axios";

// const BASE_URL = "https://hackathon-lu32dxaw4a-uc.a.run.app/api";
const BASE_URL = "http://localhost:8080/api";

export const getUserSkillsListings = async (userID) => {
    try {
        const response = await axios.get(`${BASE_URL}/get-user-skills-listings`, {
            params: { userID }
        });
        console.log('response',response);
        console.log('response data',response.data);
        console.log('tes');
        return response;
    } catch (error) {
        console.error("Error fetching user skills listings:", error);
        throw error;
    }
};

export const getUserSkillsRequested = async (userID) => {
    try {
        const response = await axios.get(`${BASE_URL}/get-user-skills-requested`, {
            params: { userID }
        });
        return response;
    } catch (error) {
        console.error("Error fetching user skills requested:", error);
        throw error;
    }
};

export const getUserSkillsOffered = async (userID) => {
    try {
        const response = await axios.get(`${BASE_URL}/get-user-skills-offered`, {
            params: { userID }
        });
        return response;
    } catch (error) {
        console.error("Error fetching user skills offered:", error);
        throw error;
    }
};

export const getUserSkillsAccepted = async (userID) => {
    try {
        const response = await axios.get(`${BASE_URL}/get-user-skills-accepted`, {
            params: { userID }
        });
        return response;
    } catch (error) {
        console.error("Error fetching user skills accepted:", error);
        throw error;
    }
};
