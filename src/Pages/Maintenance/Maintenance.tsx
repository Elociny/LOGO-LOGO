import { Layout } from "../../components/Layout/Layout";
import style from "./Maintenance.module.css";

import UnderConstruction from "../../assets/images/under-constructions-image.svg"
import { Button } from "../../components/Button/Button";

export function Maintenance() {
  return (
    <Layout theme="light">
      <div className={`row ${style.box}`}>
        <h1>Ops! Parece que você nos pegou no meio de uma reforma!</h1>
        <p>Estamos ajustando os últimos detalhes. Em breve, tudo estará pronto!</p>
        <img src={UnderConstruction} alt="Imagem de manutenção da página" />
        <Button border="quadrada" color="cinza" navegation="/" size="big" text="voltar" theme="light" />
      </div>
    </Layout>
  );
}
