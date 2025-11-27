import { useNavigate } from "react-router"
import style from "./TrackItens.module.css"
import type { ProductAPI } from "../../types/ProductAPI";

interface TrackItensProps {
    data: ProductAPI
}

export function TrackItens({ data }: TrackItensProps) {
    const navigate = useNavigate();

    const subtotal = data.preco * data.quantidade;

    const handleNavigate = () => {
        navigate(`/detalhes-do-produto/${data.id}`);
    };

    return (
        <div className={`row ${style.trackItens}`} onClick={handleNavigate}>
            <div className={`row ${style.infos}`}>
                <img src={data.imageUrl} alt={`Imagem do produto ` + data.nome} className={`${style.image}`} />

                <div className={`${style.infoProduct}`}>
                    <h3>{data.nome}</h3>
                    <p>Tamanho: <strong>{data.tamanho}</strong></p>
                    <p>Cor: <strong>{data.cor}</strong></p>
                    <p>Quantidade: <strong>{data.quantidade}</strong></p>
                    <p>Preço unitário: <strong>{data.preco.toFixed(2)}</strong></p>
                </div>
            </div>

            <p>Sub total: <strong>R$ {subtotal.toFixed(2)}</strong></p>
        </div>
    )
}