import { NavLink } from 'react-router-dom';
import styles from './CategoryRow.module.css';

import novidadesIcon from '../../assets/icons/novidades.svg';
import femininoIcon from '../../assets/icons/feminino.svg';
import masculinoIcon from '../../assets/icons/masculino.svg';
import infantilIcon from '../../assets/icons/infantil.svg';
import calcadosIcon from '../../assets/icons/calçados.svg';
import acessoriosIcon from '../../assets/icons/acessórios.svg';

const categories = [
  { slug: 'novidades', icon: novidadesIcon },
  { slug: 'feminino', icon: femininoIcon },
  { slug: 'masculino', icon: masculinoIcon },
  { slug: 'infantil', icon: infantilIcon },
  { slug: 'calcas', icon: calcadosIcon },
  { slug: 'acessorios', icon: acessoriosIcon },
];

export default function CategoryRow() {
  return (
    <div className={styles.container} aria-hidden="false">
      {categories.map((c, i) => (
        <NavLink
          key={c.slug}
          to={`/feminina?categoria=${c.slug}`}
          className={styles.item}
        >
          <div className={styles.iconWrap}>
            <img src={c.icon} alt={c.slug} className={styles.icon} />
          </div>
        </NavLink>
      ))}
    </div>
  );
}
