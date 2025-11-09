import style from "./CartProduct.module.css"

import { Counter } from "../Counter/Counter";
import type { Product } from "../../types/Product";
import { useState } from "react";

interface CartProductProps {
    produto: Product
    selecionado?: boolean
    onToggle?: (produto: Product, selecionado: boolean) => void
    onQuantityChange?: (produto: Product, novaQuantidade: number) => void
    onRemove?: (produto: Product) => void
}

export function CartProduct({ produto,
    selecionado = true,
    onToggle,
    onQuantityChange,
    onRemove
    }: CartProductProps) {
        
    const [quantity, setQuantity] = useState(1)
    const totalPrice = produto.unitPrice * quantity

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onToggle?.(produto, e.target.checked)
    }

    const handleQuantityChange = (novaQtd: number) => {
        setQuantity(novaQtd)
        onQuantityChange?.(produto, novaQtd)
    }

    const handleRemove = () => {
        onRemove?.(produto)
    }

    return (
        <div className={`row ${style.cartProduct} ${!produto.inStock ? style.outOfStock : ""}`}>
            <input 
                type="checkbox" 
                name={`product-${produto.id}`} 
                id={`product-${produto.id}`} 
                checked={selecionado} 
                disabled={!produto.inStock} 
                onChange={handleCheckboxChange} 
            />
            <label htmlFor={`product-${produto.id}`} className={`row ${style.label}`}>
                <img src={produto.image} alt={`Imagem do produto ${produto.name}`} />

                <div className={`${style.infos}`}>
                    <h3>{produto.name}</h3>
                    <div className={`row ${style.gap} ${style.estoque}`}>
                        <p>R$ {produto.unitPrice.toFixed(2).replace(".", ",")}</p>
                        <span className={`${style[produto.inStock ? "emEstoque" : "semEstoque"]}`}>
                            {produto.inStock ? "Em estoque" : "Sem estoque"}
                        </span>
                    </div>
                    <p>Tamanho: {produto.size}</p>
                    <div className={`row ${style.cor}`}>
                        <p>Cor</p>
                        <div className={`${style.circle}`} style={{ backgroundColor: produto.color }}></div>
                    </div>
                    <Counter inicio={quantity} onChange={handleQuantityChange} />
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