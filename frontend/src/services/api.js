import axios from "axios";

const API = axios.create({
  baseURL: "https://smartstock-api-qrr5.onrender.com"
});

export const getDashboard = () =>
API.get("/dashboard");

export const getAnalytics = () =>
API.get("/analytics");

export const getHistory = () =>
API.get("/history");

export const predictInventory = (data) =>
API.post("/predict", data);

export default API;
