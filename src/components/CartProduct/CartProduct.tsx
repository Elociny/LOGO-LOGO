import style from "./CartProduct.module.css"
import { Counter } from "../Counter/Counter";
import { useState, useEffect } from "react";
import type { ProductAPI } from "../../types/ProductAPI";

interface ProductWithDetails extends ProductAPI {
    inStock?: boolean;
    estoqueTotal?: number;
}

interface CartProductProps {
    produto: ProductWithDetails
    selecionado?: boolean
    onToggle?: (produto: ProductAPI, selecionado: boolean) => void
    onQuantityChange?: (produto: ProductAPI, novaQuantidade: number) => void
    onRemove?: (produto: ProductAPI) => void
}

export function CartProduct({
    produto,
    selecionado = true,
    onToggle,
    onQuantityChange,
    onRemove
}: CartProductProps) {

    const [quantity, setQuantity] = useState(produto.quantidade || 1)

    useEffect(() => {
        setQuantity(produto.quantidade || 1);
    }, [produto.quantidade]);

    const totalPrice = produto.preco * quantity

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onToggle?.(produto, e.target.checked)
    }

    const handleQuantityChange = (novaQtd: number) => {
        if (produto.estoqueTotal && novaQtd > produto.estoqueTotal) return;

        setQuantity(novaQtd)
        onQuantityChange?.(produto, novaQtd)
    }

    const handleRemove = () => {
        onRemove?.(produto)
    }

    const isInStock = produto.inStock !== undefined ? produto.inStock : true;

    return (
        <div className={`row ${style.cartProduct} ${!isInStock ? style.outOfStock : ""}`}>
            <input
                type="checkbox"
                name={`product-${produto.id}`}
                id={`product-${produto.id}`}
                checked={selecionado}
                disabled={!isInStock}
                onChange={handleCheckboxChange}
            />
            <label htmlFor={`product-${produto.id}`} className={`row ${style.label}`}>
                <img src={produto.imageUrl} alt={`Imagem do produto ${produto.nome}`} className={`${style.cartImage}`} />

                <div className={`${style.infos}`}>
                    <h3>{produto.nome}</h3>
                    <div className={`row ${style.gap} ${style.estoque}`}>
                        <p>R$ {produto.preco.toFixed(2).replace(".", ",")}</p>
                        <span className={`${style[isInStock ? "emEstoque" : "semEstoque"]}`}>
                            {isInStock ? "Em estoque" : "Sem estoque"}
                        </span>
                    </div>
                    <p>Tamanho: {produto.tamanho}</p>
                    <div className={`row ${style.cor}`}>
                        <p>Cor</p>
                        <div className={`${style.circle}`} style={{ backgroundColor: produto.cor }}></div>
                    </div>
                    
                    <Counter 
                        inicio={quantity} 
                        maximo={produto.estoqueTotal} 
                        onChange={handleQuantityChange} 
                    />
                </div>

                <div className={`${style.price}`}>
                    <h2>R$ {totalPrice.toFixed(2).replace(".", ",")}</h2>

                    <button className={`row ${style.trash}`} onClick={handleRemove}>
                        Remover
                        <i className="bi bi-trash-fill"></i>
                    </button>
                </div>
            </label>
        </div>
    )
}