import { Input } from "../../components/Input/Input"
import { Layout } from "../../components/Layout/Layout"
import style from "./Configuration.module.css"
import FotoPerfilDefault from "../../assets/images/foto-de-perfil.svg"
import { Button } from "../../components/Button/Button"
import { Address } from "../../components/Address/Address"
import { useNavigate } from "react-router"
import { useEffect, useState, useRef } from "react"
import { Error } from "../../components/Error/Error"

import { listarEnderecos, excluirEndereco, type EnderecoDTO } from "../../services/enderecoService"
import { CardInfo } from "../../components/CardInfo/CardInfo"
import { listarCartoes, excluirCartao, type CartaoResponseDTO } from "../../services/cartaoService"
import { buscarClientePorId, atualizarCliente } from "../../services/authService"

export function Configuration() {
    const navigate = useNavigate();

    const [userId, setUserId] = useState<number | null>(null);
    const [nome, setNome] = useState("Usuário");
    const [email, setEmail] = useState("email@exemplo.com");
    const [telefone, setTelefone] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [enderecos, setEnderecos] = useState<EnderecoDTO[]>([]);
    const [cartoes, setCartoes] = useState<CartaoResponseDTO[]>([]);

    const [fileToUpload, setFileToUpload] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario_logado");
        if (usuarioSalvo) {
            const dados = JSON.parse(usuarioSalvo);
            setUserId(dados.id);
            carregarDadosCompletos(dados.id);
        } else {
            navigate("/login");
        }
    }, [navigate]);

    async function carregarDadosCompletos(id: number) {
        try {
            const [usuarioAtualizado, listaEnderecos, listaCartoes] = await Promise.all([
                buscarClientePorId(id),
                listarEnderecos(id),
                listarCartoes(id)
            ]);

            setNome(usuarioAtualizado.nome);
            setEmail(usuarioAtualizado.email);
            setTelefone(usuarioAtualizado.telefone || "");
            setImageUrl(usuarioAtualizado.imageUrl || "");

            setEnderecos(listaEnderecos);
            setCartoes(listaCartoes);

            localStorage.setItem("usuario_logado", JSON.stringify(usuarioAtualizado));
        } catch (error) {
            console.error("Erro ao carregar dados", error);
        }
    }

    const handlePhoneChange = (valor: string | number) => {
        let v = String(valor).replace(/\D/g, "");
        if (v.length > 11) v = v.slice(0, 11);
        v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
        v = v.replace(/(\d)(\d{4})$/, "$1-$2");
        setTelefone(v);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setFileToUpload(file);

            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };

    const handleIconClick = () => {
        if (isEditing && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleEditarOuSalvar = async () => {
        if (!isEditing) {
            setIsEditing(true);
            return;
        }

        if (!userId) return;

        try {
            const dadosAtualizados = await atualizarCliente(
                userId,
                { nome, email, telefone },
                fileToUpload || undefined
            );

            localStorage.setItem("usuario_logado", JSON.stringify(dadosAtualizados));

            window.dispatchEvent(new Event('userUpdated'));

            setFileToUpload(null);
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
                setPreviewUrl(null);
            }

            setImageUrl(dadosAtualizados.imageUrl || "");

            setIsEditing(false);
            alert("Dados atualizados com sucesso!");
        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar os dados.");
        }
    };

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

    const handleExcluirCartao = async (cartaoId: number) => {
        if (window.confirm("Tem certeza que deseja remover este cartão?")) {
            try {
                if (!cartaoId) return; await excluirCartao(cartaoId); setCartoes(prev => prev.filter(c => c.id !== cartaoId));

            } catch {
                alert("Erro ao excluir cartão.");
            }
        }
    }

    const handleEditar = (endereco: EnderecoDTO) => {
        navigate("/configuracoes/adicionar-endereco", {
            state: {
                enderecoParaEditar: endereco
            }
        });
    }

    return (
        <Layout>
            <div className={`${style.configuration}`}>
                <h2>Informações pessoais</h2>
                <section className={`row ${style.secao}`}>

                    <div className={style.imageContainer}>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        <img
                            src={previewUrl || imageUrl || FotoPerfilDefault}
                            alt="Foto de perfil"
                            className={`${style.fotoPerfil}`}
                        />

                        {isEditing && (
                            <div className={style.imageUploadIcon} onClick={handleIconClick}>
                                <Button border="arredondada" color="laranja" size="small" text="alterar foto" theme="light" />
                            </div>
                        )}
                    </div>

                    <div className={`${style.perfil}`}>
                        <div className={`row ${style.inputs}`}>
                            <Input
                                id="nome"
                                label="Nome"
                                placeholder="Seu nome completo"
                                type="text"
                                value={nome}
                                enable={isEditing}
                                onChange={(val) => setNome(String(val))}
                            />
                            <Input
                                id="telefone"
                                label="Telefone"
                                placeholder="(XX) XXXXX-XXXX"
                                type="text"
                                value={telefone}
                                enable={isEditing}
                                onChange={(val) => handlePhoneChange(val)}
                            />
                            <Button
                                border="arredondada"
                                color={isEditing ? "laranja" : "cinza"}
                                size="small"
                                text={isEditing ? "salvar dados" : "alterar dados"}
                                theme="light"
                                onClick={handleEditarOuSalvar}
                            />
                        </div>
                        <Input id="email" label="Email" placeholder="Seu endereço de email" type="text" value={email} enable={false} onChange={() => { }} />
                        <div className={`row ${style.inputs}`}>
                            <Input id="senha_fake" label="Senha" placeholder="Sua senha" type="password" value="********" enable={false} onChange={() => { }} />
                            <Button border="arredondada" color="laranja" size="small" text="alterar senha" theme="light" navegation="/mudar-senha" />
                        </div>
                    </div>
                </section>

                <hr />

                <div className={`${style.titulo}`}>
                    <div className={`row ${style.title}`}>
                        <i className="bi bi-geo-alt-fill"></i>
                        <h3>Enderecos salvos</h3>
                    </div>

                    <Button
                        border="quadrada"
                        color="laranja"
                        size="big"
                        text="adicionar novo endereço"
                        theme="light"
                        navegation="/configuracoes/adicionar-endereco"
                    />
                </div>

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
                                <Button border="arredondada" color="cinza" size="small" text="editar endereço" theme="light" onClick={() => handleEditar(end)} />
                                <Button border="arredondada" color="transparente" size="small" text="apagar endereço" theme="light" onClick={() => handleExcluir(end.id!)} />
                            </div>
                        </div>
                    ))}
                </section>

                <hr />

                <div className={`row ${style.title}`}>
                    <i className="bi bi-credit-card-2-front-fill"></i>
                    <h3>Cartões salvos</h3>
                </div>

                <section className={`${style.enderecos}`}>
                    {cartoes.length === 0 && (
                        <Error type="empty" />
                    )}

                    {cartoes.map((card) => (
                        <div className={`row ${style.enderecoCompleto}`} key={card.id}>
                            <div className={`row ${style.group}`}>
                                <button onClick={() => handleExcluirCartao(card.id)}>
                                    <i className="bi bi-trash-fill"></i>
                                </button>

                                <CardInfo
                                    bandeira={card.bandeira}
                                    tipo={card.tipo}
                                    numeroMascarado={card.numeroMascarado}
                                    nomeTitular={card.nomeTitular}
                                    validade={card.validade}
                                />
                            </div>

                            <div className={`row ${style.btns}`}>
                                <Button
                                    border="arredondada"
                                    color="transparente"
                                    size="small"
                                    text="remover cartão"
                                    theme="light"
                                    onClick={() => handleExcluirCartao(card.id)}
                                />
                            </div>
                        </div>
                    ))}
                </section>

                <Button border="arredondada" color="branco" size="big" text="sair da logologo" theme="light" onClick={handleLogout} />
            </div>
        </Layout>
    )
}