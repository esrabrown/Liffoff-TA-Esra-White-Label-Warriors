import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL_KEY
const axiosIns = axios.create({
    headers: {
        'Accepts': 'application/json',
        "Access-Control-Allow-Origin": "*"
    },
    baseURL: "/api",
});

export default axiosIns;