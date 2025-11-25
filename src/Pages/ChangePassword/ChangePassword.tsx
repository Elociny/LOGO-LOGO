import { useNavigate } from "react-router"
import { Button } from "../../components/Button/Button"
import { FormInput } from "../../components/FormInput/FormInput"
import { Layout } from "../../components/Layout/Layout"
import style from "./ChangePassword.module.css"
import { useEffect, useState, type ChangeEvent } from "react"
import { alterarSenha } from "../../services/authService"

export function ChangePassword() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [novaSenha, setNovaSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const [loading, setLoading] = useState(false)

    const [isEmailEditable, setIsEmailEditable] = useState(true)

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario_logado")

        if (usuarioSalvo) {
            const dados = JSON.parse(usuarioSalvo)
            setEmail(dados.email)
            setIsEmailEditable(false)
        } else {
            setIsEmailEditable(true)
        }
    }, [])

    async function handleAlterarSenha() {
        if (!email) {
            alert("Por favor, informe o email.")
            return
        }

        if (!novaSenha || !confirmarSenha) {
            alert("Preencha as duas senhas")
            return
        }

        if (novaSenha !== confirmarSenha) {
            alert("As senhas não coincidem!")
            return
        }

        if (novaSenha.length < 6) {
            alert("Senha tem que ter no mínimo 6 caracteres")
            return
        }

        try {
            setLoading(true)
            await alterarSenha(email, novaSenha)

            alert("Senha alterada com sucesso! Faça login com a nova senha.")

            localStorage.removeItem("usuario_logado")
            navigate("/login")
        } catch (error) {
            console.log(error)
            alert("Erro ao alterar a senha. Verifique se o email está correto.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout theme="light">
            <div className={`row ${style.container}`}>
                <div className={`row ${style.box}`}>
                    <i className={`row bi bi-unlock ${style.icon}`}></i>

                    <h1>Redefinir senha</h1>

                    <div className={`${style.group}`}>
                        <FormInput
                            icon="bi bi-envelope"
                            id="email"
                            label="Endereço de email"
                            placeholder="Digite aqui seu email"
                            theme="light"
                            type="text"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (isEmailEditable) setEmail(e.target.value)
                            }}
                        />
                    </div>

                    <hr className={`${style.dashed}`} />

                    <div className={`${style.group}`}>
                        <FormInput
                            icon="bi bi-eye"
                            id="novaSenha"
                            label="Nova senha"
                            placeholder="Digite aqui sua nova senha"
                            theme="light"
                            type="password"
                            value={novaSenha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setNovaSenha(e.target.value)}
                        />
                    </div>

                    <div className={`${style.group}`}>
                        <FormInput
                            icon="bi bi-eye"
                            id="confirmarNovaSenha"
                            label="Confirmar nova senha"
                            placeholder="Digite novamente sua nova senha"
                            theme="light"
                            type="password"
                            value={confirmarSenha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmarSenha(e.target.value)}
                        />
                    </div>

                    <Button
                        border="quadrada"
                        color="cinza"
                        size="big"
                        text={loading ? "salvando..." : "redefinir senha"}
                        theme="light"
                        onClick={handleAlterarSenha}
                    />
                </div>
            </div>
        </Layout>
    )
}