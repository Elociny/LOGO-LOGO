import { Category } from "../Category/Category"
import style from "./Categories.module.css"

import Lightning from "../../assets/images/icons/lightning.svg"
import Dress from "../../assets/images/icons/dress.svg"
import Shirt from "../../assets/images/icons/shirt.svg"
import Bear from "../../assets/images/icons/bear.svg"
import Shoe from "../../assets/images/icons/shoe.svg"
import Necklace from "../../assets/images/icons/necklace.svg"

export function Categories() {
    return (
        <div className={`row ${style.categories}`}>
            <Category icon={Lightning} titulo="Novidades" />
            <Category icon={Dress} titulo="Feminino" />
            <Category icon={Shirt} titulo="Masculino" />
            <Category icon={Bear} titulo="Infantil" />
            <Category icon={Shoe} titulo="Calçados" />
            <Category icon={Necklace} titulo="Acessórios" />
        </div>
    )
}