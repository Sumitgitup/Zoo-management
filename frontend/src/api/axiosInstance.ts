import { API_URL } from "@/constants/ApiUrl";
import axios from "axios";
const api = axios.create(
    {
        baseURL : API_URL
    }

)

api.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('token');
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30" //fake token until auth is setup 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
  
        }
        return config;

    },
    (error) => {
        
        Promise.reject(error);
    }
)
export default api;