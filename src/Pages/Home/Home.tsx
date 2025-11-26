import { Layout } from "../../components/Layout/Layout";
import { Carousel } from "../../components/Carousel/Carousel";
import { Categories } from "../../components/Categories/Categories";
import { Product } from "../../components/Product/Product";
import { Button } from "../../components/Button/Button";

import Banner1 from "../../assets/images/banner1.svg";
import Banner2 from "../../assets/images/banner2.svg";

import style from "./Home.module.css";

import { useQuery } from "@tanstack/react-query";
import { listarProdutos } from "../../services/produtoService";
import { Spinner } from "../../components/Spinner/Spinner";
import { Error } from "../../components/Error/Error";

export function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["produtos"],
    queryFn: listarProdutos,
  });

  return (
    <Layout theme="light">
      <Carousel />

      <Categories />

      <div className={style.banner}>
        <img src={Banner1} alt="Banner 1 LOGOLOGO" />
      </div>

      <h2>Você pode gostar</h2>

      {isLoading && <Spinner />}
      {isError && <Error />}

      <div className={`row ${style.products}`}>
        {!isLoading &&
          data?.slice(0, 4).map(produto => (
            <Product
              key={produto.id}
              data={produto}
            />
          ))}
      </div>

      <div className={style.banner}>
        <img src={Banner2} alt="Banner 2 LOGOLOGO" />
      </div>

      <div className={`row ${style.botoes}`}>

        <Button
          theme="light"
          size="big"
          color="cinza"
          border="quadrada"
          text="sobre nós"              
          navegation="sobre-nos"         
        />

        <Button
          theme="light"
          size="big"
          color="cinza"
          border="quadrada"
          text="fale conosco"
          navegation="fale-conosco"     
        />

        <Button
          theme="light"
          size="big"
          color="cinza"
          border="quadrada"
          text="políticas de privacidade" 
          navegation="politicas-privacidade" 
        />
      </div>

      </Layout>
      
      );
}
