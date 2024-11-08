import axios from "axios";

const apiUrl = "http://localhost:5000";
// const apiUrl = "https://cybersecurity-threat-detection-system.onrender.com";

export const customAxios = axios.create({
  baseURL: apiUrl+"/api/v1",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
  timeout: 15000,
})
