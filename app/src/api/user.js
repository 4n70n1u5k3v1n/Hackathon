import axios from "axios";

const BASE_URL = "https://hackathon-lu32dxaw4a-uc.a.run.app/api";


export const getUserPoints = async (userID) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-user-points`, {
      params: { userID } // Pass userID as a query parameter
    });
    return response.data.user_gc;
  } catch (error) {
    console.error("Error fetching user points:", error);
    return 0; // Default to 0 points in case of an error
  }
};
