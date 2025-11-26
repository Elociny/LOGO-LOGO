import { NavLink } from "react-router-dom";
import { SearchInput } from "../SearchInput/SearchInput";
import { Logo } from "../Logo/Logo";
import { Nav } from "../Nav/Nav";
import User from "../User/User";
import { useState, useEffect } from "react";

import styles from "./Header.module.css";

// 1. Adicione imageUrl aqui
interface UsuarioLogado {
    nome: string;
    email: string;
    imageUrl?: string; 
}

export function Header() {
    const [isMobile, setIsMobile] = useState(false)
    const [usuario, setUsuario] = useState<UsuarioLogado | null>(null)

    const carregarUsuario = () => {
        const usuarioSalvo = localStorage.getItem("usuario_logado")
        if (usuarioSalvo) {
            try {
                setUsuario(JSON.parse(usuarioSalvo))
            } catch (error) {
                console.error("Erro ao ler usuário", error)
            }
        }
    }

    useEffect(() => {
        const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);

        checkScreenSize();
        carregarUsuario();

        window.addEventListener('resize', checkScreenSize)
        window.addEventListener('userUpdated', carregarUsuario);

        return () => {
            window.removeEventListener('resize', checkScreenSize)
            window.removeEventListener('userUpdated', carregarUsuario);
        }
    }, []);

    return (
        <header className={`px-100 row ${styles.cabecalho}`}>
            <Logo />
            
            <SearchInput />

            {!isMobile && (
                <ul className={`row ${styles.navIcons}`}>
                    <li>
                        {usuario ? (
                            <NavLink to="/configuracoes">
                                <User 
                                    nome={usuario.nome} 
                                    email={usuario.email}
                                    foto={usuario.imageUrl} 
                                    theme="dark"
                                />
                            </NavLink>
                        ) : (
                            <NavLink to="/login">
                                <User 
                                    nome="Seja bem vindo!" 
                                    email="entre ou cadastre-se" 
                                    theme="dark"
                                />
                            </NavLink>
                        )}
                    </li>
                    <li>
                        <NavLink to="/carrinho">
                            <Nav icon="bi-cart" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/rastreio">
                            <Nav icon="bi-truck" />
                        </NavLink>
                    </li>
                </ul>
            )}

            {isMobile && (
                <div className={styles.hamburger}>
                    <i className="bi bi-list"></i>
                </div>
            )}
        </header>
    );
}