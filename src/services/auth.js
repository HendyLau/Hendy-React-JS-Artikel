// src/services/auth.js
import axios from "axios";
import Cookies from 'js-cookie';


axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;



axios.interceptors.request.use((config) => {
  const token = Cookies.get('XSRF-TOKEN');
  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
  }
  return config;
});

export const login = async (email, password) => {
  await axios.get("/sanctum/csrf-cookie");
  return axios.post("/login", { email, password });
};

export const register = async ({ name, email, password, membership_type }) => {
  await axios.get("/sanctum/csrf-cookie");
  return axios.post("/api/register", {
    name,
    email,
    password,
    password_confirmation: password,
    membership_type,
  });
};

export const getUser = async () => {
  await axios.get("/sanctum/csrf-cookie");
  return axios.get("/api/user");
};

export const logout = () => {
  return axios.post("/api/logout", {}, {
    withCredentials: true, 
  });
};