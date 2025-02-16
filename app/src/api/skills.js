import axios from "axios";

const BASE_URL = "https://hackathon-lu32dxaw4a-uc.a.run.app/api";

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

export const acceptSkillMatchStatus = async (requestorId, acceptorId, status) => {
    try {
        const response = await axios.post(`${BASE_URL}/accept-skill-match-status`, {
            requestorId,
            acceptorId,
            status
        });

        return response.data;
    } catch (error) {
        console.error("Error updating skill match status:", error);
        return { success: false, message: "Error updating skill match status." };
    }
}

export const rejectSkillMatchStatus = async (requestorId, acceptorId) => {
    try {
        const response = await axios.post(`${BASE_URL}/reject-skill-match-status`, {
            requestorId,
            acceptorId
        });

        return response.data;
    } catch (error) {
        console.error("Error rejecting skill match status:", error);
        return { success: false, message: "Error rejecting skill match status." };
    }
}

export const requestSkillMatchStatus = async (requestorId, acceptorId) => {
    try {
        const response = await axios.post(`${BASE_URL}/request-skill-match`, {
            requestorId,
            acceptorId
        });

        return response.data;
    } catch (error) {
        console.error("Error cancelling skill match status:", error);
        return { success: false, message: "Error cancelling skill match status." };
    }
}