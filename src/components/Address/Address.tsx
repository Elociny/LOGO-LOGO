import style from "./Address.module.css"

interface EnderecoProps {
    nome: string
    telefone: string
    logradouro: string
    numero: number
    bairro: string
    cidade: string
    estado: string
    cep: string
    complemento?: string
}

export function Address({ nome, telefone, logradouro, numero, bairro, cidade, estado, cep, complemento }: EnderecoProps) {
    return (
        <div className={`${style.address}`}>
            <div className={`row ${style.userInfos}`}>
                <p>{nome}</p>
                <p>{telefone}</p>
            </div>

            <p className={`${style.endereco}`}>{logradouro}, {numero}{complemento && `, ${complemento}`}, {bairro}, {cidade} - {estado}, {cep}</p>
        </div>
    )
}