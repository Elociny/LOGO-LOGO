import { CartProduct } from "../../components/CartProduct/CartProduct";
import { Layout } from "../../components/Layout/Layout";
import { ResumeOrder } from "../../components/ResumeOrder/ResumeOrder";

import ProductImg1 from "../../assets/images/products/produto1.svg";
import ProductImg2 from "../../assets/images/products/produto2.svg";
import ProductImg3 from "../../assets/images/products/produto3.svg";
import EmptyCartImg from "../../assets/images/empty-cart.svg";

import style from "./Cart.module.css"
import type { Product } from "../../types/Product";
import { useState } from "react";
import { Button } from "../../components/Button/Button";

const produtosIniciais: Product[] = [
    {
        id: 1,
        name: "Blusa de ombro único assimétrica preta",
        image: ProductImg1,
        color: "black",
        size: "M",
        unitPrice: 79.0,
        inStock: true,
        quantity: 1
    },
    {
        id: 2,
        name: "Camiseta laranja Courage",
        image: ProductImg2,
        color: "orange",
        size: "M",
        unitPrice: 69.99,
        inStock: true,
        quantity: 1
    },
    {
        id: 3,
        name: "Shorts jeans azul",
        image: ProductImg3,
        color: "blue",
        size: "M",
        unitPrice: 55.0,
        inStock: false,
        quantity: 1
    }
]

export function Cart() {
    const [produtosSelecionados, setProdutosSelecionados] = useState<Product[]>(produtosIniciais.filter(p => p.inStock))

    const [produtos, setProdutos] = useState<Product[]>(produtosIniciais);

    const handleToggleProduto = (produto: Product, selecionado: boolean) => {
        if (selecionado) {
            setProdutosSelecionados(prev => [...prev, produto])
        } else {
            setProdutosSelecionados(prev => prev.filter(p => p.id !== produto.id))
        }
    }

    const handleChangeQuantity = (produto: Product, novaQuantidade: number) => {
        setProdutosSelecionados(prev =>
            prev.map(p =>
                p.id === produto.id ? { ...p, quantity: novaQuantidade } : p
            )
        )
    }

    const handleLimparCarrinho = () => {
        setProdutos([])
        setProdutosSelecionados([])
    }

    const handleRemoverProduto = (produto: Product) => {
        setProdutosSelecionados(prev => prev.filter(p => p.id !== produto.id))
    }

    const temItens = produtosSelecionados.length > 0

    const produtosEmEstoque = produtosIniciais.filter((p) => p.inStock)
    const produtosSemEstoque = produtosIniciais.filter((p) => !p.inStock)

    return (
        <Layout theme="light">
            <div className={`row ${style.container}`}>
                <div className={`${style.left}`}>
                    <h1>Carrinho</h1>

                    {produtos.length === 0 ? (
                        <div className={`row ${style.emptyCart}`}>
                            <h2>Seu carrinho está vazio.</h2>
                            <img src={EmptyCartImg} alt="Carrinho vazio" />
                            <Button border="quadrada" color="laranja" navegation="/" size="big" text="voltar" theme="light" />
                        </div>
                    ) : (
                        <>
                            {produtosEmEstoque.map((produto) => (
                                <CartProduct
                                    key={`${produto.id}-${produto.name}`}
                                    produto={produto}
                                    onToggle={handleToggleProduto}
                                    selecionado={produtosSelecionados.some(
                                        (p) => p.id === produto.id
                                    )}
                                    onQuantityChange={handleChangeQuantity}
                                    onRemove={handleRemoverProduto}
                                />
                            ))}

                            <hr />

                            {produtosSemEstoque.map((produto) => (
                                <CartProduct
                                    key={`${produto.id}-${produto.name}`}
                                    produto={produto}
                                    onToggle={handleToggleProduto}
                                    selecionado={false}
                                />
                            ))}
                        </>
                    )}

                    {produtos.length > 0 && (
                        <>
                            <button
                                className={style.clearButton}
                                onClick={handleLimparCarrinho}
                            >
                                Limpar carrinho
                            </button>
                        </>
                    )}
                </div>
                <div className={`${style.right}`}>
                    <ResumeOrder produtos={produtosSelecionados} ativo={temItens} />
                </div>
            </div>
        </Layout>
    )
}