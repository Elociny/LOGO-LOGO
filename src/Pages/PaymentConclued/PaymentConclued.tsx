import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Layout } from "../../components/Layout/Layout";
import { ResumeOrder } from "../../components/ResumeOrder/ResumeOrder";
import { Spinner } from "../../components/Spinner/Spinner";
import style from "./PaymentConclued.module.css";

import type { ProductAPI } from "../../types/ProductAPI";
import { buscarCompraPorId } from "../../services/compraService";

export function PaymentConclued() {
    const { pedidoId } = useParams<{ pedidoId: string }>();
    const navigate = useNavigate();
    
    const [produtosComprados, setProdutosComprados] = useState<ProductAPI[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (pedidoId) {
            carregarDadosCompra(Number(pedidoId));
        } else {
            navigate("/");
        }
    }, [pedidoId, navigate]);

    async function carregarDadosCompra(id: number) {
        try {
            setLoading(true);
            const compra = await buscarCompraPorId(id);

            const mapaProdutos = new Map<number, ProductAPI>();

            compra.itens.forEach(item => {
                if (mapaProdutos.has(item.id)) {
                    const prod = mapaProdutos.get(item.id)!;
                    prod.quantidade += 1;
                } else {
                    mapaProdutos.set(item.id, {
                        id: item.id,
                        nome: item.nome,
                        imageUrl: item.imageUrl,
                        cor: item.cor,
                        tamanho: item.tamanho,
                        preco: item.preco,
                        quantidade: 1,
                        descricao: "", 
                        categoria: "",
                        desconto: 0,
                        precoComDesconto: item.preco
                    });
                }
            });

            setProdutosComprados(Array.from(mapaProdutos.values()));

        } catch (error) {
            console.error("Erro ao buscar detalhes do pedido", error);
            navigate("/");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <Layout>
                <div>
                    <Spinner />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className={style.container}>
                <div className={`${style.payment}`}>
                    <i className="bi bi-check2-circle"></i>
                    <h2>Pagamento concluído!</h2>
                    <p>O seu pedido <strong>#{pedidoId?.padStart(6, '0')}</strong> está sendo processado.</p>
                </div>

                <div className={style.resumeContainer}>
                    <ResumeOrder 
                        produtos={produtosComprados} 
                        ativo={false}
                    />
                </div>

                <div className={`row ${style.actions}`}>
                    <Button 
                        border="quadrada" 
                        color="laranja" 
                        size="big" 
                        text="rastrear pedido" 
                        theme="light" 
                        navegation="/rastreio" 
                    />
                    
                    <Button 
                        border="quadrada" 
                        color="cinza" 
                        size="small" 
                        text="voltar para a loja" 
                        theme="light" 
                        navegation="/" 
                    />
                </div>
            </div>
        </Layout>
    )
}