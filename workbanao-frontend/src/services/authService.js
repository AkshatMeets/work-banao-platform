import axios from 'axios';

const API_URL = "http://localhost:8081/api/users";

export const getUserByEmail = async (email) => {
  return await axios.get(`${API_URL}/email/${email}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
};
