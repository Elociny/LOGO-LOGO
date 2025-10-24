import { Button } from "../Button/Button";
import style from "./Product.module.css";

interface ProductProps {
    image: string;
    name: string;
    price: number;
    discount?: number;
}

export function Product({ image, name, price, discount }: ProductProps) {
    const calculateOldPrice = (currentPrice: number, discountPercent: number) => {
        return currentPrice / (1 - discountPercent / 100);
    };

    return (
        <div className={style.product}>
            <img src={image} alt={name} />
            <h3>{name}</h3>
            
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
                {discount ? (
                    <>
                        {/* VALORES NA MESMA LINHA */}
                        <div className={style.linhaPreco}>
                            <p className={style.precoAtual}>
                                R$ {price.toFixed(2)}
                            </p>
                            <p className={style.precoAntigo}>
                                R$ {calculateOldPrice(price, discount).toFixed(2)}
                            </p>
                        </div>
                        {/* DESCONTO EMBAIXO */}
                        <div className={style.desconto}>
                            -{discount}%
                        </div>
                    </>
                ) : (
                    <p className={style.precoSemDesconto}>
                        R$ {price.toFixed(2)}
                    </p>
                )}
                
                {/* BOTÃO DE COMPRAR */}
                <div className={style.botaoComprar}>
                    <Button 
                        theme="light" 
                        size="small" 
                        color="laranja" 
                        border="quadrada" 
                        text="comprar" 
                    />
                </div>
            </div>
        </div>
    );
}