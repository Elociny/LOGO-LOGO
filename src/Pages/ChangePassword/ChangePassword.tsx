import { Button } from "../../components/Button/Button"
import { Input } from "../../components/SearchInput/SearchInput"
import { Layout } from "../../components/Layout/Layout"
import style from "./ChangePassword.module.css"

export function ChangePassword() {
    return (
        <Layout theme="light">
            <div className={`row ${style.container}`}>
                <div className={`row ${style.box}`}>
                    <i className={`row bi bi-unlock ${style.icon}`}></i>

                    <h1>Redefinir senha</h1>

                    <div className={`${style.group}`}>
                        <Input icon="bi bi-envelope" id="email" label="Endereço de email" placeholder="Digite aqui seu email" theme="light" type="text" />
                    </div>

                    <hr className={`${style.dashed}`} />

                    <div className={`${style.group}`}>
                        <Input icon="bi bi-eye" id="senha" label="Nova senha" placeholder="Digite aqui sua nova senha" theme="light" type="password" />
                    </div>

                    <div className={`${style.group}`}>
                        <Input icon="bi bi-eye" id="senha" label="Confirmar nova senha" placeholder="Digite novamente sua nova senha" theme="light" type="password" />
                    </div>

                    <Button border="quadrada" color="cinza" navegation="/" size="big" text="redefinir senha" theme="light" />
                </div>
            </div>
        </Layout>
    )
}