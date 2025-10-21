import { NavLink } from "react-router";
import { Button } from "../../components/Button/Button";
import { Logo } from "../../components/Logo/Logo";

import LoginImage from "../../assets/images/loginImage.svg";

import style from "./Login.module.css";
import { Input } from "../../components/Input/Input";

export function Login() {
  return (
    <div className={`row px-100 ${style.container}`}>
      <div className={`${style.left}`}>
        <div className={`${style.titulo}`}>
          <h1>Bem vindo(a) à </h1>
          <Logo nome="logologo" />
        </div>

        <div className={`row ${style.inputs}`}>
          <Input
            icon="bi bi-envelope"
            id="email"
            label="Inserir e-mail"
            placeholder="Digite seu email"
            type="text"
            theme="light"
          />

          <Input
            icon="bi bi-eye"
            id="password"
            label="Insira sua senha"
            placeholder="Digite sua senha"
            type="password"
            theme="light"
          />

          <p>
            <NavLink to="esqueceu-senha">Esqueceu a senha?</NavLink>
          </p>
        </div>

        <Button
          border="quadrada"
          color="laranja"
          navegation="/"
          size="big"
          text="entrar"
          theme="light"
        />

        <p>
          Primeiro acesso?
          <span className={`${style.span}`}>
            <NavLink to="/cadastro">Crie uma conta!</NavLink>
          </span>
        </p>
      </div>
      <div className={`row ${style.right}`}>
        <img src={LoginImage} alt="Imagem da página de login" />
      </div>
    </div>
  );
}
