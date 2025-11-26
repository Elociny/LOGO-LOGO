import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/",
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const status = error.response.status;
            
            if (status === 403) {
                localStorage.removeItem("usuario_logado");
                window.location.href = "/login";
            }
        }
        
        return Promise.reject(error);
    }
);