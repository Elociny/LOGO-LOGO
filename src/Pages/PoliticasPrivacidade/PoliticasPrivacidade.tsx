import { Layout } from "../../components/Layout/Layout";
import style from "./PoliticasPrivacidade.module.css"; 

export function PoliticasPrivacidade() {
  return (
    <Layout>
      <div className={style.container}>
        <h1 className={style.mainTitle}>Política de Privacidade LOGOLOGO</h1>

        <section className={style.section}>
          <h2 className={style.sectionTitle}>1. INTRODUÇÃO</h2>
          
          <p className={style.item}>
            <span className={style.itemNumber}>1.1</span> Bem-vindo à plataforma LOGOLOGO, administrada pela LOGOLOGO Comércio de Moda Ltda, inscrita no CNPJ sob nº 33.000.000/0001-50 (“LOGOLOGO”). A LOGOLOGO leva a sério suas responsabilidades sob a Lei Geral de Proteção de Dados (LGPD) e outros regulamentos de privacidade aplicáveis. Esta Política de Privacidade foi criada para ajudar você a entender como coletamos, usamos e processamos os dados pessoais que você nos fornece ao utilizar nosso website e serviços (a "Plataforma").
          </p>

          <p className={style.item}>
            <span className={style.itemNumber}>1.2</span> Dados Pessoais significam dados sobre um indivíduo que pode ser identificado a partir dessas informações. Ao usar nossos Serviços, registrar uma conta ou acessar nossa Plataforma, você concorda que podemos coletar, usar e processar seus dados pessoais conforme descrito aqui. Se você NÃO consentir, por favor, não utilize nossos serviços.
          </p>
        </section>

        <section className={style.section}>
          <h2 className={style.sectionTitle}>2. QUANDO COLETAMOS DADOS PESSOAIS?</h2>
          
          <p className={style.item}>
            <span className={style.itemNumber}>2.1</span> Coletamos dados pessoais sobre você quando:
            <ul className={style.list}>
              <li>Você se registra e/ou usa nossos Serviços ou Plataforma, ou abre uma conta conosco.</li>
              <li>Você interage conosco, como em chamadas telefônicas, e-mails ou através de nossas plataformas de mídia social.</li>
              <li>Você usa nossos serviços eletrônicos, ou interage conosco por meio de nosso aplicativo ou usa serviços em nossa Plataforma (incluindo o uso de cookies).</li>
              <li>Você realiza transações através de nossos Serviços (compra e pagamento).</li>
            </ul>
          </p>
        </section>

        <section className={style.section}>
          <h2 className={style.sectionTitle}>3. QUE DADOS PESSOAIS COLETAMOS?</h2>
          
          <p className={style.item}>
            <span className={style.itemNumber}>3.1</span> Os dados pessoais que a LOGOLOGO pode coletar incluem, mas não se limitam a:
            <ul className={style.list}>
              <li>Nome, endereço de e-mail, data de nascimento e gênero.</li>
              <li>Endereço de cobrança ou de entrega.</li>
              <li>Conta bancária e informações de pagamento (via parceiros de pagamento).</li>
              <li>Número de telefone e documentos de identificação.</li>
              <li>Dados de utilização e transacionais (detalhes sobre buscas, pedidos e conteúdo com o qual você interage).</li>
              <li>Dados de localização, se a permissão for concedida no seu dispositivo.</li>
            </ul>
          </p>
        </section>

        <section className={style.section}>
          <h2 className={style.sectionTitle}>4. COOKIES</h2>
          
          <p className={style.item}>
            <span className={style.itemNumber}>4.1</span> A LOGOLOGO utiliza "cookies" e outras funcionalidades para permitir que terceiros coletem ou compartilhem informações relativas ao seu uso da Plataforma. Eles nos ajudam a melhorar nossos Serviços, oferecer novos recursos e fornecer conteúdo mais relevante.
          </p>
          <p className={style.item}>
            <span className={style.itemNumber}>4.2</span> Você pode recusar o uso de cookies selecionando as configurações apropriadas no seu navegador. No entanto, observe que, se você fizer isso, poderá não conseguir usar todas as funcionalidades da nossa Plataforma.
          </p>
        </section>

        <section className={style.section}>
          <h2 className={style.sectionTitle}>5. COMO USAMOS AS INFORMAÇÕES QUE VOCÊ NOS FORNECE?</h2>
          
          <p className={style.item}>
            <span className={style.itemNumber}>5.1</span> Podemos coletar, usar e processar seus dados pessoais para uma ou mais das seguintes finalidades (os “Objetivos”):
            <ul className={style.list}>
              <li>Gerenciar, operar e administrar seu uso e/ou acesso aos nossos Serviços e sua conta.</li>
              <li>Processar transações e atender às suas solicitações de produtos e serviços.</li>
              <li>Para identificação, verificação, prevenção e combate à fraude e lavagem de dinheiro.</li>
              <li>Manter e administrar quaisquer atualizações de software.</li>
              <li>Para marketing e publicidade (envio de promoções e boletins informativos).</li>
              <li>Responder a processos legais ou cumprir conforme exigido por qualquer lei aplicável.</li>
            </ul>
          </p>
        </section>
        
        <section className={style.section}>
          <h2 className={style.sectionTitle}>6. PROTEÇÃO E RETENÇÃO</h2>
          
          <p className={style.item}>
            <span className={style.itemNumber}>6.1</span> Implementamos uma variedade de medidas de segurança para garantir a segurança de seus dados pessoais em nossos sistemas.
          </p>
          <p className={style.item}>
            <span className={style.itemNumber}>6.2</span> Reteremos suas informações pessoais de acordo com as Leis de Privacidade. Se você parar de usar a Plataforma, podemos continuar armazenando seus dados pessoais pelo tempo necessário para fins legais ou comerciais, sujeitos à legislação aplicável.
          </p>
        </section>

      </div>
    </Layout>
  );
}