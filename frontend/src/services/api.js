// src/services/api.js
const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: token }),
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'An error occurred');
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    // Auth endpoints
    async register(userData) {
        return this.request('/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async login(credentials) {
        return this.request('/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    async getMe() {
        return this.request('/me', {
            method: 'GET',
        });
    }
}

const apiService = new ApiService();
export default apiService;