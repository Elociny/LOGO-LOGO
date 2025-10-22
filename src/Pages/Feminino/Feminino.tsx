import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Product } from "../../components/Product/Product";
import { Category } from "../../components/Category/Category";
import { Filters } from "../../components/Filters/Filters"; // 👈 import do novo componente
import style from "./Feminino.module.css";

import Lightning from "../../assets/images/icons/lightning.svg";
import Dress from "../../assets/images/icons/dress.svg";
import Shirt from "../../assets/images/icons/shirt.svg";
import Bear from "../../assets/images/icons/bear.svg";
import Shoe from "../../assets/images/icons/shoe.svg";
import Necklace from "../../assets/images/icons/necklace.svg";

import Product1 from "../../assets/images/products/produto1.svg";
import Product2 from "../../assets/images/products/produto2.svg";
import Product3 from "../../assets/images/products/produto3.svg";
import Product4 from "../../assets/images/products/produto4.svg";
import Product5 from "../../assets/images/products/produto5.svg";

export function Feminino() {
  return (
    <div className={style.container}>
      <Header />

      {/* CATEGORIAS */}
      <section className={style.categories}>
        <Category icon={Lightning} titulo="Novidades" />
        <Category icon={Dress} titulo="Feminino" />
        <Category icon={Shirt} titulo="Masculino" />
        <Category icon={Bear} titulo="Infantil" />
        <Category icon={Shoe} titulo="Calçados" />
        <Category icon={Necklace} titulo="Acessórios" />
      </section>

     
      <main className={style.main}>
        
        <Filters /> 

       
        <section className={style.products}>

          <div className={style.grid}>
            <Product image={Product1} name="Vertical Striped Shirt" price={212} discount={20} />
            <Product image={Product5} name="Camisa Verde Listrada" price={212} discount={20} />
            <Product image={Product2} name="Camiseta Laranja Courage" price={154} />
            <Product image={Product3} name="Short Jeans Azul" price={75} discount={50} />
            <Product image={Product4} name="Calça Jeans Preta" price={125.69} />
            <Product image={Product5} name="Camisa Verde Listrada" price={212} discount={20} />
            <Product image={Product2} name="Camiseta Laranja Courage" price={154} />
            <Product image={Product3} name="Short Jeans Azul" price={75} discount={50} />
            <Product image={Product4} name="Calça Jeans Preta" price={125.69} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
