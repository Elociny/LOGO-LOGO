import { NavLink } from "react-router"
import style from "./Category.module.css"

interface CategoryProps {
    icon: string
    titulo: string
}

export function Category({ icon, titulo }: CategoryProps) {
    return (
        <NavLink to={titulo}>
            <div className={`${style.category}`}>
                <div className={`${style.box}`}>
                    <img className={`${style.icon}`} src={icon} alt={`categoria ${titulo}`} />
                </div>
                <h3>{titulo}</h3>
            </div>
        </NavLink>

    )
}