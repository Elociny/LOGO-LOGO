import { NavLink, useNavigate } from "react-router";
import { Button } from "../../components/Button/Button";
import { Logo } from "../../components/Logo/Logo";

import LoginImage from "../../assets/images/loginImage.svg";

import style from "./Login.module.css";
import { FormInput } from "../../components/FormInput/FormInput";
import { useState } from "react";
import { login } from "../../services/authService";

export function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if(!email || !senha) {
      alert("Por favor, prencha email e senha")
      return
    }

    try {
      setLoading(true)

      const usuario = await login({email, senha})

      localStorage.setItem("usuario_logado", JSON.stringify(usuario))

      navigate("/")
    } catch(error) {
      console.log(error)
      alert("Email ou senha incorretos")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className={`row px-100 ${style.container}`}>
      <div className={`${style.left}`}>
        <div className={`${style.titulo}`}>
          <h1>Bem vindo(a) à </h1>
          <Logo nome="logologo" />
        </div>

        <div className={`row ${style.inputs}`} onKeyDown={handleKeyDown}>
          <FormInput
            icon="bi bi-envelope"
            id="email"
            label="Inserir e-mail"
            placeholder="Digite seu email"
            type="text"
            theme="light"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            icon="bi bi-eye"
            id="password"
            label="Insira sua senha"
            placeholder="Digite sua senha"
            type="password"
            theme="light"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <p>
            <NavLink to="/mudar-senha">Esqueceu a senha?</NavLink>
          </p>
        </div>

        <Button
          border="quadrada"
          color="laranja"
          size="big"
          text={loading ? "Entrando..." : "entrar"}
          theme="light"
          onClick={handleLogin}
        />

        <p>
          Primeiro acesso?
          <span className={`${style.span}`}>
            <NavLink to="/Register">Crie uma conta!</NavLink>
          </span>
        </p>
      </div>
      <div className={`row ${style.right}`}>
        <img src={LoginImage} alt="Imagem da página de login" />
      </div>
    </div>
  );
}