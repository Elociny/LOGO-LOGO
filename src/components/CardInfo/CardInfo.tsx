import style from "./CardInfo.module.css";

interface CardInfoProps {
    bandeira: string;
    tipo: string;
    numeroMascarado: string;
    nomeTitular: string;
    validade: string;
}

export function CardInfo({ bandeira, tipo, numeroMascarado, nomeTitular, validade }: CardInfoProps) {
    return (
        <div className={style.cardInfo}>
            <div className={style.header}>
                <i className="bi bi-credit-card-2-front-fill"></i>
                <span>{bandeira} - {tipo}</span>
            </div>
            
            <p className={style.numero}>{numeroMascarado}</p>
            
            <p>{nomeTitular} • Val: {validade}</p>
        </div>
    )
}