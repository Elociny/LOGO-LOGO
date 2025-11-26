import { Layout } from "../../components/Layout/Layout";
import style from "./Contato.module.css"; 

export function Contato() {
  return (
    <Layout>
      <div className={style.container}>
        <h1 className={style.title}>Fale Conosco</h1>
        <p className={style.subtitle}>
          Estamos aqui para ajudar! Escolha o canal que melhor atende à sua necessidade.
        </p>

        <div className={style.contactGrid}>
          
          <div className={style.contactItem}>
            <i className={`bi bi-phone ${style.contactIcon}`}></i>
            <h3>Central de Atendimento</h3>
            <p>Ligue para nossa equipe de suporte para dúvidas sobre pedidos e produtos.</p>
            <p className={style.info}> (11) 98765-4321</p>
            <p className={style.info}>Horário: Seg - Sex, 9h às 18h</p>
          </div>

          <div className={style.contactItem}>
            <i className={`bi bi-envelope ${style.contactIcon}`}></i>
            <h3>Suporte por E-mail</h3>
            <p>Envie sua mensagem e responderemos em até 24 horas úteis.</p>
            <p className={style.info}> suporte@logologo.com.br</p>
            <p className={style.info}>Assuntos: Devoluções, Trocas, SAC</p>
          </div>

          <div className={style.contactItem}>
            <i className={`bi bi-briefcase ${style.contactIcon}`}></i>
            <h3>Parcerias e Negócios</h3>
            <p>Para propostas comerciais, marketing ou fornecedores.</p>
            <p className={style.info}> negocios@logologo.com.br</p>
            <p className={style.info}>Fale com o time de Expansão.</p>
          </div>
        </div>
        
        <div className={style.addressSection}>
            <h2>Localização e Atendimento Presencial</h2>
            <p>
                Rua da Moda, 123 - Bairro Estiloso - São Paulo, SP<br/>
                CEP: 01234-567
            </p>
            <p className={style.attention}>Atenção: Nosso escritório não possui ponto de venda física. Apenas para retirada de pedidos agendados.</p>
        </div>

      </div>
    </Layout>
  );
}