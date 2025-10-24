import { NavLink } from "react-router"
import { Input } from "../Input/Input"
import { Logo } from "../Logo/Logo"
import { Nav } from "../Nav/Nav"
import User from "../User/User"
import { useState, useEffect } from "react"

import styles from "./Header.module.css"

export function Header() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)

        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    return (
        <header className={`px-100 row ${styles.cabecalho}`}>
            <Logo />
            
            <Input />

            {/* ÍCONES - SOMEM EM MOBILE */}
            {!isMobile && (
                <ul className={`row ${styles.navIcons}`}>
                    <li>
                        <NavLink to="/login">
                            <User />
                        </NavLink>
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

            {/* HAMBURGER - SÓ APARECE EM MOBILE */}
            {isMobile && (
                <div className={styles.hamburger}>
                    <i className="bi bi-list"></i>
                </div>
            )}
        </header>
    )
}