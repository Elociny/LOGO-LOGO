import { useState } from "react"
import style from "./Counter.module.css"

interface CounterProps {
    inicio?: number,
    minimo?: number,
    maximo?: number,
    onChange?: (value: number ) => void
}

export function Counter({ inicio = 1, minimo = 1, maximo = 99, onChange }: CounterProps) {

    const [quantity, setQuantity] = useState(inicio)

    function increase() {
        if(quantity < maximo) {
            const newValue = quantity + 1
            setQuantity(newValue)
            onChange?.(newValue)
        }
    }

    function decrease() {
        if(quantity > minimo) {
            const newValue = quantity - 1
            setQuantity(newValue)
            onChange?.(newValue)
        }
    }

    return(
        <div className={`row ${style.counter}`}>
            <button onClick={decrease} className={`${style.button}`}>
                <i className="bi bi-dash"></i>
            </button>
            <p className={`row`}>{ quantity }</p>
            <button onClick={increase} className={`${style.button}`}>
                <i className="bi bi-plus"></i>
            </button>
        </div>
    )
}