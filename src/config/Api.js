import axios from "axios";

const Api = axios.create({
  baseURL: "http://10.10.100.105:8080/api",
  responseType: "json",
  withCredentials: true,
});

export default Api;
