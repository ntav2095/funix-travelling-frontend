import axios from "axios";
import config from "../configs";

const axiosInstance = axios.create({
  baseURL: config.baseURL.admin,
  withCredentials: true,
});

export default axiosInstance;
