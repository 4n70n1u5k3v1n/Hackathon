import axios from "axios";

const BASE_URL = "https://hackathon-lu32dxaw4a-uc.a.run.app/api";
// const BASE_URL = "http://localhost:8080/api"; 


export const getLeaderboard = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/leaderboard`);
    return response.data;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
};
