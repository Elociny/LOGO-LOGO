import { Navigate, Outlet } from "react-router";

export function PrivateRoute() {
    const usuarioSalvo = localStorage.getItem("usuario_logado");

    let isAuthenticated = false;
    
    if (usuarioSalvo) {
        try {
            const dados = JSON.parse(usuarioSalvo);
            if (dados.id || dados.email) {
                isAuthenticated = true;
            }
        } catch {
            isAuthenticated = false;
        }
    }
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}