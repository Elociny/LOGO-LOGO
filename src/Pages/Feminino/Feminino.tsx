import { Product } from "../../components/Product/Product";
import { Filters } from "../../components/Filters/Filters";
import style from "./Feminino.module.css";

import { Layout } from "../../components/Layout/Layout";
import { Categories } from "../../components/Categories/Categories";
import { useQuery } from "@tanstack/react-query";
import { listarProdutos } from "../../services/produtoService";
import { Error } from "../../components/Error/Error";
import { Spinner } from "../../components/Spinner/Spinner";

export function Feminino() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["produtos"],
    queryFn: listarProdutos,
  })

  return (
    <Layout theme="light">
      <div className={style.container}>
        <Categories />

        <main className={style.main}>
          <aside className={style.filters}>
            <Filters />
          </aside>

          <section className={style.products}>

            {isLoading && (
              <Spinner />
            )}

            {isError && (
              <Error />
            )}

            <div className={`${style.grid}`}>
              {!isLoading && data?.slice(0, 4).map(produto => (
                <Product key={produto.id} image={produto.imageUrl} name={produto.nome} price={produto.preco} discount={produto.desconto} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
