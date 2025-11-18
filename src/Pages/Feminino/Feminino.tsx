import { Product } from "../../components/Product/Product";
import { Filters } from "../../components/Filters/Filters";
import style from "./Feminino.module.css";

import Product1 from "../../assets/images/products/produto1.svg";
import Product2 from "../../assets/images/products/produto2.svg";
import Product3 from "../../assets/images/products/produto3.svg";
import Product4 from "../../assets/images/products/produto4.svg";
import Product5 from "../../assets/images/products/produto5.svg";
import { Layout } from "../../components/Layout/Layout";
import { Categories } from "../../components/Categories/Categories";

export function Feminino() {
  return (
    <Layout theme="light">
      <div className={style.container}>
        <Categories />

        <main className={style.main}>
          <aside className={style.filters}>
            <Filters />
          </aside>

          <section className={style.products}>
            <div className={`${style.grid}`}>
              <Product
                image={Product1}
                name="Vertical Striped Shirt"
                price={240}
                discount={20}
              />
              <Product
                image={Product5}
                name="Camisa Verde Listrada"
                price={212}
                discount={20}
              />
              <Product image={Product2} name="Camiseta Laranja" price={154} />
              <Product
                image={Product3}
                name="Short Jeans Azul"
                price={75}
                discount={50}
              />
              <Product
                image={Product4}
                name="Calça Jeans Preta"
                price={125.69}
              />
              <Product
                image={Product5}
                name="Camisa Verde Listrada"
                price={212}
                discount={20}
              />
              <Product
                image={Product2}
                name="Camiseta Laranja Courage"
                price={154}
              />
              <Product
                image={Product3}
                name="Short Jeans Azul"
                price={75}
                discount={50}
              />
              <Product
                image={Product4}
                name="Calça Jeans Preta"
                price={125.69}
              />
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
