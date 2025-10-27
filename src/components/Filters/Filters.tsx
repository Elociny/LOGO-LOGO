import { Link } from "react-router";
import { Button } from "../Button/Button"; 
import style from "./Filters.module.css";
import FilterIcon from "../../assets/images/icons/Vector.svg";

export function Filters() {
  return (
    <aside className={style.filters}>
      {/* Breadcrumb */}
      <div className={style.breadcrumb}>
        <Link to="/" className={style.link}>
          Início
        </Link>
        <span className={style.arrow}>›</span>
        <span className={style.current}>Feminino</span>
      </div>

      <div className={style.title}>
        <h3>Filtros</h3>
        <img src={FilterIcon} alt="Filtro" className={style.icon} />
      </div>

      <div className={style.line}></div>

      {/* CATEGORIAS */}
      <div className={style.filterGroup}>
        <h4>Categorias</h4>
        <label className={style.chkLabel}>
          <input type="checkbox" defaultChecked />
          <span>Vestidos</span>
        </label>
        <label className={style.chkLabel}>
          <input type="checkbox" defaultChecked />
          <span>Saias</span>
        </label>
        <label className={style.chkLabel}>
          <input type="checkbox" />
          <span>Jeans</span>
        </label>


        <Button
          theme="light"
          border="arredondada"
          color="branco"
          size="small"
          text="MAIS"
           className={style.add} 
        />
      </div>

      {/* PREÇO */}
      <div className={style.filterGroup}>
        <h4>Preços</h4>
        <label className={style.chkLabel}>
          <input type="checkbox" />
          <span>Até R$100</span>
        </label>
        <label className={style.chkLabel}>
          <input type="checkbox" />
          <span>R$101 a R$200</span>
        </label>
        <label className={style.chkLabel}>
          <input type="checkbox" />
          <span>Acima de R$200</span>
        </label>

        <Button
          theme="light"
          border="arredondada"
          color="branco"
          size="small"
          text="MAIS"
           className={style.add} 
        />
      </div>

      {/* CATEGORIAS */}
      <div className={style.filterGroup}>
        <h4>Marcas</h4>
        <label className={style.chkLabel}>
          <input type="checkbox" defaultChecked />
          <span>Hering</span>
        </label>
        <label className={style.chkLabel}>
          <input type="checkbox" defaultChecked />
          <span>Colcci</span>
        </label>
        <label className={style.chkLabel}>
          <input type="checkbox" />
          <span>Nike</span>
        </label>

        <Button
          theme="light"
          border="arredondada"
          color="branco"
          size="small"
          text="MAIS"
           className={style.add} 
        />
      </div>

      {/* TAMANHOS */}
      <div className={style.filterGroup}>
        <h4>Tamanhos</h4>
        <label className={style.chkLabel}>
          <input type="checkbox" defaultChecked />
          <span>P - Pequeno</span>
        </label>
        <label className={style.chkLabel}>
          <input type="checkbox" defaultChecked />
          <span>M - Médio</span>
        </label>
        <label className={style.chkLabel}>
          <input type="checkbox" />
          <span>G - Grande</span>
        </label>

        <Button
          theme="light"
          border="arredondada"
          color="branco"
          size="small"
          text="MAIS"
          className={style.add} 
        />
      </div>

      {/* AVALIAÇÃO */}
      <div className={style.filterGroup}>
        <h4>Avaliação</h4>

        <div className={style.ratingRow}>
          <div className={style.stars}>
            <i className="bi bi-star-fill" />
            <i className="bi bi-star-fill" />
            <i className="bi bi-star-fill" />
            <i className="bi bi-star-fill" />
            <i className="bi bi-star-fill" />
          </div>
          <p className={style.ratingText}>
            <strong>5.0</strong>/5
          </p>
        </div>

        <div className={style.ratingRow}>
          <div className={style.stars}>
            <i className="bi bi-star-fill" />
            <i className="bi bi-star-fill" />
            <i className="bi bi-star-fill" />
            <i className="bi bi-star-fill" />
          </div>
          <p className={style.ratingText}>
            <strong>4.0</strong>/5
          </p>
        </div>

        <div className={style.ratingRow}>
          <div className={style.stars}>
            <i className="bi bi-star-fill" />
            <i className="bi bi-star-fill" />
            <i className="bi bi-star-fill" />
          </div>
          <p className={style.ratingText}>
            <strong>3.0</strong>/5
          </p>
        </div>

        <div className={style.ratingRow}>
          <div className={style.stars}>
            <i className="bi bi-star-fill" />
            <i className="bi bi-star-fill" />
          </div>
          <p className={style.ratingText}>
            <strong>2.0</strong>/5
          </p>
        </div>

        <div className={style.ratingRow}>
          <div className={style.stars}>
            <i className="bi bi-star-fill" />
          </div>
          <p className={style.ratingText}>
            <strong>1.0</strong>/5
          </p>
        </div>
      </div>

      {/* Botão Limpar Filtros */}
      <Button
        theme="light"
        border="arredondada"
        color="laranja"
        size="small"
        text="Limpar"
      />
    </aside>
  );
}
