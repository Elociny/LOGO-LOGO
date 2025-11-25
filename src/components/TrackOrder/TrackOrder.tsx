import { useState } from "react"
import { Button } from "../Button/Button"
import { TrackItens } from "../TrackItens/TrackItens"
import style from "./TrackOrder.module.css"

type TrackItensData = {
    image: string
    name: string
    size: string
    color: string
    quantity: number
    unitPrice: number
}

interface TrackOrderProps {
    trackingCode: string
    status: string
    customerName: string
    customerPhone: string
    address: string
    items: TrackItensData[]
    transportUrl?: string
}

export function TrackOrder({
    trackingCode,
    status,
    customerName,
    customerPhone,
    address,
    items,
    transportUrl = "/"
}: TrackOrderProps) {
    const [copied, setCopied] = useState(false)

    const total = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

    const handleCopy = () => {
        navigator.clipboard.writeText(trackingCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 4000)
    }

    return (
        <div className={`${style.track}`}>
            <header>
                <div className={`row ${style.left}`}>
                    <h4>código de rastreio:</h4>
                    <span className={`row ${style.copy}`} onClick={handleCopy} title="Copiar código">
                        {copied ? (
                            <>
                                <i className="bi bi-check2"></i>
                                Copiado
                            </>
                        ) : (
                            <>
                                <i className="bi bi-copy"></i>
                                {trackingCode}
                            </>
                        )}
                    </span>
                </div>

                <p className={`${style.status}`}>{status}</p>
            </header>

            <hr className={`${style.dashed}`} />

            <section className={`${style.address}`}>
                <div className={`row ${style.left}`}>
                    <i className="bi bi-geo-alt-fill"></i>
                    <h4>Endereço de entrega</h4>
                </div>

                <div className={`${style.endereco}`}>
                    <div className={`row ${style.left}`}>
                        <p>{customerName}</p>
                        <p>{customerPhone}</p>
                    </div>

                    <p className={`${style.nome}`}>{address}</p>
                </div>
            </section>

            <section className={`${style.itens}`}>
                <h3>Itens pedidos</h3>

                {items.map((item, index) => (
                    <TrackItens
                        key={index}

                        {...item}
                    />
                ))}

                <p>O rastreamento da sua entrega é feito por uma transportadora tercerizada. Clique no botão abaixo para acompanhar em tempo real diretamente no site da transportadora.</p>
            </section>

            <hr className={`${style.line}`} />

            <div className={`row ${style.total}`}>
                <h3>total do pedido: <span>R$ {total.toFixed(2)}</span></h3>

                <Button border="arredondada" color="cinza" navegation={transportUrl} size="big" text="acompanhar pedido" theme="light" />
            </div>
        </div>
    )
}