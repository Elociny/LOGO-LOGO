import styles from './Input.module.css'

export function Input() {
    return(
        <div className={`${styles.input} row`}>
            <input type="text" placeholder='Buscar na LOGOLOGO'/>
            <button><i className="bi bi-search"></i></button>
        </div>
    )
}