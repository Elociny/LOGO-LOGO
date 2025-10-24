import { NavLink } from "react-router"
import LoginIllustrator from "../../assets/images/login-illustrator.svg"
import { Button } from "../../components/Button/Button"
import { Input } from "../../components/Input/Input"
import { Logo } from "../../components/Logo/Logo"


import style from "./Register.module.css"

export function Register() {
    return (
        <div className={`row px-100 ${style.container}`}>
            <div className={`row ${style.left}`}>
                <img src={LoginIllustrator} alt="Imagem da página de cadastro" />
            </div>

            <div className={`${style.right}`}>
                <div className={`row ${style.titulo}`}>
                    <h1>Bem vindo(a) á</h1>
                    <Logo nome="logologo" />
                </div>

                <div className={`row ${style.inputs}`}>
                    <Input icon="bi bi-person" id="nome" label="Nos diga seu seu nome" placeholder="Digite aqui o seu nome completo" theme="dark" type="text" />

                    <Input icon="bi bi-envelope" id="email" label="Cadastre seu email" placeholder="Digite aqui sem melhor email" theme="dark" type="text" />

                    <Input icon="bi bi-eye" id="senha" label="Crie sua senha" placeholder="Digite aqui sua senha" theme="dark" type="password" />

                    <Input icon="bi bi-eye" id="senha" label="Confirme sua senha" placeholder="Digite novamente sua senha" theme="dark" type="password" />
                </div>

                <Button border="quadrada" color="laranja" navegation="/" size="big" text="cadastrar" theme="dark" />

                <p>
                    Já possui conta?
                    <span>
                        <NavLink to="/login">Entre por aqui!</NavLink>
                    </span>
                </p>
            </div>
        </div>
    )
}