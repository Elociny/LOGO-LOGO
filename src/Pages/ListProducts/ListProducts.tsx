import { Product } from "../../components/Product/Product";
import { Filters } from "../../components/Filters/Filters";
import style from "./ListProducts.module.css";
import { Layout } from "../../components/Layout/Layout";
import { Categories } from "../../components/Categories/Categories";
import { useQuery } from "@tanstack/react-query";

import { listarProdutos, buscarProdutosPorNome } from "../../services/produtoService";
import { Error } from "../../components/Error/Error";
import { Spinner } from "../../components/Spinner/Spinner";

import { useParams, useSearchParams } from "react-router";

import type { ProductAPI } from "../../types/ProductAPI";

export function ListProducts() {
  const { categoria } = useParams<{ categoria: string }>();

  const [searchParams] = useSearchParams();
  const termoBusca = searchParams.get("q");

  const queryFn = termoBusca
    ? () => buscarProdutosPorNome(termoBusca)
    : listarProdutos;

  const queryKey = termoBusca
    ? ["produtos", "busca", termoBusca]
    : ["produtos", "todos"];

  const { data, isLoading, isError } = useQuery<ProductAPI[]>({
    queryKey: queryKey,
    queryFn: queryFn,
  });

  const categoriaSelecionada = categoria?.toUpperCase();
  let produtosExibidos = data;

  if (termoBusca) {
    produtosExibidos = data;
  } else {
    produtosExibidos = categoriaSelecionada && categoriaSelecionada !== "NOVIDADES"
      ? data?.filter(p => p.categoria?.toUpperCase() === categoriaSelecionada)
      : data;
  }

  return (
    <Layout theme="light">
      <div className={style.container}>

        <Categories highlightCategoria={categoriaSelecionada} />

        <main className={style.main}>
          <aside className={style.filters}>
            <Filters />
          </aside>

          <section className={style.products}>

            {termoBusca && !isLoading && (
              <>
                <h3 className="mb-4">Resultados para: "{termoBusca}"</h3>
                <br />
              </>
            )}

            {isLoading && (
              <div className={`${style.sticky}`}>
                <Spinner />
              </div>
            )}

            {isError && (
              <div className={`${style.sticky}`}>
                <Error />
              </div>
            )}

            {!isLoading && !isError && produtosExibidos?.length === 0 && (
              <div className={`${style.sticky}`}>
                <Error type="empty" />
              </div>
            )}

            <div className={style.grid}>
              {!isLoading && produtosExibidos?.map(produto => (
                <Product
                  key={produto.id}
                  data={produto}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}