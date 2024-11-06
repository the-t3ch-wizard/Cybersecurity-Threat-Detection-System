import axios from "axios";

const apiUrl = "http://localhost:5000/api/v1";

export const customAxios = axios.create({
  baseURL: apiUrl,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
  timeout: 60000,
})
