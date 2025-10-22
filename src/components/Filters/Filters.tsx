import { Link } from "react-router-dom";
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
          <span>Calças</span>
        </label>
        <label className={style.chkLabel}>
          <input type="checkbox" />
          <span>Camisas</span>
        </label>
        <label className={style.chkLabel}>
          <input type="checkbox" />
          <span>Casacos</span>
        </label>

        <button className={style.moreButton}>MAIS</button>
      </div>
      {/* TAMANHOS */}
      <div className={style.filterGroup}>
        <h4>Tamanhos</h4>
        <div className={style.sizes}>
          <button className={style.sizeBtn}>P</button>
          <button className={style.sizeBtn}>M</button>
          <button className={style.sizeBtn}>G</button>
          <button className={style.sizeBtn}>GG</button>
        </div>

        <button className={style.moreButton}>MAIS</button>
      </div>
      {/* CORES */}
      <div className={style.filterGroup}>
        <h4>Cores</h4>
        <div className={style.colors}>
          <button className={style.color} style={{ backgroundColor: "#000" }} />
          <button
            className={style.color}
            style={{ backgroundColor: "#fff", border: "1px solid #ccc" }}
          />
          <button
            className={style.color}
            style={{ backgroundColor: "#e91e63" }}
          />
          <button
            className={style.color}
            style={{ backgroundColor: "#2196f3" }}
          />
          <button
            className={style.color}
            style={{ backgroundColor: "#4caf50" }}
          />
          <button
            className={style.color}
            style={{ backgroundColor: "#ff9800" }}
          />
        </div>
      </div>
      {/* PREÇO */}
      <div className={style.filterGroup}>
        <h4>Faixa de preço</h4>
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
          <span>R$201 a R$400</span>
        </label>
        <label className={style.chkLabel}>
          <input type="checkbox" />
          <span>Acima de R$400</span>
        </label>

        <button className={style.moreButton}>MAIS</button>
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
      <button className={style.clearButton}>Limpar filtros</button>
    </aside>
  );
}
