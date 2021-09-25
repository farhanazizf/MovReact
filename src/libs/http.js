import axios from "axios";

const configs = {
  baseURL: "https://omdbapi.com/?apiKey=faf7e5bb",
};

const http = axios.create(configs);

export default http;
