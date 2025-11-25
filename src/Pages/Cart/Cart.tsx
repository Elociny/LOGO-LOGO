import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router"; // ou react-router-dom
import { CartProduct } from "../../components/CartProduct/CartProduct";
import { Layout } from "../../components/Layout/Layout";
import { ResumeOrder } from "../../components/ResumeOrder/ResumeOrder";
import { Button } from "../../components/Button/Button";
import { Spinner } from "../../components/Spinner/Spinner";
import EmptyCartImg from "../../assets/images/empty-cart.svg";
import style from "./Cart.module.css";
import type { Product } from "../../types/Product";

import {
    listarCarrinho,
    removerItem,
    atualizarQuantidade,
    limparCarrinhoCompleto,
    type CarrinhoItemDTO
} from "../../services/carrinhoService";

interface ProductInCart extends Product {
    cartItemId: number;
}

const converterParaProduct = (item: CarrinhoItemDTO): ProductInCart => {
    return {
        id: item.produtoId,
        name: item.nomeProduto,
        image: item.imageUrl || "",
        color: item.cor,
        size: item.tamanho,
        unitPrice: item.preco,
        inStock: true,
        quantity: item.quantidade,
        cartItemId: item.id
    };
};

export function Cart() {
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState<ProductInCart[]>([]);
    const [loading, setLoading] = useState(true);
    const [clienteId, setClienteId] = useState<number | null>(null);

    const [selecionadosIds, setSelecionadosIds] = useState<number[]>([]);

    const carregarCarrinho = useCallback(async (id: number) => {
        try {
            setLoading(true);
            const dados = await listarCarrinho(id);

            const produtosFormatados = dados.itens.map(item => converterParaProduct(item));

            setProdutos(produtosFormatados);

            setSelecionadosIds(produtosFormatados.map(p => p.id));
        } catch (error) {
            console.error("Erro ao carregar carrinho", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario_logado");
        if (usuarioSalvo) {
            const usuario = JSON.parse(usuarioSalvo);
            setClienteId(usuario.id);
            carregarCarrinho(usuario.id);
        } else {
            navigate("/login");
        }
    }, [navigate, carregarCarrinho]);

    const handleToggleProduto = (produto: Product, selecionado: boolean) => {
        if (selecionado) {
            setSelecionadosIds(prev => [...prev, produto.id]);
        } else {
            setSelecionadosIds(prev => prev.filter(id => id !== produto.id));
        }
    };

    const handleRemoverProduto = async (produto: Product) => {
        if (!clienteId) return;

        const itemParaRemover = produto as ProductInCart;

        try {
            await removerItem(clienteId, itemParaRemover.cartItemId);

            setProdutos(prev => prev.filter(p => p.id !== produto.id));
            setSelecionadosIds(prev => prev.filter(id => id !== produto.id));
        } catch (error) {
            console.error(error);
            alert("Erro ao remover produto.");
        }
    };

    const handleChangeQuantity = async (produto: Product, novaQuantidade: number) => {
        if (!clienteId || novaQuantidade < 1) return;

        const itemParaAtualizar = produto as ProductInCart;

        try {
            await atualizarQuantidade(clienteId, itemParaAtualizar.cartItemId, novaQuantidade);

            setProdutos(prev =>
                prev.map(p =>
                    p.id === produto.id ? { ...p, quantity: novaQuantidade } : p
                )
            );
        } catch (error) {
            console.error("Erro ao atualizar quantidade", error);
        }
    };

    const produtosParaResumo = produtos.filter(p => selecionadosIds.includes(p.id));

    if (loading) {
        return (
            <Layout theme="light">
                <div className={`${style.spinner}`}>
                    <Spinner />
                </div>
            </Layout>
        );
    }

    const handleLimparCarrinho = async () => {
        if (!clienteId) return;

        const confirmacao = window.confirm("Tem certeza que deseja remover todos os itens do carrinho?");

        if (confirmacao) {
            try {
                await limparCarrinhoCompleto(clienteId);

                setProdutos([]);
                setSelecionadosIds([]);

            } catch (error) {
                console.error("Erro ao limpar carrinho", error);
                alert("Erro ao limpar o carrinho. Tente novamente.");
            }
        }
    };

    return (
        <Layout theme="light">
            <div className={`row ${style.container}`}>
                <div className={`${style.left}`}>
                    <h1>Carrinho</h1>

                    {produtos.length === 0 ? (
                        <div className={`row ${style.emptyCart}`}>
                            <h2>Seu carrinho está vazio.</h2>
                            <img src={EmptyCartImg} alt="Carrinho vazio" />
                            <Button border="quadrada" color="laranja" navegation="/" size="big" text="voltar às compras" theme="light" />
                        </div>
                    ) : (
                        <>
                            {produtos.map((produto) => (
                                <CartProduct
                                    key={`${produto.id}-${produto.size}`}
                                    produto={produto}
                                    onToggle={handleToggleProduto}
                                    selecionado={selecionadosIds.includes(produto.id)}
                                    onQuantityChange={handleChangeQuantity}
                                    onRemove={handleRemoverProduto}
                                />
                            ))}
                        </>
                    )}

                    {produtos.length > 0 && (
                        <Button
                            border="quadrada"
                            color="cinza"
                            size="big"
                            text="limpar carinho"
                            theme="light"
                            onClick={handleLimparCarrinho}
                        />
                    )}
                </div>
                <div className={`${style.right}`}>
                    <ResumeOrder produtos={produtosParaResumo} ativo={produtosParaResumo.length > 0} />
                </div>
            </div>
        </Layout>
    )
}