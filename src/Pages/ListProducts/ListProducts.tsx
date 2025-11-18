import { Product } from "../../components/Product/Product";
import { Filters } from "../../components/Filters/Filters";
import style from "./ListProducts.module.css";

import { Layout } from "../../components/Layout/Layout";
import { Categories } from "../../components/Categories/Categories";
import { useQuery } from "@tanstack/react-query";
import { listarProdutos } from "../../services/produtoService";
import { Error } from "../../components/Error/Error";
import { Spinner } from "../../components/Spinner/Spinner";

import { useParams } from "react-router-dom";

export function ListProducts() {
  const { categoria } = useParams<{ categoria: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["produtos"],
    queryFn: listarProdutos,
  });

  const categoriaSelecionada = categoria?.toUpperCase();

  const produtosFiltrados =
    categoriaSelecionada && categoriaSelecionada !== "NOVIDADES"
      ? data?.filter(p => p.categoria?.toUpperCase() === categoriaSelecionada)
      : data;
      
  return (
    <Layout theme="light">
      <div className={style.container}>

        <Categories highlightCategoria={categoriaSelecionada} />

        <main className={style.main}>
          <aside className={style.filters}>
            <Filters />
          </aside>

          <section className={style.products}>
            {isLoading && <Spinner />}
            {isError && <Error />}

            {!isLoading && !isError && produtosFiltrados?.length === 0 && <Error type="empty" />}

            <div className={style.grid}>
              {!isLoading && produtosFiltrados?.map(produto => (
                <Product
                  key={produto.id}
                  image={produto.imageUrl}
                  name={produto.nome}
                  price={produto.preco}
                  discount={produto.desconto}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
