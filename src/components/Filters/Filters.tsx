import "./Filters.css";
import { NavLink } from "react-router-dom";

function buildQuery(path: string, params: Record<string, string>) {
  const url = new URL(path, "http://local");
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.pathname + url.search;
}

export default function Filters() {
  return (
    <div>
      {/* ----- CATEGORIAS ----- */}
      <div className="filter-group">
        <h4>Categorias</h4>

        <label className="checkbox-category">
          <input type="checkbox" />
          <span className="checkbox-icon"></span>
          <NavLink
            className="checkbox-text"
            to={buildQuery("/feminina", { categoria: "blusas" })}
          >
            Vestidos
          </NavLink>
        </label>

        <label className="checkbox-category">
          <input type="checkbox" />
          <span className="checkbox-icon"></span>
          <NavLink
            className="checkbox-text"
            to={buildQuery("/feminina", { categoria: "camisetas" })}
          >
            Saias
          </NavLink>
        </label>

        <label className="checkbox-category">
          <input type="checkbox" />
          <span className="checkbox-icon"></span>
          <NavLink
            className="checkbox-text"
            to={buildQuery("/feminina", { categoria: "shorts" })}
          >
            Jeans
          </NavLink>
        </label>


        <button className="btn-mais">MAIS</button>
      </div>

      <div className="filter-group">
        <h4>Preços</h4>

        <label className="checkbox-category">
          <input type="checkbox"/>
          <span className="checkbox-icon"></span>
          <span className="checkbox-text">Até R$ 100</span>
          
        </label>

        <label className="checkbox-category">
          <input type="checkbox"/>
          <span className="checkbox-icon"></span>
          <span className="checkbox-text">R$ 101 à R$ 200</span>
          
        </label>
        <label className="checkbox-category">
          <input type="checkbox" />
          <span className="checkbox-icon"></span>
          <span className="checkbox-text">Acima de R$ 200</span>
          
        </label>

        <button className="btn-mais">MAIS</button>
      </div>

      {/* ----- MARCAS ----- */}
      <div className="filter-group">
        <h4>Marcas</h4>

        <label className="checkbox-category">
          <input type="checkbox" />
          <span className="checkbox-icon"></span>
          <span className="checkbox-text">Hering</span>
        </label>

        <label className="checkbox-category">
          <input type="checkbox" />
          <span className="checkbox-icon"></span>
          <span className="checkbox-text">Colcci</span>
        </label>

        <label className="checkbox-category">
          <input type="checkbox" />
          <span className="checkbox-icon"></span>
          <span className="checkbox-text">Nike</span>
        </label>

        <button className="btn-mais">MAIS</button>
      </div>

      {/* ----- TAMANHO ----- */}
      <div className="filter-group">
        <h4>Tamanho</h4>

        <label className="checkbox-category">
          <input type="checkbox" />
          <span className="checkbox-icon"></span>
          <span className="checkbox-text">P</span>
        </label>

        <label className="checkbox-category">
          <input type="checkbox" />
          <span className="checkbox-icon"></span>
          <span className="checkbox-text">M</span>
        </label>

        <label className="checkbox-category">
          <input type="checkbox" />
          <span className="checkbox-icon"></span>
          <span className="checkbox-text">G</span>
        </label>
      </div>

      <button className="btn-mais">MAIS</button>
    </div>
  );
}
