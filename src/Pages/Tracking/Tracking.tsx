import { Button } from "../../components/Button/Button"
import { Layout } from "../../components/Layout/Layout"
import { TrackOrder } from "../../components/TrackOrder/TrackOrder"
import User from "../../components/User/User"
import style from "./Tracking.module.css"

import ProductImg1 from "../../assets/images/products/produto1.svg";
import ProductImg2 from "../../assets/images/products/produto2.svg";
import ProductImg3 from "../../assets/images/products/produto3.svg";

import FotoPerfil from "../../assets/images/foto-de-perfil.svg"


import { useState } from "react"

export function Tracking() {
    const [filtro, setFiltro] = useState<string>("mostrar todos")

    const cliente = {
        nome: "Nicole Lins Coelho",
        email: "nicole.lcoelho@logologo.com"
    }

    const pedidos = [
        {
            trackingCode: "BR123456789",
            status: "preparando",
            customerName: cliente.nome,
            customerPhone: "+55 (11) 9 7048-7095",
            address:
                "Rua Nicole Linda Perfeita Maravilhosa E Tudo De Bom No Universo, 53, Jardim Nicole Perfeita (Zona Linda), São Paulo/SP - 04852-012",
            items: [
                {
                    image: ProductImg3,
                    name: "Bermuda Jeans",
                    size: "M",
                    color: "Azul",
                    quantity: 2,
                    unitPrice: 90,
                },
                {
                    image: ProductImg1,
                    name: "Camiseta Oversized",
                    size: "G",
                    color: "Preta",
                    quantity: 1,
                    unitPrice: 120,
                },
            ],
        },
        {
            trackingCode: "BR987654321",
            status: "em rota de entrega",
            customerName: cliente.nome,
            customerPhone: "+55 (11) 9 7048-7095",
            address:
                "Av. das Desenvolvedoras Incríveis, 42, Jardim do Código, São Paulo/SP - 04855-020",
            items: [
                {
                    image: ProductImg2,
                    name: "Tênis Esportivo",
                    size: "38",
                    color: "Branco",
                    quantity: 1,
                    unitPrice: 280,
                },
                {
                    image: ProductImg3,
                    name: "Jaqueta Jeans",
                    size: "M",
                    color: "Azul Claro",
                    quantity: 1,
                    unitPrice: 200,
                },
            ],
        },
        {
            trackingCode: "BR1122334455",
            status: "entregue",
            customerName: cliente.nome,
            customerPhone: "+55 (11) 9 7048-7095",
            address:
                "Rua React Typescript, 15, Bairro Front-End Feliz, São Paulo/SP - 04856-090",
            items: [
                {
                    image: ProductImg1,
                    name: "Vestido Floral",
                    size: "P",
                    color: "Rosa",
                    quantity: 1,
                    unitPrice: 180,
                },
                {
                    image: ProductImg2,
                    name: "Sandália Couro",
                    size: "37",
                    color: "Bege",
                    quantity: 2,
                    unitPrice: 150,
                },
            ],
        },
    ]

    const pedidosFiltrados = filtro === "mostrar todos" ? pedidos : pedidos.filter((p) => p.status === filtro)

    return (
        <Layout theme="light">
            <div className={`row ${style.tracking}`}>
                <div className={`${style.left}`}>
                    <User nome={cliente.nome} email={cliente.email} foto={FotoPerfil} theme="light" />
                    <hr className={`${style.cinza}`} />
                    <Button
                        border="arredondada"
                        color={ filtro === "preparando" ? "cinza" : "transparente" }
                        size="big"
                        text="preparando"
                        theme="light"
                        onClick={() => setFiltro("preparando")}
                    />
                    <Button
                        border="arredondada"
                        color={ filtro === "em rota de entrega" ? "cinza" : "transparente" }
                        size="big"
                        text="a caminho"
                        theme="light"
                        onClick={() => setFiltro("em rota de entrega")}
                    />
                    <Button
                        border="arredondada"
                        color={ filtro === "entregue" ? "cinza" : "transparente" }
                        size="big"
                        text="finalizado"
                        theme="light"
                        onClick={() => setFiltro("entregue")}
                    />
                    <Button
                        border="arredondada"
                        color={ filtro === "mostrar todos" ? "cinza" : "transparente" }
                        size="big"
                        text="mostrar todos"
                        theme="light"
                        onClick={() => setFiltro("mostrar todos")}
                    />
                </div>
                <div className={`${style.right}`}>
                    <h2>Meus pedidos</h2>

                    <div className={`${style.pedidos}`}>
                        {pedidosFiltrados.map((pedido, index) => {

                            return(
                                <TrackOrder
                                    key={index}
                                    {...pedido}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}