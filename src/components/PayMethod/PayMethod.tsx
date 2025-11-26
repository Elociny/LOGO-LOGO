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

    const handleNumeroChange = (valor: string | number) => {
        const v = String(valor).replace(/\D/g, "");
        
        const mascarado = v.replace(/(\d{4})(?=\d)/g, "$1 "); 
        
        onDadosCartaoChange("numero", mascarado.slice(0, 19));
    };

    const handleCpfChange = (valor: string | number) => {
        let v = String(valor).replace(/\D/g, "");
        if (v.length > 11) v = v.slice(0, 11);
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        onDadosCartaoChange("cpf", v);
    };

    const handleLimitado = (campo: keyof DadosCartao, valor: string | number, limite: number) => {
        const v = String(valor).replace(/\D/g, "").slice(0, limite);
        onDadosCartaoChange(campo, v);
    };

    const handleNomeChange = (valor: string | number) => {
        const v = String(valor).replace(/[^a-zA-Z\s]/g, "").toUpperCase();
        onDadosCartaoChange("titular", v);
    }

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
                        placeholder="COMO NO CARTÃO"
                        type="text"
                        value={dadosCartao.titular}
                        onChange={(val) => handleNomeChange(val)}
                    />

                    <Input
                        id="cpf"
                        label="CPF do titular"
                        placeholder="000.000.000-00"
                        type="text"
                        value={dadosCartao.cpf}
                        onChange={(val) => handleCpfChange(val)}
                    />

                    <Input
                        id="numeroCartao"
                        label="Número do cartão"
                        placeholder="0000 0000 0000 0000"
                        type="text"
                        value={dadosCartao.numero}
                        onChange={(val) => handleNumeroChange(val)}
                    />

                    <div className={`row ${style.dadosCartao}`}>
                        <div className={style.codigoSeguranca}>
                            <Input
                                id="codigoSeguranca"
                                label="CVV"
                                placeholder="123"
                                type="text"
                                value={dadosCartao.codigoSeguranca}
                                onChange={(val) => handleLimitado("codigoSeguranca", val, 4)}
                            />
                        </div>

                        <div className={`row ${style.validade}`}>
                            <Input
                                id="validadeMes"
                                label="Validade"
                                placeholder="MM"
                                type="text"
                                value={dadosCartao.validadeMes}
                                onChange={(val) => handleLimitado("validadeMes", val, 2)}
                            />

                            <Input
                                id="validadeAno"
                                label=""
                                placeholder="AAAA"
                                type="text"
                                value={dadosCartao.validadeAno}
                                onChange={(val) => handleLimitado("validadeAno", val, 4)}
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