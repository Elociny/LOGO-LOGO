
import type { ProductAPI } from "../../types/ProductAPI";
import { Button } from "../Button/Button";
import { Counter } from "../Counter/Counter";
import style from "./InfoProduct.module.css"

interface InfoProductProps {
    produto: ProductAPI
}

export function InfoProduct({ produto }: InfoProductProps) {
    const calculateOldPrice = (currentPrice: number, discountPercent: number) => {
        return currentPrice / (1 - discountPercent / 100);
    };

    const safePrice = Number(produto.preco ?? 0);
    return (
        <div className={`row ${style.info_product}`}>
            <div className={`${style.right}`}>
                <img src={produto.imageUrl} className={`${style.imagem_produto}`} alt={`Imagem do produto ${produto.nome}`}/>
            </div>

            <div className={`${style.detalhes}`}>
                <p>{produto.categoria}</p>
                <h2>{produto.nome}</h2>

                <div className={`row ${style.avaliacao}`}>
                    <div className={`row ${style.stars}`}>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-half"></i>
                    </div>
                    <p>4.5<span>/5</span></p>
                </div>

                <p className={`${style.descricao}`}>{produto.descricao}</p>

                <div className={style.preco}>
                    {produto.desconto ? (
                        <>
                            <div className={style.linhaPreco}>
                                <p className={style.precoAtual}>
                                    R$ {safePrice.toFixed(2)}
                                </p>
                                <p className={style.precoAntigo}>
                                    R$ {calculateOldPrice(safePrice, produto.desconto).toFixed(2)}
                                </p>
                            </div>

                            <div className={style.desconto}>
                                -{produto.desconto}%
                            </div>
                        </>
                    ) : (
                        <p className={style.precoSemDesconto}>
                            R$ {safePrice.toFixed(2)}
                        </p>
                    )}
                </div>

                <div className={`${style.tamanho}`}>
                    <h3>Tamanhos</h3>

                    <div className={`row ${style.tamanhos}`}>
                        <p className={`${style.size}`}>{produto.tamanho}</p>
                    </div>
                </div>

                <div className={`${style.cores}`}>
                    <h3>Cores</h3>
                    <div className={`row ${style.colors}`}>
                        <div
                            className={style.circle_color}
                            style={{ backgroundColor: produto.cor }}
                        ></div>
                    </div>
                </div>

                <div className={`row ${style.compra}`}>
                    <Counter />
                    <Button border="arredondada" color="cinza" size="big" text="adicionar ao carrinho" theme="light" />

                    <Button border="arredondada" color="laranja" size="big" text="comprar" theme="light" />
                </div>

                <hr />

                <p className={`${style.id}`}>id: {produto.id}</p>
            </div>
        </div>
    )
}