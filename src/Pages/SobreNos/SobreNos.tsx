import { Layout } from "../../components/Layout/Layout";
import style from "./SobreNos.module.css"; 
// Importação da imagem da equipe salva (garanta que o caminho esteja correto)
import TeamImage from "../../assets/images/SobreNos.png"; 

// O placeholder da imagem de história foi removido/substituído.

export function SobreNos() {
  return (
    <Layout>
      <div className={style.container}>
        <h1 className={style.title}>Nossa Visão, Nossos Valores.</h1>
        <p className={style.subtitle}>
          A LOGOLOGO nasceu de uma paixão por transformar a experiência de compra online. 
          Conheça os pilares que guiam cada decisão que tomamos.
        </p>

        {/* SEÇÃO DE VALORES (MANTIDA) */}
        <div className={style.valuesGrid}>
          
          <div className={style.valueItem}>
            <i className={`bi bi-lightbulb-fill ${style.valueIcon}`}></i>
            <h3>Inovação Constante</h3>
            <p>
              Estamos sempre à frente, buscando as últimas tendências e tecnologias 
              para otimizar sua experiência de compra, desde o clique até a entrega.
            </p>
          </div>

          <div className={style.valueItem}>
            <i className={`bi bi-hand-thumbs-up-fill ${style.valueIcon}`}></i>
            <h3>Compromisso com o Cliente</h3>
            <p>
              Você está no centro de tudo o que fazemos. Nossa missão é oferecer 
              suporte excepcional e produtos que superem suas expectativas.
            </p>
          </div>

          <div className={style.valueItem}>
            <i className={`bi bi-globe-americas ${style.valueIcon}`}></i>
            <h3>Moda Acessível</h3>
            <p>
              Acreditamos que estilo e qualidade não devem ser um luxo. 
              Trabalhamos para oferecer preços justos sem comprometer a excelência.
            </p>
          </div>
        </div>

        <div className={style.historySection}>
          
          <img src={TeamImage} alt="Nossa Equipe LOGOLOGO" /> 

          <div className={style.historyContent}>
            <h2>Do Início à Marca que Você Conhece</h2>
            <p>
              Tudo começou em uma pequena sala, com a ideia de simplificar a busca 
              por roupas da moda. Em pouco tempo, a LOGOLOGO cresceu, expandiu 
              suas categorias e hoje é uma referência no e-commerce brasileiro.
            </p>
            <p>
              Nossa equipe é formada por especialistas em moda, tecnologia e logística, 
              todos dedicados a levar a "moda irresistível, que você leva logo."
            </p>
          </div>
        </div>

      </div>
    </Layout>
  );
}