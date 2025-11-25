import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Address } from "../../components/Address/Address";
import { Layout } from "../../components/Layout/Layout";
import { ResumeOrder } from "../../components/ResumeOrder/ResumeOrder";
import { Button } from "../../components/Button/Button"; 
import style from "./Payment.module.css";

import type { ProductAPI } from "../../types/ProductAPI"; 
import { listarEnderecos, type EnderecoDTO } from "../../services/enderecoService";
import { 
    listarCarrinho, 
    removerItem, 
    atualizarQuantidade, 
    type CarrinhoItemDTO,
    limparCarrinhoCompleto
} from "../../services/carrinhoService";
import { cadastrarCartao } from "../../services/cartaoService";

import { PayProduct } from "../../components/PayProduct/PayProduct";
import { PayMethod, type DadosCartao } from "../../components/PayMethod/PayMethod";

interface ProductAPIInCart extends ProductAPI {
    cartItemId: number;
}

export function Payment() {
    const navigate = useNavigate();

    const [enderecos, setEnderecos] = useState<EnderecoDTO[]>([]);
    const [enderecoSelecionadoId, setEnderecoSelecionadoId] = useState<number | null>(null);
    const [produtos, setProdutos] = useState<ProductAPIInCart[]>([]);
    const [dadosUsuario, setDadosUsuario] = useState({ nome: "", telefone: "" });
    const [loading, setLoading] = useState(true);
    const [clienteId, setClienteId] = useState<number | null>(null);

    const [metodoPagamento, setMetodoPagamento] = useState<"cartao" | "pix">("cartao");
    const [dadosCartao, setDadosCartao] = useState<DadosCartao>({
        titular: "",
        cpf: "",
        numero: "",
        codigoSeguranca: "",
        validadeMes: "",
        validadeAno: ""
    });

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario_logado");
        if (usuarioSalvo) {
            const usuario = JSON.parse(usuarioSalvo);
            setClienteId(usuario.id);
            setDadosUsuario({ nome: usuario.nome, telefone: usuario.telefone });
            carregarDados(usuario.id);
        } else {
            navigate("/login");
        }
    }, [navigate]);

    async function carregarDados(userId: number) {
        try {
            setLoading(true);
            const [listaEnderecos, dadosCarrinho] = await Promise.all([
                listarEnderecos(userId),
                listarCarrinho(userId)
            ]);

            setEnderecos(listaEnderecos);
            
            if (listaEnderecos.length > 0) {
                setEnderecoSelecionadoId(listaEnderecos[0].id || null);
            }

            const produtosFormatados = dadosCarrinho.itens.map(converterParaProductAPI);
            setProdutos(produtosFormatados);
        } catch (error) {
            console.error("Erro ao carregar dados", error);
            alert("Erro ao carregar informações.");
        } finally {
            setLoading(false);
        }
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
            categoria: "",
            descricao: "", 
            desconto: 0,
            precoComDesconto: item.preco
        };
    };

    const handleDadosCartaoChange = (campo: keyof DadosCartao, valor: string) => {
        setDadosCartao(prev => ({ ...prev, [campo]: valor }));
    };

    const handleRemoverProduto = async (produto: ProductAPI) => {
        if (!clienteId) return;

        const item = produto as ProductAPIInCart;

        try {
            await removerItem(clienteId, item.cartItemId);
            
            setProdutos(prev => prev.filter(p => p.id !== produto.id));
        } catch (error) {
            console.error(error);
            alert("Erro ao remover produto.");
        }
    };

    const handleChangeQuantity = async (produto: ProductAPI, novaQuantidade: number) => {
        if (!clienteId || novaQuantidade < 1) return;

        const itemParaAtualizar = produto as ProductAPIInCart;
        const produtosAnteriores = [...produtos];

        setProdutos(prev =>
            prev.map(p =>
                p.id === produto.id ? { ...p, quantidade: novaQuantidade } : p
            )
        );

        try {
            await atualizarQuantidade(clienteId, itemParaAtualizar.cartItemId, novaQuantidade);
        } catch (error) {
            console.error("Erro ao atualizar quantidade", error);
            setProdutos(produtosAnteriores);
        }
    };

    const handleFinalizarPedido = async () => {
        if (!clienteId) return;

        if (!enderecoSelecionadoId) {
            alert("Por favor, selecione ou cadastre um endereço de entrega.");
            return;
        }

        if (produtos.length === 0) {
            alert("Seu carrinho está vazio.");
            return;
        }

        try {
            setLoading(true);

            if (metodoPagamento === "cartao") {
                if (!dadosCartao.numero || !dadosCartao.titular || !dadosCartao.validadeMes || !dadosCartao.validadeAno || !dadosCartao.codigoSeguranca) {
                    alert("Preencha todos os dados do cartão.");
                    setLoading(false);
                    return;
                }

                const validadeFormatada = `${dadosCartao.validadeMes}/${dadosCartao.validadeAno}`; 
                const numeroLimpo = dadosCartao.numero.replace(/\s/g, "");

                await cadastrarCartao({
                    clienteId: clienteId,
                    numero: numeroLimpo,
                    nomeTitular: dadosCartao.titular,
                    validade: validadeFormatada,
                    cvv: dadosCartao.codigoSeguranca,
                    tipo: "CREDITO", 
                    bandeira: "MASTERCARD" 
                });
            }

            await limparCarrinhoCompleto(clienteId);

            alert("Pedido realizado com sucesso! Obrigado pela compra.");
            navigate("/"); 

        } catch (error) {
            console.error(error);
            alert("Erro ao processar o pedido. Verifique os dados.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Layout>Carregando...</Layout>;

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
                                key={produto.id} 
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
                        />
                    </div>
                </div>

                <div className={`${style.left}`}>
                    <ResumeOrder produtos={produtos} ativo={produtos.length > 0} />
                     <div style={{marginTop: '20px'}}>
                         <Button 
                            border="arredondada" 
                            color="laranja" 
                            text={loading ? "PROCESSANDO..." : "FINALIZAR PEDIDO"} 
                            theme="light" 
                            size="big"
                            onClick={handleFinalizarPedido} 
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}