import axios from "axios";

const BASE_URL = "https://hackathon-lu32dxaw4a-uc.a.run.app/api"; 
// const BASE_URL = "http://localhost:8080/api"; 

export const getAllEvents = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/events`);
        return response.data;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
};


export const checkUserEvent = async (userId, eventId) => {
    try {
        const response = await axios.get(`${BASE_URL}/check`, {
            params: { userId, eventId }
        });
        return response.data;
    } catch (error) {
        console.error("Error checking user event registration:", error);
        throw error;
    }
};


export const registerUserForEvent = async (userId, eventId) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, {
            userId,
            eventId
        });
        return response.data;
    } catch (error) {
        console.error("Error registering user for event:", error);
        throw error;
    }
};

export const unregisterUserFromEvent = async (userId, eventId) => {
    try {
        const response = await axios.post(`${BASE_URL}/unregister`, {
            userId,
            eventId
        });
        return response.data;
    } catch (error) {
        console.error("Error unregistering from event:", error);
        return { success: false, message: "Error unregistering from event." };
    }
};

export const takeAttendance = async (userId, eventToken) => {
    try {
        const response = await axios.get(`${BASE_URL}/takeattendance`, {
            params: { userId, eventToken }
        });
        console.log('response: ', response.data);
        return response.data;
    } catch (error) {
        console.error ("Error taking attendance api: ", error);
        throw error;
    }
};
