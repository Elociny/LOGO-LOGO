import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router"
import { Button } from "../../components/Button/Button"
import { Input } from "../../components/Input/Input"
import { Layout } from "../../components/Layout/Layout"

import style from "./AddAddress.module.css"
import { criarEndereco, atualizarEndereco, type EnderecoDTO } from "../../services/enderecoService"

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

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario_logado");
        if (usuarioSalvo) {
            const dados = JSON.parse(usuarioSalvo);
            setClienteId(dados.id);
            setNomeContato(dados.nome);
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

    const handleCepChange = (valor: string | number) => {
        let v = String(valor).replace(/\D/g, "");
        if (v.length > 8) v = v.slice(0, 8);
        
        v = v.replace(/(\d{5})(\d)/, "$1-$2");
        
        setCep(v);
    };

    const handlePhoneChange = (valor: string | number) => {
        let v = String(valor).replace(/\D/g, "");
        if (v.length > 11) v = v.slice(0, 11);

        v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); 
        v = v.replace(/(\d)(\d{4})$/, "$1-$2"); 

        setTelefoneContato(v);
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

    async function handleSalvar() {
        if (!clienteId) return;

        if (!logradouro || !numero || !bairro || !cidade || !estado || !cep) {
            alert("Preencha todos os campos obrigatórios!");
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
                alert("Endereço atualizado com sucesso!");
            } else {
                await criarEndereco(dados);
                alert("Endereço cadastrado com sucesso!");
            }

            navigate("/configuracoes");
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar endereço. Verifique os dados.");
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
                            value={telefoneContato} enable={true} onChange={(val) => handlePhoneChange(val)} />
                    </section>

                    <h3>Endereço</h3>

                    <section className={`row ${style.inputs}`}>
                        <Input id="cep" label="CEP" type="text" placeholder="00000-000" enable={true}
                            value={cep} onChange={(val) => handleCepChange(val)} />

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

                        <Input id="complemento" label="Complemento" type="text" placeholder="Apto, Bloco..." enable={true}
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
        </Layout>
    )
}