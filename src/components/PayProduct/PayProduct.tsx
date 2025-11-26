import style from "./PayProduct.module.css"
import { Counter } from "../Counter/Counter"
import type { ProductAPI } from "../../types/ProductAPI" 

interface ProductWithStock extends ProductAPI {
    estoqueTotal?: number;
}

interface PayProductProps {
    produto: ProductWithStock;
    onRemove?: (produto: ProductAPI) => void; 
    onQuantityChange?: (produto: ProductAPI, qtd: number) => void; 
}

export function PayProduct({ produto, onRemove, onQuantityChange }: PayProductProps) {
    
    const totalItem = (produto.preco * produto.quantidade);

    const handleQuantityChange = (novaQtd: number) => {
        if (produto.estoqueTotal && novaQtd > produto.estoqueTotal) return;
        
        if (onQuantityChange) {
            onQuantityChange(produto, novaQtd);
        }
    }

    return(
        <div className={`row ${style.payProduct}`}>
            <i 
                className="bi bi-x-lg" 
                style={{ cursor: 'pointer' }}
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
                <p>R$ {produto.preco.toFixed(2).replace(".", ",")}</p>
            </div>

            <Counter 
                inicio={produto.quantidade}
                maximo={produto.estoqueTotal}
                onChange={handleQuantityChange}
            />

            <div className={`${style.precoTotal}`}>
                <p><b>R$ {totalItem.toFixed(2).replace(".", ",")}</b></p>
            </div>
        </div>
    )
}