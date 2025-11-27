import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { Modal } from "../../components/Modal/Modal";
import style from "./AddCard.module.css"; 

import { cadastrarCartao, atualizarCartao, type CartaoRequestDTO, type BandeiraCartao, type TipoCartao, type CartaoResponseDTO } from "../../services/cartaoService";

export function AddCard() {
    const navigate = useNavigate();
    const location = useLocation();

    const [clienteId, setClienteId] = useState<number | null>(null);
    const [cartaoId, setCartaoId] = useState<number | null>(null);

    const [numero, setNumero] = useState("");
    const [nomeTitular, setNomeTitular] = useState("");
    const [validade, setValidade] = useState("");
    const [cvv, setCvv] = useState("");
    
    const [bandeira, setBandeira] = useState<BandeiraCartao>("MASTERCARD");
    const [tipo, setTipo] = useState<TipoCartao>("CREDITO");

    const [modalOpen, setModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({ type: "success" as "success" | "error" | "warning", title: "", message: "" });
    const [redirectOnClose, setRedirectOnClose] = useState(false);

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario_logado");
        if (usuarioSalvo) {
            const dados = JSON.parse(usuarioSalvo);
            setClienteId(dados.id);
        } else {
            navigate("/login");
            return;
        }

        if (location.state && location.state.cartaoParaEditar) {
            const card = location.state.cartaoParaEditar as CartaoResponseDTO;
            setCartaoId(card.id);
            setNomeTitular(card.nomeTitular);
            setValidade(card.validade);
            setTipo(card.tipo);
            setBandeira(card.bandeira);
            setNumero(""); 
        }
    }, [location, navigate]);

    const detectarBandeira = (num: string): BandeiraCartao => {
        const n = num.replace(/\D/g, "");

        if (n.match(/^4/)) return "VISA";
        if (n.match(/^5[1-5]/) || n.match(/^2[2-7]/)) return "MASTERCARD";
        if (n.match(/^3[47]/)) return "AMEX";
        if (n.match(/^(606282\d{10}(\d{3})?)|(3841\d{15})/)) return "HIPERCARD";
        if (n.match(/^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/)) return "ELO";

        return "MASTERCARD";
    };

    const handleNumeroChange = (valor: string | number) => {
        let v = String(valor).replace(/\D/g, "");
        if (v.length > 16) v = v.slice(0, 16); 

        if (v.length >= 2) {
            setBandeira(detectarBandeira(v));
        }

        v = v.replace(/(\d{4})(\d)/, "$1 $2");
        v = v.replace(/(\d{4})(\d)/, "$1 $2");
        v = v.replace(/(\d{4})(\d)/, "$1 $2");
        
        setNumero(v);
    };

    const handleValidadeChange = (valor: string | number) => {
        let v = String(valor).replace(/\D/g, "");
        if (v.length > 4) v = v.slice(0, 4);

        if (v.length >= 2) {
            v = v.replace(/(\d{2})(\d)/, "$1/$2");
        }
        setValidade(v);
    };

    const handleCvvChange = (valor: string | number) => {
        let v = String(valor).replace(/\D/g, "");
        if (v.length > 4) v = v.slice(0, 4);
        setCvv(v);
    };

    const handleNomeChange = (valor: string | number) => {
        const v = String(valor).toUpperCase();
        setNomeTitular(v);
    }

    const abrirModal = (type: "success" | "error" | "warning", title: string, message: string) => {
        setModalConfig({ type, title, message });
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
        if (redirectOnClose) {
            navigate("/configuracoes");
        }
        setRedirectOnClose(false);
    };

    const handleSalvar = async () => {
        if (!clienteId) return;

        if (numero.length < 16 || nomeTitular.length < 3 || validade.length < 5 || cvv.length < 3) {
            abrirModal("warning", "Atenção", "Preencha todos os campos corretamente.");
            return;
        }

        const dados: CartaoRequestDTO = {
            clienteId: clienteId,
            numero: numero.replace(/\s/g, ""),
            nomeTitular,
            validade,
            cvv,
            bandeira,
            tipo
        };

        try {
            if (cartaoId) {
                await atualizarCartao(cartaoId, dados);
                setRedirectOnClose(true);
                abrirModal("success", "Sucesso", "Cartão atualizado com sucesso!");
            } else {
                await cadastrarCartao(dados);
                setRedirectOnClose(true);
                abrirModal("success", "Sucesso", "Cartão cadastrado com sucesso!");
            }
        } catch (error) {
            console.error(error);
            setRedirectOnClose(false);
            abrirModal("error", "Erro", "Erro ao salvar cartão. Verifique os dados.");
        }
    };

    return (
        <Layout>
            <div className={style.addCard}>
                <h2>{cartaoId ? "Editar cartão" : "Novo cartão"}</h2>

                <div className={style.cadastro}>
                    <h3>Dados do Cartão</h3>

                    <section className={`row ${style.inputs}`}>
                        <div style={{width: '100%'}}>
                            <Input 
                                id="numero" 
                                label="Número do Cartão" 
                                type="text" 
                                placeholder="0000 0000 0000 0000" 
                                value={numero} 
                                onChange={(v) => handleNumeroChange(v)} 
                                enable={true}
                            />
                        </div>

                        <Input 
                            id="nome" 
                            label="Nome no Cartão" 
                            type="text" 
                            placeholder="COMO NO CARTÃO" 
                            value={nomeTitular} 
                            onChange={(v) => handleNomeChange(v)} 
                            enable={true}
                        />
                    </section>

                    <section className={`row ${style.inputs}`}>
                        <div className={style.inputSmall}>
                            <Input 
                                id="validade" 
                                label="Validade" 
                                type="text" 
                                placeholder="MM/AA" 
                                value={validade} 
                                onChange={(v) => handleValidadeChange(v)} 
                                enable={true}
                            />
                        </div>
                        <div className={style.inputSmall}>
                            <Input 
                                id="cvv" 
                                label="CVV" 
                                type="text" 
                                placeholder="123" 
                                value={cvv} 
                                onChange={(v) => handleCvvChange(v)} 
                                enable={true}
                            />
                        </div>
                    </section>

                    <section className={`row ${style.inputs}`}>
                        {/* Campo Bandeira Bloqueado (Detectado) */}
                        <div style={{width: '100%'}}>
                            <label className={style.label}>Bandeira (Detectada)</label>
                            <input 
                                type="text" 
                                value={bandeira} 
                                disabled 
                                className={style.inputDisabled}
                            />
                        </div>

                        {/* Select para Tipo */}
                        <div style={{width: '100%'}}>
                            <label className={style.label}>Tipo</label>
                            <select 
                                value={tipo} 
                                onChange={(e) => setTipo(e.target.value as TipoCartao)}
                                className={style.select}
                            >
                                <option value="CREDITO">Crédito</option>
                                <option value="DEBITO">Débito</option>
                            </select>
                        </div>
                    </section>
                </div>

                <Button 
                    border="quadrada" 
                    color="laranja" 
                    size="big" 
                    text={cartaoId ? "atualizar cartão" : "salvar cartão"} 
                    theme="light" 
                    onClick={handleSalvar} 
                />
            </div>

            <Modal isOpen={modalOpen} onClose={fecharModal} type={modalConfig.type} title={modalConfig.title}>
                <p>{modalConfig.message}</p>
                <div style={{ marginTop: '20px' }}>
                    <Button border="arredondada" color="cinza" size="small" text={redirectOnClose ? "voltar" : "Fechar"} theme="light" onClick={fecharModal} />
                </div>
            </Modal>
        </Layout>
    );
}