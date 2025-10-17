import { NavLink } from "react-router"
import { Logo } from "../Logo/Logo"
import style from "./Footer.module.css"

export function Footer() {
    return (
        <footer className={`px-100 column ${style.footer}`}>
            <Logo nome="logologo" />
            <p>Onde seu estilo chega logo, logo.</p>

            <h3>Nos siga nas redes:</h3>
            <ul className={`row ${style.redes}`}>
                <li>
                    <NavLink to="/">
                        <i className="bi bi-facebook"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/">
                        <i className="bi bi-instagram"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/">
                        <i className="bi bi-twitter-x"></i>
                    </NavLink>
                </li>
            </ul>

            <hr />
            
            <p>@ 2025 Todos os direitos reservados.</p>
        </footer>
    )
}