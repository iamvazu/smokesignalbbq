import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/v1';



import { useAuthStore } from '../store/useAuthStore';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    // Get token from store for better reactivity
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear the store and redirect
            useAuthStore.getState().logout();
        }

        return Promise.reject(error);
    }
);

export default api;
