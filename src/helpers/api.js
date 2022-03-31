import { create } from "apisauce";

const api = create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization:
      localStorage.getItem("token") &&
      `Bearer ${localStorage.getItem("token")}`,
  },
});

export default api;
