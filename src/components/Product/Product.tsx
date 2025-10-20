import { Button } from "../Button/Button";
import style from "./Product.module.css";

interface ProductProps {
  image: string;
  name: string;
  price: number;
  discount?: number;
}

export function Product({ image, name, price, discount }: ProductProps) {
  const discountedPrice = discount ? price - (price * discount) / 100 : price;

  return (
    <div className={`${style.product}`}>
      <img src={image} alt={`Imagem do produto ${name}`} />
      <h3>{name}</h3>

      <div className={`${style.avaliacao}`}>
        <div className={`row ${style.stars}`}>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
        </div>
        <p>5.0/<span>5</span></p>
      </div>

      <div className={`${style.preco}`}>
        <p>R$ {discountedPrice.toFixed(2)}</p>
        {discount && (
          <>
            <p className={`${style.oldPrice}`}>R$ {price.toFixed(2)}</p>
            <span className={`${style.discount}`}>-{discount}%</span>
          </>
        )}
      </div>

      <Button
        theme="light"
        border="arredondada"
        color="laranja"
        size="small"
        text="comprar"
      />
    </div>
  );
}
