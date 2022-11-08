import axios from "axios";
import config from "../configs";
import { setIsExpiredSession } from "../store/user.slice";

let store;
export const storeInjector = (injectedStore) => {
  store = injectedStore;
};

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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      const username = localStorage.getItem("username");
      if (username) {
        store.dispatch(setIsExpiredSession());
        localStorage.removeItem("username");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
