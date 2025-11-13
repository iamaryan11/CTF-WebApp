import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://ctf-webapp-w65c.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
