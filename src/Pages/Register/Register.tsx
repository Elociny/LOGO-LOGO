import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginIllustrator from "../../assets/images/login-illustrator.svg";
import { Button } from "../../components/Button/Button";
import { Logo } from "../../components/Logo/Logo";
import style from "./Register.module.css";
import { FormInput } from "../../components/FormInput/FormInput";
import { cadastrar } from "../../services/authService";
import { AxiosError } from "axios";

import { Modal } from "../../components/Modal/Modal";

export function Register() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [loading, setLoading] = useState(false);

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

    const handleCadastro = async () => {
        if (!nome || !email || !senha || !confirmarSenha) {
            abrirModal("warning", "Atenção", "Por favor, preencha todos os campos.");
            return;
        }

        if (senha !== confirmarSenha) {
            abrirModal("error", "Erro nas senhas", "As senhas não coincidem!");
            return;
        }

        if (senha.length < 6) {
            abrirModal("warning", "Senha Curta", "A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        try {
            setLoading(true);

            const usuarioCriado = await cadastrar({ nome, email, senha });

            localStorage.setItem("usuario_logado", JSON.stringify(usuarioCriado));

            navigate("/");
        } catch (error) {
            const err = error as AxiosError;

            console.error("ERRO DETALHADO:", err);

            let msg = "Erro desconhecido.";

            if (err.response && err.response.data) {
                const dadosDoErro = err.response.data;

                if (typeof dadosDoErro === "string") {
                    msg = dadosDoErro;
                } else if (
                    typeof dadosDoErro === "object" &&
                    dadosDoErro !== null &&
                    "message" in dadosDoErro
                ) {
                    msg = String((dadosDoErro as Record<string, unknown>).message);
                } else {
                    msg = JSON.stringify(dadosDoErro);
                }

                abrirModal("error", "Erro no Cadastro", msg);
            } else {
                abrirModal("error", "Erro de Conexão", "Não foi possível conectar ao servidor. Verifique se o Backend está rodando.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleCadastro();
        }
    };

    return (
        <div className={`row px-100 ${style.container}`}>
            <div className={`row ${style.left}`}>
                <img src={LoginIllustrator} alt="Imagem da página de cadastro" />
            </div>

            <div className={`${style.right}`}>
                <div className={`row ${style.titulo}`}>
                    <h1>Bem vindo(a) à</h1>
                    <Logo nome="logologo" />
                </div>

                <div className={`row ${style.inputs}`} onKeyDown={handleKeyDown}>
                    <FormInput
                        icon="bi bi-person"
                        id="nome"
                        label="Nos diga seu nome"
                        placeholder="Digite aqui o seu nome completo"
                        theme="dark"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <FormInput
                        icon="bi bi-envelope"
                        id="email"
                        label="Cadastre seu email"
                        placeholder="Digite aqui seu melhor email"
                        theme="dark"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <FormInput
                        icon="bi bi-eye"
                        id="senha"
                        label="Crie sua senha"
                        placeholder="Digite aqui sua senha"
                        theme="dark"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    <FormInput
                        icon="bi bi-eye"
                        id="confirmarSenha"
                        label="Confirme sua senha"
                        placeholder="Digite novamente sua senha"
                        theme="dark"
                        type="password"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                    />
                </div>

                <Button
                    border="quadrada"
                    color="laranja"
                    size="big"
                    text={loading ? "Cadastrando..." : "Cadastrar"}
                    theme="dark"
                    onClick={handleCadastro}
                />

                <p>
                    Já possui conta?
                    <span>
                        <NavLink to="/login">Entre por aqui!</NavLink>
                    </span>
                </p>
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
        </div>
    )
}