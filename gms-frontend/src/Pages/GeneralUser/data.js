// src/api/memberAPI.js
import axios from "axios";

// Backend URL from environment variable
const backendURL = process.env.REACT_APP_BACKEND_API;

// Create a custom axios instance
const axiosInstance = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});

// Attach token in headers before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API: Get members who joined this month
const getMonthlyJoined = async () => {
  const response = await axiosInstance.get("/members/monthly-member");
  return response.data;
};

// API: Get members expiring in 3 days
const threeDayExpire = async () => {
  const response = await axiosInstance.get("/members/within-3-days-expiring");
  return response.data;
};

// API: Get members expiring in 4-7 days
const fourSevenDaysexpire = async () => {
  const response = await axiosInstance.get("/members/within-4-7-days-expiring");
  return response.data;
};

// API: Get expired members
const expired = async () => {
  const response = await axiosInstance.get("/members/expired-member");
  return response.data;
};

// API: Get inactive members
const inActive = async () => {
  const response = await axiosInstance.get("/members/inactive-member");
  return response.data;
};

export {
  getMonthlyJoined,
  threeDayExpire,
  fourSevenDaysexpire,
  expired,
  inActive
};
