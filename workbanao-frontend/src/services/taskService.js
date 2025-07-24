import axios from 'axios';

const API_BASE = "http://localhost:8081/api/tasks";

export const fetchTasks = async () => {
  const response = await axios.get(API_BASE);
  return response.data;
};
