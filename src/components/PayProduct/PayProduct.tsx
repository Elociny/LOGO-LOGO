import style from "./PayProduct.module.css"
import { Counter } from "../Counter/Counter"
import type { ProductAPI } from "../../types/ProductAPI" 

interface PayProductProps {
    produto: ProductAPI;
    onRemove?: (produto: ProductAPI) => void; 
    onQuantityChange?: (produto: ProductAPI, qtd: number) => void; 
}

export function PayProduct({ produto, onRemove, onQuantityChange }: PayProductProps) {
    
    const totalItem = (produto.preco * produto.quantidade);

    return(
        <div className={`row ${style.payProduct}`}>
            <i 
                className="bi bi-x-lg" 
                onClick={() => onRemove && onRemove(produto)}
            ></i>

            <img 
                src={produto.imageUrl} 
                alt={produto.nome} 
                className={`${style.image}`} 
            />

            <div className={`${style.productInfo}`}>
                <h3>{produto.nome}</h3>
                <p>Tamanho: <b>{produto.tamanho}</b></p>
                <p>Cor: <b>{produto.cor}</b></p>
            </div>

            <div className={`${style.preco}`}>
                <p>R$ {produto.preco.toFixed(2)}</p>
            </div>

            <Counter 
                inicio={produto.quantidade}
                onChange={(novaQtd) => onQuantityChange && onQuantityChange(produto, novaQtd)}
            />

            <div className={`${style.precoTotal}`}>
                <p><b>R$ {totalItem.toFixed(2)}</b></p>
            </div>
        </div>
    )
}