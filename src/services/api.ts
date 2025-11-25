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
            const mensagem = error.response.data;

            if (status === 403 || (status === 400 && typeof mensagem === 'string' && mensagem.includes("não encontrado"))) {
                localStorage.removeItem("usuario_logado");
                alert("Sessão expirada ou usuário não encontrado. Faça login novamente.");
                window.location.href = "/login";
            }
        }
        
        return Promise.reject(error);
    }
);