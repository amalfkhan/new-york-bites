// base for accessing backend

import axios from "axios";

export default axios.create({
  withCredentials: true,
  credentials: "include",
  baseURL: "/api/v1/restaurants",
  headers: {
    "Content-type": "application/json",
  },
});
