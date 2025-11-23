import { Categories } from "../../components/Categories/Categories"
import { InfoProduct } from "../../components/InfoProduct/InfoProduct"
import { Layout } from "../../components/Layout/Layout"
import style from "./ProductDetails.module.css"

import { Comment } from "../../components/Comment/Comment";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { buscarProdutoPorId } from "../../services/produtoService";
import { Spinner } from "../../components/Spinner/Spinner";
import { Error } from "../../components/Error/Error";

export function ProductDetails() {
    const { id } = useParams<{ id: string }>()

    const { data: produto, isLoading, isError } = useQuery({
        queryKey: ['produto', id],
        queryFn: () => buscarProdutoPorId(Number(id)),
        enabled: !!id,
    })

    return (
        <Layout>
            <div className={`${style.product_details}`}>
                <Categories />

                {isLoading && <Spinner />}

                {isError && <Error />}

                {produto && (
                    <InfoProduct
                        produto={produto}
                    />
                )}

                <hr />

                <div className={`${style.avaliacoes}`}>
                    <h2>Vejam o que estão falando desse produto</h2>

                    <div className={`row ${style.avaliacao}`}>
                        <div className={style.stars}>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-half"></i>
                        </div>
                        <p>4.5<span>/5</span></p>
                    </div>

                    <Comment />
                    <Comment />
                </div>
            </div>
        </Layout>
    )
}