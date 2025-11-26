import { useNavigate } from "react-router-dom"; // 1. Importar o hook
import type { ProductAPI } from "../../types/ProductAPI";
import { Button } from "../Button/Button";
import style from "./Product.module.css";

interface ProductProps {
    data: ProductAPI
}

export function Product({ data }: ProductProps) {
    const navigate = useNavigate();

    const calculateOldPrice = (currentPrice: number, discountPercent: number) => {
        return currentPrice / (1 - discountPercent / 100);
    };

    const safePrice = Number(data.preco ?? 0);

    const handleCardClick = () => {
        navigate(`/detalhes-do-produto/${data.id}`);
    };

    return (
        <div className={style.product} onClick={handleCardClick}>
            <img src={data.imageUrl} alt={`Imagem do produto ${data.nome}`} />
            <h3>{data.nome}</h3>
            
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

            <div className={style.preco}>
                {data.desconto ? (
                    <>
                        <div className={style.linhaPreco}>
                            <p className={style.precoAtual}>
                                R$ {safePrice.toFixed(2)}
                            </p>
                            <p className={style.precoAntigo}>
                                R$ {calculateOldPrice(safePrice, data.desconto).toFixed(2)}
                            </p>
                        </div>
                       
                        <div className={style.desconto}>
                            -{data.desconto}%
                        </div>
                    </>
                ) : (
                    <p className={style.precoSemDesconto}>
                        R$ {safePrice.toFixed(2)}
                    </p>
                )}
                
                <div className={style.botaoComprar}>
                    <Button 
                        theme="light" 
                        size="small" 
                        color="laranja" 
                        border="arredondada" 
                        text="Veja Mais"
                    />
                </div>
            </div>
        </div>
    );
}