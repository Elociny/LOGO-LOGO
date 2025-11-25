import { Input } from "../Input/Input";
import style from "./PayMethod.module.css";

import PixIcon from "../../assets/images/icons/pixIcon.svg";
import QrCode from "../../assets/images/qrcode.svg"

export interface DadosCartao {
    titular: string;
    cpf: string;
    numero: string;
    codigoSeguranca: string;
    validadeMes: string;
    validadeAno: string;
}

interface PayMethodProps {
    metodo: "cartao" | "pix";
    onMetodoChange: (metodo: "cartao" | "pix") => void;
    dadosCartao: DadosCartao;
    onDadosCartaoChange: (campo: keyof DadosCartao, valor: string) => void;
    valorTotal: number;
}

export function PayMethod({ 
    metodo, 
    onMetodoChange, 
    dadosCartao, 
    onDadosCartaoChange,
    valorTotal 
}: PayMethodProps) {

    return (
        <div className={style.payMethod}>

            <div className={`row ${style.pagamento}`}>
                <label className={`${style.card} ${metodo === "cartao" ? style.selecionado : ""}`}>
                    <input
                        type="radio"
                        name="metodo"
                        value="cartao"
                        checked={metodo === "cartao"}
                        onChange={() => onMetodoChange("cartao")}
                        className={style.radio}
                    />
                    <i className="bi bi-credit-card-2-front"></i>
                    <h3>Cartão de crédito</h3>
                </label>

                <label className={`${style.card} ${metodo === "pix" ? style.selecionado : ""}`}>
                    <input
                        type="radio"
                        name="metodo"
                        value="pix"
                        checked={metodo === "pix"}
                        onChange={() => onMetodoChange("pix")}
                        className={style.radio}
                    />
                    <img src={PixIcon} alt="Icone do PIX" />
                    <h3>PIX</h3>
                </label>
            </div>

            {metodo === "cartao" && (
                <div className={style.cartao}>
                    <Input
                        id="titular"
                        label="Nome do titular"
                        placeholder="Como está no cartão"
                        type="text"
                        value={dadosCartao.titular}
                        onChange={(val) => onDadosCartaoChange("titular", String(val))}
                    />

                    <Input
                        id="cpf"
                        label="CPF do titular"
                        placeholder="000.000.000-00"
                        type="text"
                        value={dadosCartao.cpf}
                        onChange={(val) => onDadosCartaoChange("cpf", String(val))}
                    />

                    <Input
                        id="numeroCartao"
                        label="Número do cartão"
                        placeholder="0000 0000 0000 0000"
                        type="text"
                        value={dadosCartao.numero}
                        onChange={(val) => onDadosCartaoChange("numero", String(val))}
                    />

                    <div className={`row ${style.dadosCartao}`}>
                        <div className={style.codigoSeguranca}>
                            <Input
                                id="codigoSeguranca"
                                label="CVV"
                                placeholder="123"
                                type="text"
                                value={dadosCartao.codigoSeguranca}
                                onChange={(val) => onDadosCartaoChange("codigoSeguranca", String(val))}
                            />
                        </div>

                        <div className={`row ${style.validade}`}>
                            <Input
                                id="validadeMes"
                                label="Validade"
                                placeholder="Mês"
                                type="number"
                                value={dadosCartao.validadeMes}
                                onChange={(val) => onDadosCartaoChange("validadeMes", String(val))}
                            />

                            <Input
                                id="validadeAno"
                                label=""
                                placeholder="Ano"
                                type="number"
                                value={dadosCartao.validadeAno}
                                onChange={(val) => onDadosCartaoChange("validadeAno", String(val))}
                            />
                        </div>
                    </div>
                </div>
            )}

            {metodo === "pix" && (
                <div className={`${style.pixBox}`}>
                    <img src={QrCode} alt="QrCode" />

                    <div className={`${style.texts}`}>
                        <h3>Escaneie o Qr Code com seu celular</h3>
                        <p>Abra o app do seu banco no celular, selecione pix e aponte a camera para o código.</p>
                        <p>Valor da compra: <b>R$ {valorTotal.toFixed(2).replace(".", ",")}</b></p>
                    </div>
                </div>
            )}
        </div>
    );
}