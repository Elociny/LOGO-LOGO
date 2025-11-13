import { Button } from "../../components/Button/Button"
import { Input } from "../../components/Input/Input"
import { Layout } from "../../components/Layout/Layout"

import style from "./AddAddress.module.css"

export function AddAddress() {
    return (
        <Layout>
            <div className={`${style.addAddress}`}>
                <h2>Novo endereço</h2>

                <div className={`${style.cadastro}`}>
                    <h3>Contato</h3>

                    <section className={`row ${style.inputs}`}>
                        <Input id="nome" label="Nome" type="text" placeholder="Digite seu nome completo" enable={true} />
                        <Input id="telefone" label="Telefone" type="text" placeholder="Digite seu telefone" enable={true} />
                    </section>

                    <h3>Endereço</h3>

                    <section className={`row ${style.inputs}`}>
                        <Input id="cep" label="CEP" type="text" placeholder="Digite o número do CEP" enable={true} />
                        <Input id="estado" label="Estado" type="text" placeholder="Digite seu estado" enable={true} />
                        <Input id="cidade" label="Cidade" type="text" placeholder="Digite sua cidade " enable={true} />
                    </section>

                    <section className={`row ${style.inputs}`}>
                        <Input id="logradouro" label="Rua" type="text" placeholder="Digite o nome da rua" enable={true} />
                        <div className={`${style.inputNumero}`}>
                            <Input id="numero" label="Número" type="number" placeholder="Número do endereço" enable={true} />
                        </div>
                    </section>

                    <section className={`row ${style.inputs}`}>
                        <Input id="bairro" label="Bairro" type="text" placeholder="Digite o bairro" enable={true} />
                        <Input id="complemento" label="Complemento" type="text" placeholder="Digite o complemento" enable={true} />
                    </section>
                </div>

                <Button border="quadrada" color="laranja" size="big" text="salvar endereço" theme="light" />
            </div>
        </Layout>
    )
}