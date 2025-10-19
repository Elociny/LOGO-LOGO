import { Layout } from "../../components/Layout/Layout";
import ProductCard from "../../components/ProductCard/ProductCard";
import Filters from "../../components/Filters/Filters";
import CategoryRow from "../../components/CategoryRow/CategoryRow";
import "../../styles/feminina.css";
import { NavLink } from "react-router-dom";

import blusaPreta from "../../assets/images/blusa-preta.png";
import camisaLaranja from "../../assets/images/camisa-laranja-estampada.png";
import camisaSocial from "../../assets/images/camisa-social-verde-listrada.png";
import shortJeans from "../../assets/images/short-jeans.png";
import calcaPreta from "../../assets/images/calca-jeans-preta.png";

const produtosMock = [
  {
    id: 1,
    title: "Blusa preta sem manga",
    price: 212,
    oldPrice: 252,
    rating: 4.5,
    img: blusaPreta,
    category: "Blusas",
    categorySlug: "blusas",
  },
  {
    id: 2,
    title: "Camiseta Laranja",
    price: 150,
    oldPrice: 150,
    rating: 3.8,
    img: camisaLaranja,
    category: "Camisetas",
    categorySlug: "camisetas",
  },
  {
    id: 3,
    title: "Short Jeans Azul",
    price: 95,
    oldPrice: 95,
    rating: 4.9,
    img: shortJeans,
    category: "Shorts",
    categorySlug: "shorts",
  },
  {
    id: 4,
    title: "Calça Jeans Preta",
    price: 162,
    oldPrice: 162,
    rating: 4.2,
    img: calcaPreta,
    category: "Calças",
    categorySlug: "calcas",
  },
  //   { id: 5, title: 'Blusa Ombro Só', price: 198, oldPrice: 198, rating: 4.1, img: blusaOmbro, category: 'Blusas', categorySlug: 'blusas' },
  //   { id: 6, title: 'Camiseta Laranja', price: 20, oldPrice: 20, rating: 3.8, img: camisetaLaranja, category: 'Camisetas', categorySlug: 'camisetas' },
  //   { id: 7, title: 'Short Jeans Azul', price: 39, oldPrice: 39, rating: 4.9, img: shortJeansImg, category: 'Shorts', categorySlug: 'shorts' },
  //   { id: 8, title: 'Calça Jeans Preta', price: 205, oldPrice: 205, rating: 4.2, img: calcaPreta, category: 'Calças', categorySlug: 'calcas' },
  {
    id: 9,
    title: "Camisa Social Verde Listrada",
    price: 212,
    oldPrice: 252,
    rating: 4.5,
    img: camisaSocial,
    category: "Camisas",
    categorySlug: "camisas",
  },
];

export default function Feminina() {
  return (
    <Layout pageTitle="Feminina" className="feminina-page">
      <CategoryRow />

      <div className="feminina-content">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li>
              <NavLink to="/" className="breadcrumb-link">
                Início
              </NavLink>
            </li>
            <li aria-current="page">Feminino</li>
          </ol>
        </nav>

        <div className="row">
          <aside className="filters-column">
            <h3 className="section-title">Filtros</h3>
            <Filters />
          </aside>

          <section className="products-column column">
            <div className="products-grid" role="list">
              {produtosMock.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  price={p.price}
                  oldPrice={p.oldPrice}
                  rating={p.rating}
                  image={p.img}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
