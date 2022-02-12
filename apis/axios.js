import axiosBase from "axios";
import router from "next/router";
import store from "store";

const token = store.get("token");

const axios = axiosBase.create({
  baseURL: process.env.API_URL,
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      store.remove("token");
      store.remove("user");
      router.replace("/");
    }
    return Promise.reject(error);
  }
);

axios.defaults.headers.common["Authorization"] = "Bearer " + token;

export default axios;
