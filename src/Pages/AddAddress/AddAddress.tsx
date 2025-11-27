import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router"
import { Button } from "../../components/Button/Button"
import { Input } from "../../components/Input/Input"
import { Layout } from "../../components/Layout/Layout"

import style from "./AddAddress.module.css"
import { criarEndereco, atualizarEndereco, type EnderecoDTO } from "../../services/enderecoService"

import { Modal } from "../../components/Modal/Modal"

export function AddAddress() {
    const navigate = useNavigate();
    const location = useLocation();

    const [clienteId, setClienteId] = useState<number | null>(null);
    const [enderecoId, setEnderecoId] = useState<number | null>(null);

    const [cep, setCep] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [complemento, setComplemento] = useState("");

    const [nomeContato, setNomeContato] = useState("");
    const [telefoneContato, setTelefoneContato] = useState("");

    const [isLoadingCep, setIsLoadingCep] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        type: "success" as "success" | "error" | "warning",
        title: "",
        message: ""
    });
    const [redirectOnClose, setRedirectOnClose] = useState(false);

    const formatarTelefone = (valor: string | number) => {
        let v = String(valor).replace(/\D/g, "");
        if (v.length > 11) v = v.slice(0, 11);
        v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
        v = v.replace(/(\d)(\d{4})$/, "$1-$2");
        return v;
    };

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario_logado");
        if (usuarioSalvo) {
            const dados = JSON.parse(usuarioSalvo);
            setClienteId(dados.id);
            setNomeContato(dados.nome);
            
            if (dados.telefone) {
                setTelefoneContato(formatarTelefone(dados.telefone));
            }
        } else {
            navigate("/login");
            return;
        }

        if (location.state && location.state.enderecoParaEditar) {
            const end = location.state.enderecoParaEditar as EnderecoDTO;

            setEnderecoId(end.id || null);
            setCep(end.cep);
            setEstado(end.estado);
            setCidade(end.cidade);
            setLogradouro(end.logradouro);
            setNumero(String(end.numero));
            setBairro(end.bairro);
            setComplemento(end.complemento || "");
        }
    }, [location, navigate]);

    const buscarEnderecoPorCep = async (cepDigitado: string) => {
        try {
            setIsLoadingCep(true);
            const response = await fetch(`https://viacep.com.br/ws/${cepDigitado}/json/`);
            const data = await response.json();

            if (data.erro) {
                console.warn("CEP não encontrado");
            } else {
                setLogradouro(data.logradouro);
                setBairro(data.bairro);
                setCidade(data.localidade);
                setEstado(data.uf);
            }
        } catch (error) {
            console.error("Erro ao buscar CEP", error);
        } finally {
            setIsLoadingCep(false);
        }
    };

    const handleCepChange = (valor: string | number) => {
        let v = String(valor).replace(/\D/g, "");
        if (v.length > 8) v = v.slice(0, 8);

        if (v.length === 8) {
            buscarEnderecoPorCep(v);
        }

        v = v.replace(/(\d{5})(\d)/, "$1-$2");
        setCep(v);
    };

    const handleEstadoChange = (valor: string | number) => {
        let v = String(valor).replace(/[^a-zA-Z]/g, "");
        if (v.length > 2) v = v.slice(0, 2);
        setEstado(v.toUpperCase());
    };

    const handleNumeroChange = (valor: string | number) => {
        const v = String(valor).replace(/\D/g, "");
        setNumero(v);
    };

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

    async function handleSalvar() {
        if (!clienteId) return;

        if (!logradouro || !numero || !bairro || !cidade || !estado || !cep || !complemento) {
            abrirModal("warning", "Atenção", "Todos os campos, incluindo o complemento, são obrigatórios!");
            return;
        }

        const dados: EnderecoDTO = {
            clienteId: clienteId,
            logradouro,
            numero: Number(numero),
            complemento, 
            bairro,
            cidade,
            estado,
            cep
        };

        try {
            if (enderecoId) {
                await atualizarEndereco(enderecoId, dados);
                setRedirectOnClose(true);
                abrirModal("success", "Sucesso", "Endereço atualizado com sucesso!");
            } else {
                await criarEndereco(dados);
                setRedirectOnClose(true);
                abrirModal("success", "Sucesso", "Endereço cadastrado com sucesso!");
            }
        } catch (error) {
            console.error(error);
            setRedirectOnClose(false);
            abrirModal("error", "Erro", "Erro ao salvar endereço no sistema.");
        }
    }

    return (
        <Layout>
            <div className={`${style.addAddress}`}>
                <h2>{enderecoId ? "Editar endereço" : "Novo endereço"}</h2>

                <div className={`${style.cadastro}`}>
                    <h3>Contato</h3>

                    <section className={`row ${style.inputs}`}>
                        <Input id="nome" label="Nome" type="text" placeholder="Digite seu nome completo"
                            value={nomeContato} enable={false} onChange={() => { }} />

                        <Input id="telefone" label="Telefone" type="text" placeholder="(XX) XXXXX-XXXX"
                            value={telefoneContato} enable={false} onChange={() => { }} />
                    </section>

                    <h3>Endereço</h3>

                    <section className={`row ${style.inputs}`}>
                        <div style={{ position: 'relative', width: '100%' }}>
                            <Input 
                                id="cep" 
                                label="CEP" 
                                type="text" 
                                placeholder="00000-000" 
                                enable={true}
                                value={cep} 
                                onChange={(val) => handleCepChange(val)} 
                            />
                            {isLoadingCep && (
                                <span style={{ 
                                    position: 'absolute', 
                                    right: '10px', 
                                    top: '38px', 
                                    fontSize: '0.8rem', 
                                    color: 'var(--laranja)',
                                    fontWeight: 'bold'
                                }}>
                                    Buscando...
                                </span>
                            )}
                        </div>

                        <Input id="estado" label="Estado" type="text" placeholder="UF" enable={true}
                            value={estado} onChange={(val) => handleEstadoChange(val)} />

                        <Input id="cidade" label="Cidade" type="text" placeholder="Sua cidade" enable={true}
                            value={cidade} onChange={(val) => setCidade(String(val))} />
                    </section>

                    <section className={`row ${style.inputs}`}>
                        <Input id="logradouro" label="Rua" type="text" placeholder="Nome da rua" enable={true}
                            value={logradouro} onChange={(val) => setLogradouro(String(val))} />

                        <div className={`${style.inputNumero}`}>
                            <Input id="numero" label="Número" type="text" placeholder="Nº" enable={true}
                                value={numero} onChange={(val) => handleNumeroChange(val)} />
                        </div>
                    </section>

                    <section className={`row ${style.inputs}`}>
                        <Input id="bairro" label="Bairro" type="text" placeholder="Seu bairro" enable={true}
                            value={bairro} onChange={(val) => setBairro(String(val))} />

                        <Input id="complemento" label="Complemento" type="text" placeholder="Apto, Bloco... (Obrigatório)" enable={true}
                            value={complemento} onChange={(val) => setComplemento(String(val))} />
                    </section>
                </div>

                <Button
                    border="quadrada"
                    color="laranja"
                    size="big"
                    text={enderecoId ? "atualizar endereço" : "salvar endereço"}
                    theme="light"
                    onClick={handleSalvar}
                />
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
                        text={redirectOnClose ? "voltar" : "Fechar"}
                        theme="light"
                        onClick={fecharModal}
                    />
                </div>
            </Modal>
        </Layout>
    )
}