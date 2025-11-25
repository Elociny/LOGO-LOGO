import { Input } from "../../components/Input/Input"
import { Layout } from "../../components/Layout/Layout"
import style from "./Configuration.module.css"
import FotoPerfil from "../../assets/images/foto-de-perfil.svg"
import { Button } from "../../components/Button/Button"
import { Address } from "../../components/Address/Address"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import { listarEnderecos, excluirEndereco, type EnderecoDTO } from "../../services/enderecoService"
import { Error } from "../../components/Error/Error"

export function Configuration() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("Usuário");
    const [email, setEmail] = useState("email@exemplo.com");


    const [enderecos, setEnderecos] = useState<EnderecoDTO[]>([]);

    const telefone = "+55 (11) 9 7048-7095"

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario_logado");
        if (usuarioSalvo) {
            const dados = JSON.parse(usuarioSalvo);
            setNome(dados.nome);
            setEmail(dados.email);
            carregarEnderecos(dados.id);
        } else {
            navigate("/login");
        }
    }, [navigate]);

    async function carregarEnderecos(id: number) {
        try {
            const lista = await listarEnderecos(id);
            setEnderecos(lista);
        } catch (error) {
            console.error("Erro ao buscar endereços", error);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("usuario_logado");
        navigate("/login");
    };

    const handleExcluir = async (enderecoId: number) => {
        if (window.confirm("Tem certeza que deseja excluir este endereço?")) {
            try {
                if (!enderecoId) return;

                await excluirEndereco(enderecoId);
                setEnderecos(prev => prev.filter(end => end.id !== enderecoId));
            } catch {
                alert("Erro ao excluir endereço.");
            }
        }
    }

    const handleEditar = (endereco: EnderecoDTO) => {
        navigate("/configuracoes/adicionar-endereco", { state: { enderecoParaEditar: endereco } });
    }

    return (
        <Layout>
            <div className={`${style.configuration}`}>
                <h2>Informações pessoais</h2>

                <section className={`row ${style.secao}`}>
                    <img src={FotoPerfil} alt="Foto de perfil" className={`${style.fotoPerfil}`} />

                    <div className={`${style.perfil}`}>
                        <div className={`row ${style.inputs}`}>
                            <Input id="nome" label="Nome" placeholder="Seu nome completo" type="text" value={nome} enable={false} onChange={() => { }} />
                            <Input id="telefone" label="Telefone" placeholder="Seu número de telefone" type="text" value={telefone} enable={true} onChange={() => { }} />
                            <Button border="arredondada" color="cinza" size="small" text="alterar dados" theme="light" />
                        </div>

                        <Input id="email" label="Email" placeholder="Seu endereço de email" type="text" value={email} enable={false} onChange={() => { }} />

                        <div className={`row ${style.inputs}`}>
                            <Input id="senha_fake" label="Senha" placeholder="Sua senha" type="password" value="********" enable={false} onChange={() => { }} />
                            <Button border="arredondada" color="laranja" size="small" text="alterar senha" theme="light" navegation="/changePassword" />
                        </div>
                    </div>
                </section>

                <h2>Endereços salvos </h2>

                <section className={`${style.enderecos}`}>
                    {enderecos.length === 0 && <Error type="empty" />}

                    {enderecos.map((end) => (
                        <div className={`row ${style.enderecoCompleto}`} key={end.id}>
                            <div className={`row ${style.group}`}>
                                <button onClick={() => handleExcluir(end.id!)}>
                                    <i className="bi bi-trash-fill"></i>
                                </button>
                                <Address
                                    nome={nome}
                                    telefone={telefone}
                                    logradouro={end.logradouro}
                                    numero={end.numero}
                                    bairro={end.bairro}
                                    cidade={end.cidade}
                                    estado={end.estado}
                                    cep={end.cep}
                                    complemento={end.complemento}
                                />
                            </div>

                            <div className={`row ${style.btns}`}>
                                <Button
                                    border="arredondada"
                                    color="cinza"
                                    size="small"
                                    text="editar endereço"
                                    theme="light"
                                    onClick={() => handleEditar(end)}
                                />
                                <Button
                                    border="arredondada"
                                    color="transparente"
                                    size="small"
                                    text="apagar endereço"
                                    theme="light"
                                    onClick={() => handleExcluir(end.id!)}
                                />
                            </div>
                        </div>
                    ))}

                    <Button border="quadrada" color="laranja" size="big" text="adicionar novo endereço" theme="light" navegation="/configuracoes/adicionar-endereco" />
                </section>

                <Button border="arredondada" color="branco" size="big" text="sair da logologo" theme="light" onClick={handleLogout} />
            </div>
        </Layout>
    )
}