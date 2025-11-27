import { useState } from "react";
import { Input } from "../Input/Input";
import style from "./PayMethod.module.css";

import PixIcon from "../../assets/images/icons/pixIcon.svg";
import QrCode from "../../assets/images/qrcode.svg";

import type { CartaoResponseDTO } from "../../services/cartaoService";

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

    cartoesSalvos?: CartaoResponseDTO[];
    onSelecionarCartaoSalvo?: (idCartao: number | null) => void;
}

export function PayMethod({ 
    metodo, 
    onMetodoChange, 
    dadosCartao, 
    onDadosCartaoChange,
    valorTotal,
    cartoesSalvos = [],
    onSelecionarCartaoSalvo
}: PayMethodProps) {

    const [cartaoSelecionadoId, setCartaoSelecionadoId] = useState<number | null>(null);

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

    const selecionarCartao = (cartao: CartaoResponseDTO) => {
        setCartaoSelecionadoId(cartao.id);

        onDadosCartaoChange("titular", cartao.nomeTitular);
        onDadosCartaoChange("numero", cartao.numeroMascarado);
        
        if (cartao.validade.includes("/")) {
            const [mes, ano] = cartao.validade.split("/");
            onDadosCartaoChange("validadeMes", mes);
            onDadosCartaoChange("validadeAno", ano);
        }

        onDadosCartaoChange("codigoSeguranca", "");

        if (onSelecionarCartaoSalvo) onSelecionarCartaoSalvo(cartao.id);
    };

    const usarNovoCartao = () => {
        setCartaoSelecionadoId(null);
        onDadosCartaoChange("titular", "");
        onDadosCartaoChange("numero", "");
        onDadosCartaoChange("validadeMes", "");
        onDadosCartaoChange("validadeAno", "");
        onDadosCartaoChange("codigoSeguranca", "");
        
        if (onSelecionarCartaoSalvo) onSelecionarCartaoSalvo(null);
    };

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
                <div className={style.cartaoContainer}>
                    
                    {cartoesSalvos.length > 0 && (
                        <div className={style.savedCardsArea}>
                            <h3>Meus cartões salvos:</h3>
                            <div className={style.cardsList}>
                                {cartoesSalvos.map((card) => (
                                    <div 
                                        key={card.id} 
                                        className={`${style.savedCardItem} ${cartaoSelecionadoId === card.id ? style.cardActive : ''}`}
                                        onClick={() => selecionarCartao(card)}
                                    >
                                        <div className={style.cardIcon}>
                                            <i className="bi bi-credit-card-fill"></i>
                                        </div>
                                        <div className={style.cardInfo}>
                                            <span className={style.cardBrand}>{card.bandeira}</span>
                                            <span className={style.cardNumber}>{card.numeroMascarado}</span>
                                        </div>
                                    </div>
                                ))}

                                <div 
                                    className={`${style.savedCardItem} ${cartaoSelecionadoId === null ? style.cardActive : ''}`}
                                    onClick={usarNovoCartao}
                                >
                                    <div className={style.cardIcon}>
                                        <i className="bi bi-plus-lg"></i>
                                    </div>
                                    <div className={style.cardInfo}>
                                        <span className={style.cardBrand}>Novo Cartão</span>
                                        <span className={style.cardNumber}>Digitar dados</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={style.cartaoForm}>
                        <Input
                            id="titular"
                            label="Nome do titular"
                            placeholder="COMO NO CARTÃO"
                            type="text"
                            value={dadosCartao.titular}
                            onChange={(val) => handleNomeChange(val)}
                            enable={cartaoSelecionadoId === null} 
                        />

                        <Input
                            id="cpf"
                            label="CPF do titular"
                            placeholder="000.000.000-00"
                            type="text"
                            value={dadosCartao.cpf}
                            onChange={(val) => handleCpfChange(val)}
                            enable={true} 
                        />

                        <Input
                            id="numeroCartao"
                            label="Número do cartão"
                            placeholder="0000 0000 0000 0000"
                            type="text"
                            value={dadosCartao.numero}
                            onChange={(val) => handleNumeroChange(val)}
                            enable={cartaoSelecionadoId === null}
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
                                    enable={true} 
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
                                    enable={cartaoSelecionadoId === null}
                                />

                                <Input
                                    id="validadeAno"
                                    label=""
                                    placeholder="AAAA"
                                    type="text"
                                    value={dadosCartao.validadeAno}
                                    onChange={(val) => handleLimitado("validadeAno", val, 4)}
                                    enable={cartaoSelecionadoId === null}
                                />
                            </div>
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