import style from "./Error.module.css";
import EmptyCartImg from "../../assets/images/empty-cart.svg";

interface ErrorProps {
  type?: "error" | "empty";
}

export function Error({ type = "error" }: ErrorProps) {
  const message = type === "empty"
    ? "Nenhum produto encontrado."
    : "Pode ser um problema temporário. Atualize a página ou tente novamente mais tarde.";

  const title = type === "empty"
    ? "Ops… não encontramos nada"
    : "Hmmm… isso não era pra acontecer";

  return (
    <div className={style.error}>
      <img src={EmptyCartImg} alt={title} />
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
