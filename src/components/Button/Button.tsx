import { NavLink } from "react-router"
import style from "./Button.module.css"

type Size = "small" | "big"
type Color = "laranja" | "cinza" | "transparente" | "branco"
type Border = "quadrada" | "arredondada"
type Theme = "dark" | "light"

interface ButtonProps {
    size: Size
    color: Color
    border: Border
    theme: Theme
    text: string
    navegation?: string
    onClick?: () => void
}

export function Button({ size, color, border, theme, text, navegation, onClick }: ButtonProps) {

    if (navegation) {
        return (
            <button className={`${style[size]} ${style[color]} ${style[border]} ${style[theme]}`} onClick={onClick}>
                <NavLink to={navegation}>
                    {text}
                </NavLink>
            </button>
        )
    }

    return (
        <button className={`${style[size]} ${style[color]} ${style[border]} ${style[theme]}`} onClick={onClick}>
            {text}
        </button>
    )
}