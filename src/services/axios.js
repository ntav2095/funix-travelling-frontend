import axios from "axios";
import config from "../configs";

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
