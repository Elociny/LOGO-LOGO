import type { ChangeEvent } from "react"
import style from "./Input.module.css"

interface InputProps {
    id: string
    label: string
    type: "text" | "password" | "number"
    placeholder?: string
    enable?: boolean
    value?: string | number
    onChange?: (valor: string | number) => void
}

export function Input({
    id,
    label,
    type,
    placeholder = "",
    enable = true,
    value,
    onChange
}: InputProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const valor = type === "number" ? Number(e.target.value) : e.target.value
        if (onChange) onChange(valor)
    }

    return (
        <div className={style.input}>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                disabled={!enable}
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}
