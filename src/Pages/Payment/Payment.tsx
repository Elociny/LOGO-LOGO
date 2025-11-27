import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AxiosError } from "axios";
import { Address } from "../../components/Address/Address";
import { Layout } from "../../components/Layout/Layout";
import { ResumeOrder } from "../../components/ResumeOrder/ResumeOrder";
import { Button } from "../../components/Button/Button";
import { Spinner } from "../../components/Spinner/Spinner";
import style from "./Payment.module.css";

import type { ProductAPI } from "../../types/ProductAPI";
import { listarEnderecos, type EnderecoDTO } from "../../services/enderecoService";
import {
    listarCarrinho,
    removerItem,
    atualizarQuantidade,
    type CarrinhoItemDTO
} from "../../services/carrinhoService";
import { cadastrarCartao, listarCartoes, type CartaoResponseDTO } from "../../services/cartaoService";
import { salvarCompra } from "../../services/compraService";

import { PayProduct } from "../../components/PayProduct/PayProduct";
import { PayMethod, type DadosCartao } from "../../components/PayMethod/PayMethod";
import { Modal } from "../../components/Modal/Modal";

interface ProductAPIInCart extends ProductAPI {
    cartItemId: number;
    estoqueTotal: number;
    inStock: boolean;
}

const converterParaProductAPI = (item: CarrinhoItemDTO): ProductAPIInCart => {
    return {
        id: item.produtoId,
        nome: item.nomeProduto,
        imageUrl: item.imageUrl || "",
        cor: item.cor,
        tamanho: item.tamanho,
        preco: item.preco,
        quantidade: item.quantidade,
        cartItemId: item.id,
        estoqueTotal: item.estoqueTotal,
        inStock: item.estoqueTotal > 0,
        categoria: "",
        descricao: "",
        desconto: 0,
        precoComDesconto: item.preco
    };
};

