import style from "./Category.module.css";

interface CategoryProps {
  icon: string;
  titulo: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export function Category({ icon, titulo, onClick, isSelected }: CategoryProps) {
  return (
    <div
      className={`${style.category} ${isSelected ? style.selected : ""}`}
      onClick={onClick}
    >
      <div className={style.box}>
        <img className={style.icon} src={icon} alt={`categoria ${titulo}`} />
      </div>
      <h3>{titulo}</h3>
    </div>
  );
}
