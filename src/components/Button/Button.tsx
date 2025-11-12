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
    className?: string; 
}

export function Button({ size, color, border, theme, text, className }: ButtonProps) {
    return (
        <NavLink to={text}>
            <button className={`${style[size]} ${style[color]} ${style[border]} ${style[theme]} ${className ?? ""}`}>
                {text}
            </button>
        </NavLink>

    )
}