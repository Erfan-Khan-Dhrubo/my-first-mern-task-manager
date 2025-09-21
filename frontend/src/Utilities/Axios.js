import axios from "axios";

const api = axios.create({
  baseURL: "https://my-first-mern-task-manager.onrender.com/api", // http://localhost:5001/api for deployment
});

export default api;
