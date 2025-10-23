import { NavLink } from "react-router"
import logoImg from "../../assets/images/icons/LOGOLOGO ICON.svg"

import style from "./Logo.module.css"

type LogoProps = {
    nome?: string
}

export function Logo({ nome }: LogoProps) {
    return (
        <div>
            <NavLink className={`row ${style.logo}`} to="/">
                <img src={logoImg} alt="Logo da LOGOLOGO" />
                {nome ? <h1>{nome}</h1> : null}
            </NavLink>
        </div>
    )
}