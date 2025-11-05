import { Button } from "../../components/Button/Button"
import { FormInput } from "../../components/FormInput/FormInput"
import { Layout } from "../../components/Layout/Layout"
import style from "./ForgotPassword.module.css"

export function ForgotPassword() {
    return (
        <Layout theme="light">
            <div className={`row ${style.container}`}>
                <div className={`row ${style.box}`}>
                    <i className={`row bi bi-lock ${style.icon}`}></i>

                    <h1>Esqueceu senha?</h1>
                    <p>Coloque seu email para redefinir a senha.</p>

                    <hr className={`${style.dashed}`} />

                    <div className={`${style.group}`}>
                        <FormInput icon="bi bi-envelope" id="email" label="Endereço de email" placeholder="Digite aqui seu email" theme="light" type="text" />
                    </div>

                    <Button border="quadrada" color="cinza" navegation="/changePassword" size="big" text="redefinir senha" theme="light" />

                    <span>Após redefinir a senha, você receberá um link em seu e-mail para concluir o processo.</span>
                </div>
            </div>

        </Layout>
    )
}