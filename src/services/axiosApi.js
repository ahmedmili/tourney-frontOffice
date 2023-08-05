import createAxiosInstance from './axiosInstance';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = createAxiosInstance({
    baseURL: BASE_URL,
    timeout: 300000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;
