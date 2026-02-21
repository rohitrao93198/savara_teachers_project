import axios from "axios";

const api = axios.create({
    baseURL: "https://savara-teachers.onrender.com/api",
});

export default api;