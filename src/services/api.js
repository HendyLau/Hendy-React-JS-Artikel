// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // Ganti sesuai backend
  withCredentials: true,
});

export const fetchVideos = () => api.get("/api/videos");
export const fetchArticles = () => api.get("/api/posts");
export const fetchCategories = () => api.get("/api/categories"); 

export default api;
