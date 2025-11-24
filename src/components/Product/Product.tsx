import { useNavigate } from "react-router"; // 1. Importei o useNavigate
import { Button } from "../Button/Button";
import style from "./Product.module.css";

interface ProductProps {
    id: string | number; // 2. Adicionei o ID aqui pra parar o erro na Home
    image: string;
    name: string;
    price: number;
    discount?: number;
}

export function Product({ id, image, name, price, discount }: ProductProps) {
    const navigate = useNavigate(); // 3. Hook para navegar

    // 4. Função que leva para a página do produto
    const handleCardClick = (e: React.MouseEvent) => {
        // Isso impede que o clique no card aconteça se você clicar no botão "Comprar"
        // (Assumindo que o botão comprar leva pro carrinho direto)
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.tagName === 'BUTTON') {
            return;
        }
        navigate(`/produto/${id}`);
    };

    const calculateOldPrice = (currentPrice: number, discountPercent: number) => {
        return currentPrice / (1 - discountPercent / 100);
    };

    return (
        // 5. Adicionei o onClick no card inteiro e cursor pointer
        <div 
            className={style.product} 
            onClick={handleCardClick}
            style={{ cursor: "pointer" }} 
        >
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
                        <div className={style.linhaPreco}>
                            <p className={style.precoAtual}>
                                R$ {price.toFixed(2)}
                            </p>
                            <p className={style.precoAntigo}>
                                R$ {calculateOldPrice(price, discount).toFixed(2)}
                            </p>
                        </div>
                       
                        <div className={style.desconto}>
                            -{discount}%
                        </div>
                    </>
                ) : (
                    <p className={style.precoSemDesconto}>
                        R$ {price.toFixed(2)}
                    </p>
                )}
                
                <div className={style.botaoComprar}>
                    <Button 
                        theme="light" 
                        size="small" 
                        color="laranja" 
                        border="quadrada" 
                        text="comprar" 
                        navegation="/carrinho"
                    />
                </div>
            </div>
        </div>
    );
}