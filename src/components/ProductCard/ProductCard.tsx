import './ProductCard.css';
import blusaPreta from '../../assets/images/blusa-preta.png';
import { NavLink } from "react-router-dom"

type ProductCardProps = {
  id?: number | string;
  link?: string;
  title: string;
  price: number | string;
  oldPrice?: number | string;
  rating?: number | string;
  image?: string;
};

export default function ProductCard({ id, link, title, price, oldPrice, rating, image }: ProductCardProps) {
  return (
    <article className="product-card" role="listitem">
      <img className="product-image" src={image || blusaPreta} alt={title} />
      <div className="product-title">{title}</div>

      <div className="price-row">
        <div className="current-price">R$ {price}</div>
        {oldPrice && <div className="old-price">R$ {oldPrice}</div>}
      </div>

      <div style={{ marginTop: 8 }}>
        <span style={{ color: '#f5b942', fontWeight: 600 }}>{rating} ★</span>
      </div>

      <NavLink className="btn-veja" to={link || `/produto/${id || ''}`}>VEJA MAIS</NavLink>
    </article>
  );
}