import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000/api/v1/restaurants",
  headers: {
    "Content-type": "application/json",
    // "auth-token": localStorage.getItem('token')
  }
});