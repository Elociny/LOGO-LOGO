import { Button } from "../Button/Button";
import style from "./ResumeOrder.module.css";
import type { Product } from "../../types/Product";

interface ResumeOrderProps {
  produtos: Product[];
  ativo: boolean;
}

export function ResumeOrder({ produtos, ativo }: ResumeOrderProps) {
  const quantidadeTotal = produtos.reduce(
    (acc, p) => acc + (p.quantity ?? 1),
    0
  );
  const total = produtos.reduce(
    (acc, p) => acc + p.unitPrice * (p.quantity ?? 1),
    0
  );

  return (
    <div className={style.resume}>
      <h2>Resumo do pedido</h2>

      <div className={`row ${style.gap}`}>
        <p>Quantidade de itens</p>
        <p>{quantidadeTotal}</p>
      </div>

      <div className={`row ${style.gap}`}>
        <p>Total dos produtos</p>
        <p>
          <span>R$ </span>
          {total.toFixed(2).replace(".", ",")}
        </p>
      </div>

      <hr />

      <div className={`row ${style.gap} ${style.total}`}>
        <h3>Total</h3>
        <h3>
          <span>R$ </span>
          {total.toFixed(2).replace(".", ",")}
        </h3>
      </div>

      {ativo && produtos.length > 0 && (
        <Button
          border="quadrada"
          color="branco"
          navegation="/"
          size="big"
          text="comprar"
          theme="dark"
        />
      )}
    </div>
  );
}
