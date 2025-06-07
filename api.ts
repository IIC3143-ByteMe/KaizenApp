import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "./apiConfig";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


api.interceptors.request.use(async config => {
    const token = await SecureStore.getItemAsync("sessionToken");
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
