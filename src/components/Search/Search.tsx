

import styles from './Search.module.css'

export function Search() {
    return(
        <div className={`${styles.input} row`}>
            <input type="text" placeholder='Digite sua pesquisa'/>
            <button><i className="bi bi-search"></i></button>
        </div>
    )
}