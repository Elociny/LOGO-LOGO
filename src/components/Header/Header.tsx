import { NavLink } from "react-router"
import { Search } from "../Search/Search"
import { Logo } from "../Logo/Logo"
import { Nav } from "../Nav/Nav"
import User from "../User/User"

import styles from "./Header.module.css"

export function Header() {
    return (
        <header className={`px-100 row ${styles.header} ${styles.cabecalho}`}>
            <Logo />

            <Search />

            <ul className={`row`}>
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
        </header>
    )
}