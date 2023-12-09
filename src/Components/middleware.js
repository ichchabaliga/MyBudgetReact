import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});
