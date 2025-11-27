import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Categories } from "../../components/Categories/Categories";
import { InfoProduct } from "../../components/InfoProduct/InfoProduct";
import { Layout } from "../../components/Layout/Layout";
import { Comment } from "../../components/Comment/Comment";
import { Spinner } from "../../components/Spinner/Spinner";
import { Error } from "../../components/Error/Error";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { Modal } from "../../components/Modal/Modal";
import { StarRating } from "../../components/StarRating/StarRating";

import { buscarProdutoPorId } from "../../services/produtoService";
import { 
    listarAvaliacoes, 
    criarAvaliacao, 
    atualizarAvaliacao,
    type AvaliacaoResponseDTO,
    type AvaliacaoRequestDTO 
} from "../../services/avaliacaoService";
import { listarComprasDoCliente } from "../../services/compraService";

import style from "./ProductDetails.module.css";

type ModalType = "success" | "error" | "warning";

export function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();

    const [notaForm, setNotaForm] = useState(5);
    const [tituloForm, setTituloForm] = useState("");
    const [descricaoForm, setDescricaoForm] = useState("");
    
    const [idAvaliacaoEdicao, setIdAvaliacaoEdicao] = useState<number | null>(null);

    const [isAvaliarOpen, setIsAvaliarOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState<{ type: ModalType; title: string; message: string }>({
        type: "success", title: "", message: ""
    });
    
    const [usuarioLogado, setUsuarioLogado] = useState<{ id: number, nome: string } | null>(null);

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario_logado");
        if (usuarioSalvo) setUsuarioLogado(JSON.parse(usuarioSalvo));
    }, []);

    const abrirModalFeedback = (type: ModalType, title: string, message: string) => {
        setModalConfig({ type, title, message });
        setModalOpen(true);
    };

    const { data: produto, isLoading: loadingProd, isError: errorProd } = useQuery({
        queryKey: ['produto', id],
        queryFn: () => buscarProdutoPorId(Number(id)),
        enabled: !!id,
    });

    const { data: avaliacoes, isLoading: loadingAv } = useQuery<AvaliacaoResponseDTO[]>({
        queryKey: ['avaliacoes', id],
        queryFn: () => listarAvaliacoes(Number(id)),
        enabled: !!id,
    });

    const { data: historicoCompras } = useQuery({
        queryKey: ['comprasUsuario', usuarioLogado?.id],
        queryFn: () => listarComprasDoCliente(usuarioLogado!.id),
        enabled: !!usuarioLogado,
        retry: false
    });

    const minhaAvaliacao = avaliacoes?.find(av => av.clienteId === usuarioLogado?.id);

    const podeAvaliar = historicoCompras?.some(compra =>
        compra.status === "ENTREGUE" &&
        compra.itens.some(item => item.id === Number(id))
    );

    const handleMutationError = (error: AxiosError) => {
        setIsAvaliarOpen(false);
        let msg = "Erro ao processar sua solicitação.";
        
        if (error.response && error.response.data) {
            const dados = error.response.data;
            if (typeof dados === 'string') {
                if (dados.trim().startsWith("<") || dados.length > 300) {
                    msg = "Ocorreu um erro interno no servidor.";
                } else {
                    msg = dados;
                }
            } else if (typeof dados === 'object' && dados !== null) {
                const dadosObj = dados as Record<string, unknown>;
                if ('message' in dadosObj && typeof dadosObj.message === 'string') {
                    msg = dadosObj.message;
                } else {
                    msg = JSON.stringify(dados);
                }
            }
        }
        abrirModalFeedback("error", "Ops!", msg);
    };

    const mutationCriar = useMutation({
        mutationFn: criarAvaliacao,
        onSuccess: () => {
            setIsAvaliarOpen(false);
            abrirModalFeedback("success", "Sucesso!", "Sua avaliação foi publicada.");
            queryClient.invalidateQueries({ queryKey: ['avaliacoes', id] });
            setTituloForm(""); setDescricaoForm(""); setNotaForm(5);
        },
        onError: handleMutationError
    });

    const mutationEditar = useMutation({
        mutationFn: (dados: AvaliacaoRequestDTO) => atualizarAvaliacao(idAvaliacaoEdicao!, dados),
        onSuccess: () => {
            setIsAvaliarOpen(false);
            abrirModalFeedback("success", "Atualizado!", "Sua avaliação foi editada com sucesso.");
            queryClient.invalidateQueries({ queryKey: ['avaliacoes', id] });
            setTituloForm(""); setDescricaoForm(""); setNotaForm(5); setIdAvaliacaoEdicao(null);
        },
        onError: handleMutationError
    });

    const handleAbrirFormulario = () => {
        if (!usuarioLogado) {
            abrirModalFeedback("warning", "Login necessário", "Faça login para avaliar este produto.");
            return;
        }

        if (minhaAvaliacao) {
            setIdAvaliacaoEdicao(minhaAvaliacao.id);
            setNotaForm(minhaAvaliacao.nota);
            setTituloForm(minhaAvaliacao.titulo);
            setDescricaoForm(minhaAvaliacao.descricao || "");
        } else {
            setIdAvaliacaoEdicao(null);
            setNotaForm(5);
            setTituloForm("");
            setDescricaoForm("");
        }

        setIsAvaliarOpen(true);
    };

    const handleEnviarAvaliacao = () => {
        if (!usuarioLogado || !id) return;
        if (!tituloForm) {
            abrirModalFeedback("warning", "Atenção", "Por favor, dê um título para sua avaliação.");
            return;
        }

        const payload = {
            clienteId: usuarioLogado.id,
            produtoId: Number(id),
            nota: notaForm,
            titulo: tituloForm,
            descricao: descricaoForm
        };

        if (idAvaliacaoEdicao) {
            mutationEditar.mutate(payload);
        } else {
            mutationCriar.mutate(payload);
        }
    };

    const mediaCalculada = avaliacoes && avaliacoes.length > 0
        ? avaliacoes.reduce((acc, av) => acc + av.nota, 0) / avaliacoes.length
        : 0;

    const isLoadingAction = mutationCriar.isPending || mutationEditar.isPending;

    return (
        <Layout>
            <div className={style.product_details}>
                <Categories />

                {(loadingProd) && <Spinner />}
                {errorProd && <Error />}

                {produto && (
                    <InfoProduct
                        produto={produto}
                        mediaNota={mediaCalculada}
                        totalAvaliacoes={avaliacoes?.length || 0}
                    />
                )}

                <hr />

                <div className={style.avaliacoes}>
                    <div className={`${style.headerAvaliacoes}`}>
                        <h2>Avaliações ({avaliacoes?.length || 0})</h2>

                        <div className={`row ${style.avaliacao}`}>
                            <div className={style.stars}>
                                <StarRating rating={mediaCalculada} readOnly size="medium" />
                            </div>
                            <p>{mediaCalculada > 0 ? mediaCalculada.toFixed(1) : "N/A"}<span>/5</span></p>
                        </div>
                    </div>

                    {(podeAvaliar || minhaAvaliacao) && (
                        <div className={style.botaoAvaliarContainer}>
                            <Button
                                border="quadrada"
                                color={minhaAvaliacao ? "laranja" : "cinza"}
                                size="big"
                                text={minhaAvaliacao ? "Editar sua avaliação" : "Escrever uma avaliação"}
                                theme="light"
                                onClick={handleAbrirFormulario}
                            />
                        </div>
                    )}

                    {loadingAv && <Spinner />}

                    {!loadingAv && avaliacoes?.length === 0 && (
                        <p className={style.listaVazia}>Este produto ainda não tem avaliações. Seja o primeiro!</p>
                    )}

                    {!loadingAv && avaliacoes?.map((av) => (
                        <Comment key={av.id} data={av} />
                    ))}
                </div>
            </div>

            <Modal 
                isOpen={isAvaliarOpen} 
                onClose={() => setIsAvaliarOpen(false)} 
                type="success" 
                title={idAvaliacaoEdicao ? "Editar Avaliação" : "Avaliar Produto"}
            >
                <div className={style.modalContent}>
                    
                    <div className={`row ${style.nota}`}>
                        <label className={style.label}>Sua Nota:</label>
                        <div className={style.starsContainer}>
                            <StarRating rating={notaForm} onChange={setNotaForm} size="large" />
                        </div>
                    </div>
                    
                    <Input 
                        id="titulo" 
                        label="Título:" 
                        type="text" 
                        placeholder="Ex: Produto excelente!" 
                        value={tituloForm} 
                        onChange={(val) => setTituloForm(String(val))} 
                    />
                    
                    <div>
                        <div className={`row ${style.contador}`}>
                            <label htmlFor="desc" className={style.labelSecondary}>Opinião (Opcional):</label>
                            <span style={{ fontSize: '0.8rem', color: descricaoForm.length > 1000 ? 'var(--vermelho)' : 'var(--cinza-claro)' }}>
                                {descricaoForm.length}/1000
                            </span>
                        </div>
                        <textarea
                            id="desc"
                            rows={4}
                            maxLength={1000}
                            placeholder="Conte mais detalhes sobre o produto..."
                            value={descricaoForm}
                            onChange={(e) => setDescricaoForm(e.target.value)}
                            className={style.textarea}
                        />
                    </div>

                    <div className={style.buttonContainer}>
                        <Button 
                            border="arredondada" 
                            color="laranja" 
                            size="big" 
                            text={isLoadingAction ? "Enviando..." : (idAvaliacaoEdicao ? "Salvar Alterações" : "Publicar Avaliação")} 
                            theme="light" 
                            onClick={handleEnviarAvaliacao} 
                        />
                    </div>
                </div>
            </Modal>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} type={modalConfig.type} title={modalConfig.title}>
                <p>{modalConfig.message}</p>
                <div className={style.feedbackButtonContainer}>
                    <Button border="arredondada" color="cinza" size="small" text="Fechar" theme="light" onClick={() => setModalOpen(false)} />
                </div>
            </Modal>
        </Layout>
    )
}