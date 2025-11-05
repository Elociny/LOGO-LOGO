import { Button } from "../../components/Button/Button";
import { Layout } from "../../components/Layout/Layout";

import style from "./NotFound.module.css";

import ErrorImage from "../../assets/images/error.svg";

export function NotFound() {
  return (
    <Layout theme="dark">
      <div className={`row ${style.fundo}`}>
        <div className={`${style.box}`}>
          <h1>Ops...</h1>
          <h2>Página não encontrada!</h2>
          <p>
            Desculpe, o conteúdo que você procura não existe ou foi removido.
          </p>
          <Button
            border="quadrada"
            color="branco"
            size="big"
            text="voltar"
            theme="dark"
            navegation="/"
          />
        </div>
        <div className={`${style.image}`}>
          <img src={ErrorImage} alt="imagem de erro" />
        </div>
        <div className={`${style.number}`}>
          <p>4</p>
          <p>0</p>
          <p>4</p>
        </div>
      </div>
    </Layout>
  );
}
