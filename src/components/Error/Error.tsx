import style from "./Error.module.css"

import EmptyCartImg from "../../assets/images/empty-cart.svg";

export function Error() {
    return (
        <div className={`${style.error}`}>
            <img src={EmptyCartImg} alt="Erro ao carregar" />
            <h3>Hmmm… isso não era pra acontecer</h3>
            <p>Pode ser um problema temporário. Atualize a página ou tente novamente mais tarde.</p>
        </div>
    )
}