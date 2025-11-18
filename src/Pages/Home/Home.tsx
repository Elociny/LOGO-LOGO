import { Layout } from "../../components/Layout/Layout";
import { Carousel } from "../../components/Carousel/Carousel";
import { Category } from "../../components/Category/Category";

import style from "./Home.module.css"

import Lightning from "../../assets/images/icons/lightning.svg"
import Dress from "../../assets/images/icons/dress.svg"
import Shirt from "../../assets/images/icons/shirt.svg"
import Bear from "../../assets/images/icons/bear.svg"
import Shoe from "../../assets/images/icons/shoe.svg"
import Necklace from "../../assets/images/icons/necklace.svg"

import Banner1 from "../../assets/images/banner1.svg"
import Banner2 from "../../assets/images/banner2.svg"
import { Button } from "../../components/Button/Button";
import { Product } from "../../components/Product/Product";

import { useQuery } from "@tanstack/react-query";
import { listarProdutos } from "../../services/produtoService";
import { Spinner } from "../../components/Spinner/Spinner";
import { Error } from "../../components/Error/Error";

export function Home() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["produtos"],
        queryFn: listarProdutos,
    })
    
    return (
        <Layout theme="light">
            <Carousel />

            <div className={`row ${style.categories}`}>
                <Category icon={Lightning} titulo="Novidades" />
                <Category icon={Dress} titulo="Feminino" />
                <Category icon={Shirt} titulo="Masculino" />
                <Category icon={Bear} titulo="Infantil" />
                <Category icon={Shoe} titulo="Calçados" />
                <Category icon={Necklace} titulo="Acessórios" />
            </div>

            <div className={`${style.banner}`}>
                <img src={Banner1} alt="Banner 1 LOGOLOGO" />
            </div>

            <h2>Você pode gostar</h2>

            {isLoading && (
                <Spinner />
            )}

            {isError && (
                <Error />
            )}

            <div className={`row ${style.products}`}>
                {!isLoading && data?.slice(0, 4).map(produto => (
                    <Product key={produto.id} image={produto.imageUrl} name={produto.nome} price={produto.preco} discount={produto.desconto} />
                ))}
            </div>

            <div className={`${style.banner}`}>
                <img src={Banner2} alt="Banner 2 LOGOLOGO" />
            </div>

            <div className={`row ${style.botoes}`}>
                <Button theme="light" size="big" color="cinza" border="quadrada" text="cupons" navegation="cupons" />
                <Button theme="light" size="big" color="cinza" border="quadrada" text="fale conosco" navegation="fale-conosco" />
                <Button theme="light" size="big" color="cinza" border="quadrada" text="frete grátis" navegation="frete-gratis" />
            </div>
        </Layout>
    )
}