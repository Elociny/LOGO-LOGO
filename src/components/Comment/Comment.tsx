import style from "./Comment.module.css";

import Blusa from "../../assets/images/products/produto1.svg";
import type { AvaliacaoResponseDTO } from "../../services/avaliacaoService";
import { StarRating } from "../StarRating/StarRating";

interface CommentProps {
    data: AvaliacaoResponseDTO;
}

export function Comment({ data }: CommentProps) {

    const dataFormatada = new Date(data.dataAvaliacao).toLocaleDateString("pt-BR");

    return (
        <div className={`${style.comentario}`}>
            <div className={`row ${style.cabecalho}`}>
                <div className={`row ${style.perfil}`}>
                    <img
                        src={data.imagemCliente || Blusa}
                        alt="Foto do cliente"
                        className={style.avatar}
                    />
                    <div>
                        <h4>{data.nomeCliente}</h4>
                    </div>
                </div>

                <span className={style.data}>{dataFormatada}</span>
            </div>

            <div className={`row ${style.avaliacao}`}>
                <div className={style.stars}>
                    <StarRating 
                        rating={data.nota} 
                        readOnly 
                        size="small" 
                    />
                </div>
            </div>

            <div className={`${style.comment}`}>
                <h4>{data.titulo}</h4>
                <p>{data.descricao}</p>
            </div>

            <hr />
        </div>
    );
}