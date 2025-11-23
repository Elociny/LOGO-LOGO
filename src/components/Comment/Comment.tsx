import style from "./Comment.module.css"

import Blusa from "../../assets/images/products/produto1.svg";

export function Comment() {
    return (
        <div className={`${style.comentario}`}>
            <div className={`row ${style.perfil}`}>
                <img src={Blusa} alt="Imagem de usuario" />
                <p className={`${style.nome}`}>Nome do cliente</p>
            </div>

            <div className={`row ${style.avaliacao}`}>
                <div className={style.stars}>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-half"></i>
                </div>
                <p>4.5<span>/5</span></p>
            </div>

            <div className={`${style.comment}`}>
                <h4>Titulo comentario</h4>

                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod culpa alias blanditiis autem hic iste quisquam, animi, cupiditate illum sequi, ut error aspernatur amet voluptas repellat ipsum ea fugiat est.</p>
            </div>
        </div>
    )
}