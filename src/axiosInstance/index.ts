import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "./constants";

const config: AxiosRequestConfig = {
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `token ${process.env.REACT_APP_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  },
};
export const axiosInstance = axios.create(config);
