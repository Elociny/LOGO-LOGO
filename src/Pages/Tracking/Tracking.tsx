import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button/Button"
import { Layout } from "../../components/Layout/Layout"
import { TrackOrder } from "../../components/TrackOrder/TrackOrder"
import User from "../../components/User/User"
import style from "./Tracking.module.css"
import FotoPerfil from "../../assets/images/foto-de-perfil.svg"
import { Spinner } from "../../components/Spinner/Spinner"

import { listarComprasDoCliente, type ComprarResponseDTO } from "../../services/compraService"
import { listarEnderecos } from "../../services/enderecoService"
import { Error } from "../../components/Error/Error"

type TrackItensData = {
    image: string
    name: string
    size: string
    color: string
    quantity: number
    unitPrice: number
}

interface PedidoFormatado {
    trackingCode: string
    status: string
    customerName: string
    customerPhone: string
    address: string
    items: TrackItensData[]
}

export function Tracking() {
    const navigate = useNavigate();
    const [filtro, setFiltro] = useState<string>("mostrar todos")
    const [pedidos, setPedidos] = useState<PedidoFormatado[]>([])
    const [loading, setLoading] = useState(true)

    const [dadosUsuario, setDadosUsuario] = useState({ 
        nome: "", 
        email: "", 
        telefone: "", 
        imageUrl: "" 
    })

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario_logado");
        if (usuarioSalvo) {
            const usuario = JSON.parse(usuarioSalvo);
            
            setDadosUsuario({
                nome: usuario.nome,
                email: usuario.email,
                telefone: usuario.telefone || "(11) 9 9999-9999",
                imageUrl: usuario.imageUrl || "" 
            });

            carregarDados(usuario.id);
        } else {
            navigate("/login");
        }
    }, [navigate]);

    async function carregarDados(clienteId: number) {
        try {
            setLoading(true);

            const [listaCompras, listaEnderecos] = await Promise.all([
                listarComprasDoCliente(clienteId),
                listarEnderecos(clienteId)
            ]);

            let enderecoString = "Endereço não encontrado";
            if (listaEnderecos.length > 0) {
                const end = listaEnderecos[0];
                enderecoString = `${end.logradouro}, ${end.numero}${end.complemento ? ' - ' + end.complemento : ''} - ${end.bairro}, ${end.cidade}/${end.estado} - CEP: ${end.cep}`;
            }

            const pedidosFormatados = listaCompras.map(compra => converterCompraParaVisual(compra, enderecoString));

            setPedidos(pedidosFormatados.reverse());
        } catch (error) {
            console.error("Erro ao carregar dados", error);
        } finally {
            setLoading(false);
        }
    }

    const converterCompraParaVisual = (compra: ComprarResponseDTO, enderecoFormatado: string): PedidoFormatado => {
        const itensAgrupados = new Map<string, TrackItensData>();

        compra.itens.forEach((item) => {
            const key = `${item.id}-${item.tamanho}-${item.cor}`;

            if (itensAgrupados.has(key)) {
                const existente = itensAgrupados.get(key)!;
                existente.quantity += 1;
            } else {
                itensAgrupados.set(key, {
                    image: item.imageUrl,
                    name: item.nome,
                    size: item.tamanho,
                    color: item.cor,
                    quantity: 1,
                    unitPrice: item.preco
                });
            }
        });

        const listaItensVisuais = Array.from(itensAgrupados.values());

        let statusVisual = "preparando";
        if (compra.status === "ENVIADO") statusVisual = "em rota de entrega";
        if (compra.status === "ENTREGUE") statusVisual = "entregue";
        if (compra.status === "CANCELADO") statusVisual = "cancelado";

        return {
            trackingCode: `PED-${compra.id.toString().padStart(6, '0')}`,
            status: statusVisual,
            customerName: dadosUsuario.nome,
            customerPhone: dadosUsuario.telefone,
            address: enderecoFormatado,
            items: listaItensVisuais
        };
    }

    const pedidosFiltrados = filtro === "mostrar todos" ? pedidos : pedidos.filter((p) => p.status === filtro)

    return (
        <Layout theme="light">
            <div className={`row ${style.tracking}`}>
                <div className={`${style.left}`}>
                    <User 
                        nome={dadosUsuario.nome} 
                        email={dadosUsuario.email} 
                        foto={dadosUsuario.imageUrl || FotoPerfil} 
                        theme="light" 
                    />
                    
                    <hr className={`${style.cinza}`} />

                    <div className={style.botoesFiltro}>
                        <Button
                            border="arredondada"
                            color={filtro === "mostrar todos" ? "cinza" : "transparente"}
                            size="big"
                            text="mostrar todos"
                            theme="light"
                            onClick={() => setFiltro("mostrar todos")}
                        />
                        <Button
                            border="arredondada"
                            color={filtro === "preparando" ? "cinza" : "transparente"}
                            size="big"
                            text="preparando"
                            theme="light"
                            onClick={() => setFiltro("preparando")}
                        />
                        <Button
                            border="arredondada"
                            color={filtro === "em rota de entrega" ? "cinza" : "transparente"}
                            size="big"
                            text="a caminho"
                            theme="light"
                            onClick={() => setFiltro("em rota de entrega")}
                        />
                        <Button
                            border="arredondada"
                            color={filtro === "entregue" ? "cinza" : "transparente"}
                            size="big"
                            text="finalizado"
                            theme="light"
                            onClick={() => setFiltro("entregue")}
                        />
                    </div>
                </div>

                <div className={`${style.right}`}>
                    <h2>Meus pedidos</h2>

                    {loading && (
                        <div className={style.spinnerContainer}>
                            <Spinner />
                        </div>
                    )}

                    {!loading && pedidosFiltrados.length === 0 && (
                        <Error type="empty" />
                    )}

                    <div className={`${style.pedidos}`}>
                        {!loading && pedidosFiltrados.map((pedido, index) => {
                            return (
                                <TrackOrder
                                    key={index}
                                    {...pedido}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}