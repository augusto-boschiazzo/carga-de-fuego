import axios from "axios";

const API_BASE_URL = "http://localhost:8000/carga_de_fuego/api/";

export const api = axios.create({
    baseURL: API_BASE_URL,
});
