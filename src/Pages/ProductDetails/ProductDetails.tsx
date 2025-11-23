import { Categories } from "../../components/Categories/Categories"
import { InfoProduct } from "../../components/InfoProduct/InfoProduct"
import { Layout } from "../../components/Layout/Layout"
import style from "./ProductDetails.module.css"

import Blusa from "../../assets/images/products/produto1.svg";
import { Comment } from "../../components/Comment/Comment";

export function ProductDetails() {
    return (
        <Layout>
            <div className={`${style.product_details}`}>
                <Categories />

                <InfoProduct image={Blusa} name="nome" price={105} discount={50} />

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