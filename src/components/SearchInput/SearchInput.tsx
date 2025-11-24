import { useState, type KeyboardEvent } from 'react'
import styles from './SearchInput.module.css'
import { useNavigate } from 'react-router'

export function SearchInput() {
    const [termo, setTermo] = useState("")
    const navigate = useNavigate()

    function handleSearch() {
        if (termo.trim()) {
            navigate(`/busca?q=${encodeURIComponent(termo)}`)
            setTermo("")
        }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <div className={`${styles.input} row`}>
            <input
                type="text"
                placeholder='Buscar na LOGOLOGO'
                value={termo}
                onChange={(e) => setTermo(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}><i className="bi bi-search"></i></button>
        </div>
    )
}
