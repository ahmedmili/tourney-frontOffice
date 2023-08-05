import axios from 'axios';
const { localStorageService } = require('./localStorageService');

function createAxiosInstance(options) {
    const api = axios.create(options);
    api.interceptors.request.use(
        (config) => {
            if (config.authorization !== false) {
                const token = localStorageService.getUserToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return api;
}
export default createAxiosInstance ;
