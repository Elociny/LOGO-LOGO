import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { ProductAPI } from "../../types/ProductAPI";
import { Button } from "../Button/Button";
import { Counter } from "../Counter/Counter";
import { adicionarAoCarrinho } from "../../services/carrinhoService";

import style from "./InfoProduct.module.css";

import { Modal } from "../Modal/Modal";

interface InfoProductProps {
    produto: ProductAPI
}

export function InfoProduct({ produto }: InfoProductProps) {
    const navigate = useNavigate();

    const [quantidade, setQuantidade] = useState(1);
    const [loading, setLoading] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        type: "success" as "success" | "error" | "warning",
        title: "",
        message: ""
    });
    
    const [actionType, setActionType] = useState<'login' | 'carrinho' | null>(null);

    const abrirModal = (type: "success" | "error" | "warning", title: string, message: string) => {
        setModalConfig({ type, title, message });
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
        setActionType(null);
    };

    const handleConfirmAction = () => {
        if (actionType === 'login') {
            navigate("/login");
        } else if (actionType === 'carrinho') {
            navigate("/carrinho");
        }
        fecharModal();
    };

    const calculateOldPrice = (currentPrice: number, discountPercent: number) => {
        return currentPrice / (1 - discountPercent / 100);
    };

    const safePrice = Number(produto.preco ?? 0);

    async function handleAdicionar(redirecionarImediatamente: boolean) {
        const usuarioSalvo = localStorage.getItem("usuario_logado");
        
        if (!usuarioSalvo) {
            setActionType('login');
            abrirModal("warning", "Login necessário", "Você precisa estar logado para comprar. Deseja fazer login agora?");
            return;
        }

        const usuario = JSON.parse(usuarioSalvo);

        try {
            setLoading(true);

            await adicionarAoCarrinho(usuario.id, produto.id, quantidade);

            if (redirecionarImediatamente) {
                navigate("/carrinho");
            } else {
                setActionType('carrinho');
                abrirModal("success", "Sucesso!", "Produto adicionado ao carrinho! O que deseja fazer agora?");
            }

        } catch (error) {
            console.error("Erro ao adicionar ao carrinho:", error);

            abrirModal("error", "Erro", "Não foi possível adicionar o produto. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`row ${style.info_product}`}>
            <div className={`${style.right}`}>
                <img 
                    src={produto.imageUrl} 
                    className={`${style.imagem_produto}`} 
                    alt={`Imagem do produto ${produto.nome}`}
                />
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
                            title={produto.cor}
                        ></div>
                    </div>
                </div>

                <div className={`row ${style.compra}`}>
                    <Counter 
                        inicio={1}
                        maximo={produto.quantidade} 
                        onChange={(novaQtd) => setQuantidade(novaQtd)} 
                    />

                    <Button 
                        border="arredondada" 
                        color="cinza" 
                        size="big" 
                        text={loading ? "Adicionando..." : "adicionar ao carrinho"} 
                        theme="light"
                        onClick={() => handleAdicionar(false)}
                    />

                    <Button 
                        border="arredondada" 
                        color="laranja" 
                        size="big" 
                        text="comprar" 
                        theme="light" 
                        onClick={() => handleAdicionar(true)}
                    />
                </div>

                <hr />

                <p className={`${style.id}`}>id: {produto.id}</p>
            </div>

            <Modal 
                isOpen={modalOpen} 
                onClose={fecharModal} 
                type={modalConfig.type} 
                title={modalConfig.title}
            >
                <p>{modalConfig.message}</p>

                {actionType ? (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
                        <Button 
                            border="arredondada" 
                            color="cinza" 
                            size="small" 
                            text={actionType === 'carrinho' ? "Continuar comprando" : "Cancelar"} 
                            theme="light" 
                            onClick={fecharModal} 
                        />
                        <Button 
                            border="arredondada" 
                            color="laranja" 
                            size="small" 
                            text={actionType === 'carrinho' ? "Ir para o carrinho" : "Ir para Login"} 
                            theme="light" 
                            onClick={handleConfirmAction} 
                        />
                    </div>
                ) : (
                    <div style={{marginTop: '20px'}}>
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
        </div>
    )
}