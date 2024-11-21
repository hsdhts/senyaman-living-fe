import axios from "axios";

export const BASE_URL = "http://localhost:5008";
export const COMPANY = "PT. Pasifik Hoki Indonesia";
export const APP_NAME = "CloudHomes";
export const SUPPORT_EMAIL = "support@cloudhomes.com";

export const MAINCONFIG = {
    BASE_URL,
    COMPANY,
    APP_NAME,
    SUPPORT_EMAIL,
    timeout: 5000,
    maxRetries: 3,
    WHATSAPP: "+62 858 1100 0888",
    EMAIL: "cs@cloudhomes.com",
};

// Axios instance with global configuration
export const API_URL = axios.create({
    baseURL: BASE_URL,
    timeout: 5000, // Optional: Set request timeout
    headers: {
        "Content-Type": "application/json",
    },
});
