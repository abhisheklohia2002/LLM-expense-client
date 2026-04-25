import axios from "axios";

const createAPIInstance = (baseURL) => {
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  });
};

const api = createAPIInstance(import.meta.env.VITE_BACKEND_API_URL);

export default api;