import { Category } from "../Category/Category";
import style from "./Categories.module.css";

import Lightning from "../../assets/images/icons/lightning.svg";
import Dress from "../../assets/images/icons/dress.svg";
import Shirt from "../../assets/images/icons/shirt.svg";
import Bear from "../../assets/images/icons/bear.svg";
import Shoe from "../../assets/images/icons/shoe.svg";
import Necklace from "../../assets/images/icons/necklace.svg";

import { useNavigate } from "react-router-dom";

interface CategoriesProps {
  highlightCategoria?: string;
}

function slugify(text: string) {
  return text
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();
}

export function Categories({ highlightCategoria }: CategoriesProps) {
  const navigate = useNavigate();

  const categories = [
    { titulo: "Novidades", icon: Lightning },
    { titulo: "Feminino", icon: Dress },
    { titulo: "Masculino", icon: Shirt },
    { titulo: "Infantil", icon: Bear },
    { titulo: "Calçados", icon: Shoe },
    { titulo: "Acessórios", icon: Necklace },
  ];

  return (
    <div className={`row ${style.categories}`}>
      {categories.map(cat => (
        <Category
          key={cat.titulo}
          icon={cat.icon}
          titulo={cat.titulo}
          onClick={() => navigate(`/listagem-de-produtos/${slugify(cat.titulo)}`)}
          isSelected={highlightCategoria === cat.titulo.toUpperCase()}
        />
      ))}
    </div>
  );
}
