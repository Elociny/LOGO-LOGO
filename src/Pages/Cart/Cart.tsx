import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CartProduct } from "../../components/CartProduct/CartProduct";
import { Layout } from "../../components/Layout/Layout";
import { ResumeOrder } from "../../components/ResumeOrder/ResumeOrder";
import { Button } from "../../components/Button/Button";
import { Spinner } from "../../components/Spinner/Spinner";
import EmptyCartImg from "../../assets/images/empty-cart.svg";
import style from "./Cart.module.css";
import type { ProductAPI } from "../../types/ProductAPI";

import { Modal } from "../../components/Modal/Modal";

import {
    listarCarrinho,
    removerItem,
    atualizarQuantidade,
    limparCarrinhoCompleto,
    type CarrinhoItemDTO
} from "../../services/carrinhoService";

interface ProductInCart extends ProductAPI {
    cartItemId: number;
    inStock: boolean
}

const converterParaProduct = (item: CarrinhoItemDTO): ProductInCart => {
    return {
        id: item.produtoId,
        nome: item.nomeProduto,
        imageUrl: item.imageUrl || "",
        cor: item.cor,
        tamanho: item.tamanho,
        preco: item.preco,
        quantidade: item.quantidade,
        cartItemId: item.id,
        inStock: true,
        descricao: "",
        categoria: "",
        desconto: 0,
        precoComDesconto: item.preco
    };
};

export function Cart() {
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState<ProductInCart[]>([]);
    const [loading, setLoading] = useState(true);
    const [clienteId, setClienteId] = useState<number | null>(null);
    const [selecionadosIds, setSelecionadosIds] = useState<number[]>([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        type: "success" as "success" | "error" | "warning",
        title: "",
        message: ""
    });
    const [acaoConfirmacao, setAcaoConfirmacao] = useState<(() => void) | null>(null);

    const abrirModal = (type: "success" | "error" | "warning", title: string, message: string) => {
        setModalConfig({ type, title, message });
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
        setAcaoConfirmacao(null);
    };

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

    const handleToggleProduto = (produto: ProductAPI, selecionado: boolean) => {
        if (selecionado) {
            setSelecionadosIds(prev => [...prev, produto.id]);
        } else {
            setSelecionadosIds(prev => prev.filter(id => id !== produto.id));
        }
    };

    const handleRemoverProduto = (produto: ProductAPI) => {
        if (!clienteId) return;

        const itemParaRemover = produto as ProductInCart;

        setAcaoConfirmacao(() => async () => {
            try {
                await removerItem(clienteId, itemParaRemover.cartItemId);

                setProdutos(prev => prev.filter(p => p.id !== produto.id));
                setSelecionadosIds(prev => prev.filter(id => id !== produto.id));

                fecharModal();
            } catch (error) {
                console.error(error);
                fecharModal();
                setTimeout(() => {
                    abrirModal("error", "Erro", "Erro ao remover o produto.");
                }, 200);
            }
        });

        abrirModal("warning", "Remover item?", `Deseja remover "${produto.nome}" do seu carrinho?`);
    };

    const handleChangeQuantity = async (produto: ProductAPI, novaQuantidade: number) => {
        if (!clienteId || novaQuantidade < 1) return;

        const produtosAnteriores = [...produtos];

        setProdutos(prev =>
            prev.map(p =>
                p.id === produto.id ? { ...p, quantidade: novaQuantidade } : p
            )
        );

        const itemParaAtualizar = produto as ProductInCart;

        try {
            await atualizarQuantidade(clienteId, itemParaAtualizar.cartItemId, novaQuantidade);
        } catch (error) {
            console.error("Erro ao atualizar quantidade", error);
            setProdutos(produtosAnteriores);
            abrirModal("error", "Erro", "Não foi possível atualizar a quantidade.");
        }
    };

    const solicitarLimpezaCarrinho = () => {
        if (!clienteId) return;

        setAcaoConfirmacao(() => async () => {
            try {
                await limparCarrinhoCompleto(clienteId);
                setProdutos([]);
                setSelecionadosIds([]);
                fecharModal();
            } catch (error) {
                console.error("Erro ao limpar carrinho", error);
                fecharModal();
                setTimeout(() => {
                    abrirModal("error", "Erro", "Erro ao limpar o carrinho. Tente novamente.");
                }, 200);
            }
        });

        abrirModal("warning", "Limpar Carrinho?", "Tem certeza que deseja remover todos os itens do carrinho?");
    };

    const executarAcaoConfirmacao = () => {
        if (acaoConfirmacao) {
            acaoConfirmacao();
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
                                    key={`${produto.id}-${produto.tamanho}`}
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
                            onClick={solicitarLimpezaCarrinho}
                        />
                    )}
                </div>
                <div className={`${style.right}`}>
                    <ResumeOrder produtos={produtosParaResumo} ativo={produtosParaResumo.length > 0} />
                </div>
            </div>

            <Modal
                isOpen={modalOpen}
                onClose={fecharModal}
                type={modalConfig.type}
                title={modalConfig.title}
            >
                <p>{modalConfig.message}</p>

                {modalConfig.type === "warning" ? (
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                        <Button
                            border="arredondada"
                            color="cinza"
                            size="small"
                            text="Cancelar"
                            theme="light"
                            onClick={fecharModal}
                        />
                        <Button
                            border="arredondada"
                            color="laranja"
                            size="small"
                            text="Sim"
                            theme="light"
                            onClick={executarAcaoConfirmacao}
                        />
                    </div>
                ) : (
                    <div style={{ marginTop: '20px' }}>
                        <Button
                            border="arredondada"
                            color="cinza"
                            size="small"
                            text="Fechar"
                            theme="light"
                            onClick={fecharModal}
                        />
                    </div>
                )}
            </Modal>
        </Layout>
    )
}