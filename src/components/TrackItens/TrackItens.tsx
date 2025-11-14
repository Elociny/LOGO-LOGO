import style from "./TrackItens.module.css"

interface TrackItensProps {
    image: string
    name: string
    size: string
    color: string
    quantity: number
    unitPrice: number
}

export function TrackItens({ image, name, size, color, quantity, unitPrice }: TrackItensProps) {
    const subtotal = unitPrice * quantity

    return (
        <div className={`row ${style.trackItens}`}>
            <div className={`row ${style.infos}`}>
                <img src={image} alt={`Imagem do produto ` + name} className={`${style.image}`} />

                <div className={`${style.infoProduct}`}>
                    <h3>{ name }</h3>
                    <p>Tamanho: <strong>{ size }</strong></p>
                    <p>Cor: <strong>{ color }</strong></p>
                    <p>Quantidade: <strong>{ quantity }</strong></p>
                    <p>Preço unitário: <strong>{ unitPrice.toFixed(2) }</strong></p>
                </div>
            </div>

            <p>Sub total: <strong>R$ { subtotal.toFixed(2) }</strong></p>
        </div>
    )
}