export function Payment() {
    const navigate = useNavigate();
    const location = useLocation();

    const [enderecos, setEnderecos] = useState<EnderecoDTO[]>([]);
    const [enderecoSelecionadoId, setEnderecoSelecionadoId] = useState<number | null>(null);
    const [produtos, setProdutos] = useState<ProductAPIInCart[]>([]);
    const [dadosUsuario, setDadosUsuario] = useState({ nome: "", telefone: "" });
    const [loading, setLoading] = useState(true);
    const [clienteId, setClienteId] = useState<number | null>(null);

    const [metodoPagamento, setMetodoPagamento] = useState<"cartao" | "pix">("cartao");
    
    const [cartoesSalvos, setCartoesSalvos] = useState<CartaoResponseDTO[]>([]);
    const [idCartaoSelecionado, setIdCartaoSelecionado] = useState<number | null>(null);

    const [dadosCartao, setDadosCartao] = useState<DadosCartao>({
        titular: "",
        cpf: "",
        numero: "",
        codigoSeguranca: "",
        validadeMes: "",
        validadeAno: ""
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        type: "success" as "success" | "error" | "warning",
        title: "",
        message: ""
    });

    const abrirModal = (type: "success" | "error" | "warning", title: string, message: string) => {
        setModalConfig({ type, title, message });
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
    };

    const carregarDados = useCallback(async (userId: number, itensVindosDaNavegacao?: ProductAPIInCart[]) => {
        try {
            setLoading(true);
            
            const [listaEnderecos, dadosCarrinho, listaCartoes] = await Promise.all([
                listarEnderecos(userId),
                listarCarrinho(userId),
                listarCartoes(userId) 
            ]);

            setEnderecos(listaEnderecos);
            setCartoesSalvos(listaCartoes); 

            if (listaEnderecos.length > 0) {
                setEnderecoSelecionadoId(listaEnderecos[0].id || null);
            }

            if (itensVindosDaNavegacao && itensVindosDaNavegacao.length > 0) {
                const validos = itensVindosDaNavegacao.filter(p => p.estoqueTotal > 0);
                setProdutos(validos);
            } else {
                const produtosFormatados = dadosCarrinho.itens.map(converterParaProductAPI);
                setProdutos(produtosFormatados.filter(p => p.estoqueTotal > 0));
            }
        } catch (error) {
            console.error("Erro ao carregar dados", error);
        } finally {
            setLoading(false);
        }
    }, []); 

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario_logado");
        if (usuarioSalvo) {
            const usuario = JSON.parse(usuarioSalvo);
            setClienteId(usuario.id);
            setDadosUsuario({ nome: usuario.nome, telefone: usuario.telefone });

            carregarDados(usuario.id, location.state?.items);
        } else {
            navigate("/login");
        }
    }, [navigate, location.state, carregarDados]);

    const handleDadosCartaoChange = (campo: keyof DadosCartao, valor: string) => {
        setDadosCartao(prev => ({ ...prev, [campo]: valor }));
    };

    const handleRemoverProduto = async (produto: ProductAPI) => {
        if (!clienteId) return;
        const item = produto as ProductAPIInCart;
        try {
            await removerItem(clienteId, item.cartItemId);
            setProdutos(prev => prev.filter(p => p.cartItemId !== item.cartItemId));
        } catch (error) {
            console.error(error);
            abrirModal("error", "Erro", "Erro ao remover produto.");
        }
    };

    const handleChangeQuantity = async (produto: ProductAPI, novaQuantidade: number) => {
        if (!clienteId || novaQuantidade < 1) return;

        const itemParaAtualizar = produto as ProductAPIInCart;

        if (novaQuantidade > itemParaAtualizar.estoqueTotal) {
            abrirModal("warning", "Estoque Limite", `Apenas ${itemParaAtualizar.estoqueTotal} unidades disponíveis.`);
            return;
        }

        const produtosAnteriores = [...produtos];

        setProdutos(prev =>
            prev.map(p =>
                p.cartItemId === itemParaAtualizar.cartItemId
                    ? { ...p, quantidade: novaQuantidade }
                    : p
            )
        );

        try {
            await atualizarQuantidade(clienteId, itemParaAtualizar.cartItemId, novaQuantidade);
        } catch (error) {
            console.error("Erro ao atualizar quantidade", error);
            setProdutos(produtosAnteriores);
            abrirModal("error", "Erro", "Não foi possível atualizar a quantidade.");
        }
    };

    const handleFinalizarPedido = async () => {
        if (!clienteId) return;

        if (!enderecoSelecionadoId) {
            abrirModal("warning", "Endereço", "Por favor, selecione um endereço de entrega.");
            return;
        }

        if (produtos.length === 0) {
            abrirModal("warning", "Vazio", "Não há produtos válidos para compra.");
            return;
        }

        try {
            setLoading(true);
            let idCartaoParaCompra: number | null = null;

            if (metodoPagamento === "cartao") {
                if (!idCartaoSelecionado) {
                    if (!dadosCartao.numero || !dadosCartao.titular || !dadosCartao.validadeMes || !dadosCartao.validadeAno || !dadosCartao.codigoSeguranca) {
                        abrirModal("warning", "Dados do Cartão", "Preencha todos os dados do cartão.");
                        setLoading(false);
                        return;
                    }

                    const validadeFormatada = `${dadosCartao.validadeMes}/${dadosCartao.validadeAno}`;
                    const numeroLimpo = dadosCartao.numero.replace(/\s/g, "");

                    const novoCartao = await cadastrarCartao({
                        clienteId: clienteId,
                        numero: numeroLimpo,
                        nomeTitular: dadosCartao.titular,
                        validade: validadeFormatada,
                        cvv: dadosCartao.codigoSeguranca,
                        tipo: "CREDITO",
                        bandeira: "MASTERCARD"
                    });

                    idCartaoParaCompra = novoCartao.id;
                } else {
                    idCartaoParaCompra = idCartaoSelecionado;
                    
                    if (!dadosCartao.codigoSeguranca) {
                         abrirModal("warning", "CVV Obrigatório", "Por segurança, informe o CVV do cartão selecionado.");
                         setLoading(false);
                         return;
                    }
                }
            }

            const listaIdsProdutos: number[] = [];
            produtos.forEach(p => {
                for (let i = 0; i < p.quantidade; i++) {
                    listaIdsProdutos.push(p.id);
                }
            });
            
            const compraRealizada = await salvarCompra({
                clienteId: clienteId,
                produtosIds: listaIdsProdutos,
                formaPagamento: metodoPagamento === "cartao" ? "CARTAO" : "PIX",
                cartaoId: idCartaoParaCompra
            });

            await Promise.all(
                produtos.map(p => removerItem(clienteId, p.cartItemId))
            );

            navigate(`/pagamento-concluido/${compraRealizada.id}`);

        } catch (error) {
            const err = error as AxiosError;
            console.error("Erro detalhado:", err);

            let mensagemErro = "Erro ao processar o pedido.";

            if (err.response && err.response.data) {
                const dadosErro = err.response.data;

                interface SpringValidationError {
                    errors?: Array<{ defaultMessage: string }>;
                    message?: string;
                    error?: string;
                }

                if (typeof dadosErro === 'string') {
                    if (dadosErro.trim().startsWith("<") || dadosErro.length > 200) {
                        mensagemErro = "Ocorreu um erro interno no servidor.";
                    } else {
                        mensagemErro = dadosErro;
                    }
                } else if (typeof dadosErro === 'object' && dadosErro !== null) {
                    const erroObjeto = dadosErro as SpringValidationError;

                    if (erroObjeto.errors && Array.isArray(erroObjeto.errors) && erroObjeto.errors.length > 0) {
                        mensagemErro = erroObjeto.errors[0].defaultMessage;
                    }
                    else {
                        mensagemErro = erroObjeto.message || erroObjeto.error || JSON.stringify(dadosErro);
                    }
                }
            }

            abrirModal("error", "Atenção", mensagemErro);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
                    <Spinner />
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className={`row ${style.payment}`}>
                <div className={`${style.right}`}>
                    <h2><i className="bi bi-geo-alt-fill"></i> Endereço de Entrega</h2>
                    {enderecos.length === 0 ? (
                        <div className={`row ${style.semEndereco}`}>
                            <p>Você não tem endereços cadastrados.</p>
                            <Button border="arredondada" color="branco" text="Cadastrar Endereço" theme="light" size="small" navegation="/configuracoes/adicionar-endereco" />
                        </div>
                    ) : (
                        <div className={`${style.endereco}`}>
                            {enderecos.map((end) => (
                                <div key={end.id} className={style.radioOption}>
                                    <Address
                                        nome={dadosUsuario.nome}
                                        telefone={dadosUsuario.telefone}
                                        logradouro={end.logradouro}
                                        numero={end.numero}
                                        bairro={end.bairro}
                                        cidade={end.cidade}
                                        estado={end.estado}
                                        cep={end.cep}
                                        complemento={end.complemento}
                                    />
                                    <label>
                                        <input
                                            type="radio"
                                            name="enderecoSelecionado"
                                            checked={enderecoSelecionadoId === end.id}
                                            onChange={() => setEnderecoSelecionadoId(end.id || null)}
                                        />
                                        Entregar aqui
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}

                    <hr />

                    <div className={`${style.produto}`}>
                        <h3 className={`${style.titulo}`}>Resumo dos Itens</h3>
                        {produtos.map(produto => (
                            <PayProduct
                                key={produto.cartItemId}
                                produto={produto}
                                onRemove={handleRemoverProduto}
                                onQuantityChange={handleChangeQuantity}
                            />
                        ))}
                    </div>

                    <hr />

                    <div className={`${style.metodoPagamento}`}>
                        <h2>Método de pagamento</h2>
                        <PayMethod
                            metodo={metodoPagamento}
                            onMetodoChange={setMetodoPagamento}
                            dadosCartao={dadosCartao}
                            onDadosCartaoChange={handleDadosCartaoChange}
                            valorTotal={produtos.reduce((acc, p) => acc + (p.preco * p.quantidade), 0)}
                            cartoesSalvos={cartoesSalvos}
                            onSelecionarCartaoSalvo={(id) => setIdCartaoSelecionado(id)}
                        />
                    </div>
                </div>

                <div className={`${style.left}`}>
                    <ResumeOrder
                        produtos={produtos}
                        ativo={produtos.length > 0}
                        onClick={handleFinalizarPedido}
                        textoBotao="FINALIZAR PEDIDO"
                        loading={loading}
                    />
                </div>
            </div>

            <Modal
                isOpen={modalOpen}
                onClose={fecharModal}
                type={modalConfig.type}
                title={modalConfig.title}
            >
                <p>{modalConfig.message}</p>

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
            </Modal>
        </Layout>
    )
}