
import { Button } from "../Button/Button";
import { Counter } from "../Counter/Counter";
import style from "./InfoProduct.module.css"

interface InfoProductProps {
    image: string;
    name: string;
    price: number | undefined;
    discount?: number;
}

export function InfoProduct({ image, name, price, discount }: InfoProductProps) {
    const calculateOldPrice = (currentPrice: number, discountPercent: number) => {
        return currentPrice / (1 - discountPercent / 100);
    };

    const safePrice = Number(price ?? 0);
    return (
        <div className={`row ${style.info_product}`}>
            <div className={`${style.right}`}>
                <img src={image} className={`${style.imagem_produto}`} alt="Imagm do produto" />
            </div>

            <div className={`${style.detalhes}`}>
                <p>categoria</p>
                <h2>{name}</h2>

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

                <p className={`${style.descricao}`}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime pariatur molestias dolorum expedita error. Numquam quas quidem soluta. Doloribus laboriosam debitis distinctio delectus ducimus inventore veniam dignissimos illum molestias provident?</p>

                <div className={style.preco}>
                    {discount ? (
                        <>
                            <div className={style.linhaPreco}>
                                <p className={style.precoAtual}>
                                    R$ {safePrice.toFixed(2)}
                                </p>
                                <p className={style.precoAntigo}>
                                    R$ {calculateOldPrice(safePrice, discount).toFixed(2)}
                                </p>
                            </div>

                            <div className={style.desconto}>
                                -{discount}%
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
                        <p className={`${style.size}`}>p</p>
                        <p className={`${style.size}`}>m</p>
                        <p className={`${style.size}`}>g</p>
                        <p className={`${style.size}`}>gg</p>
                        <p className={`${style.size}`}>exgg</p>
                    </div>
                </div>

                <div className={`${style.cores}`}>
                    <h3>Cores</h3>
                    <div className={`row ${style.colors}`}>
                        <div className={`${style.circle_color}`}></div>
                        <div className={`${style.circle_color}`}></div>
                        <div className={`${style.circle_color}`}></div>
                        <div className={`${style.circle_color}`}></div>
                        <div className={`${style.circle_color}`}></div>
                        <div className={`${style.circle_color}`}></div>
                    </div>
                </div>

                <div className={`row ${style.compra}`}>
                    <Counter />
                    <Button border="arredondada" color="cinza" size="big" text="adicionar ao carrinho" theme="light" />

                    <Button border="arredondada" color="laranja" size="big" text="comprar" theme="light" />
                </div>

                <hr />

                <p className={`${style.id}`}>id: jmdsngvjsfndjkvgn</p>
            </div>
        </div>
    )
}