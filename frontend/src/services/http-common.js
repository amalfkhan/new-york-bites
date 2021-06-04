// base for accessing backend

import axios from "axios";

export default axios.create({
  withCredentials: true,
  credentials: "include",
  // baseURL: process.env.baseURL || "http://localhost:5000/api/v1/restaurants",
  baseURL: "/api/v1/restaurants",
  headers: {
    "Content-type": "application/json",
  },
});
