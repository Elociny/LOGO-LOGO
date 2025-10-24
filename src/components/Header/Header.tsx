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
            const mobile = window.innerWidth <= 768
            setIsMobile(mobile)
            console.log('Largura:', window.innerWidth, 'isMobile:', mobile) // DEBUG
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)

        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])



    return (
        <header className={`px-100 row ${styles.cabecalho}`}>
            <Logo />
            
            <Input />

            {!isMobile ? (
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
            ) : (
                <div className={styles.hamburger}>
                    <Nav icon="bi-list" />
                </div>
            )}
        </header>
    )
}