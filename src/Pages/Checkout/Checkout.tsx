import { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import style from "./Checkout.module.css";


import ProductImg1 from "../../assets/images/products/produto1.svg";
import ProductImg2 from "../../assets/images/products/produto2.svg";
import ProductImg3 from "../../assets/images/products/produto3.svg";
import QrCodeImg from "../../assets/images/icons/QrCodeImg.svg";

interface CartItem {
  id: number;
  image: string;
  name: string;
  unitPrice: number;
  size: string;
  color: string;
  quantity: number;
}

type ModalType = 'none' | 'remove_confirm' | 'coupon_success' | 'coupon_error';

export function Checkout() {

  const [items, setItems] = useState<CartItem[]>([
    { id: 1, image: ProductImg1, name: "Blusa de ombro único", unitPrice: 150.0, size: "P", color: "#000", quantity: 1 },
    { id: 2, image: ProductImg2, name: "Camisa Listrada", unitPrice: 150.0, size: "M", color: "#695751", quantity: 1 },
    { id: 3, image: ProductImg3, name: "Camiseta laranja", unitPrice: 150.0, size: "M", color: "#D96E32", quantity: 1 },
  ]);

  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'pix'>('credit');
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const [timeLeft, setTimeLeft] = useState(600); 

  useEffect(() => {

    if (paymentMethod === 'pix' && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [paymentMethod, timeLeft]);


  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };


  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);


  const [orderFinished, setOrderFinished] = useState(false);


  const subtotal = items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const shipping = 10.00;
  const tax = 10.00;
  const total = subtotal + shipping + tax - discount;


  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "PRIMEIRA10") {
      setDiscount(10.00);
      setActiveModal('coupon_success');
    } else {
      setDiscount(0);
      setActiveModal('coupon_error');
    }
  };

  const requestRemoveItem = (id: number) => {
    setItemToRemove(id);
    setActiveModal('remove_confirm');
  };

  const confirmRemoveItem = () => {
    if (itemToRemove !== null) {
      setItems(items.filter(item => item.id !== itemToRemove));
      setItemToRemove(null);
      if (items.length <= 1) setDiscount(0);
    }
    setActiveModal('none');
  };

  const handleFinishOrder = () => {
    setOrderFinished(true);
    window.scrollTo(0, 0);
  };

  if (orderFinished) {
    return (
      <div className={style.pageContainer}>
        <Header />
        <main className={style.main}>
          <div className={style.successPage}>
            <div className={style.successIcon}>
                <i className="bi bi-check-circle"></i>
            </div>
            <h1>Pagamento concluído</h1>
            <h3>O seu pedido está sendo processado</h3>
            <p>Você receberá um link no email para rastreio</p>

            <div className={`${style.summaryDark} ${style.sectionCard}`} style={{marginTop: '2rem', width: '100%', maxWidth: '600px'}}>
                <h2 className={style.summaryTitle} style={{borderBottom: '1px solid #444', paddingBottom: '1rem'}}>RESUMO DO PEDIDO</h2>
                <div className={style.summaryRow}>
                  <span>Quantidade de itens</span>
                  <span>{items.length}</span>
                </div>
                <div className={style.summaryRow}>
                  <span>Total dos produtos</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                    <div className={style.summaryRow}>
                    <span>Cupom</span>
                    <span style={{color: '#28a745'}}>- R$ {discount.toFixed(2)}</span>
                    </div>
                )}
                 <div className={style.summaryRow}>
                  <span>Taxas</span>
                  <span>R$ {tax.toFixed(2)}</span>
                </div>
                 <div className={style.summaryRow}>
                  <span>Frete</span>
                  <span>R$ {shipping.toFixed(2)}</span>
                </div>
                <div className={style.summaryTotal}>
                  <span>Total:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
            </div>

            <button className={style.backBtn} onClick={() => window.location.href = "/"}>VOLTAR</button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={style.pageContainer}>
      <Header />

      <main className={style.main}>

        {activeModal !== 'none' && (
          <div className={style.modalOverlay}>
            <div className={style.modalContent}>
              
              {activeModal === 'remove_confirm' && (
                <>
                  <div className={`${style.modalIcon} ${style.iconInfo}`}>
                    <i className="bi bi-info-lg"></i>
                  </div>
                  <h3 className={style.modalTitle}>Remover produto?</h3>
                  <p className={style.modalText}>Você está prestes a retirar este produto da sua compra. Deseja continuar?</p>
                  <div className={style.modalButtons}>
                    <button className={style.btnCancel} onClick={() => setActiveModal('none')}>CANCELAR</button>
                    <button className={style.btnConfirm} onClick={confirmRemoveItem}>REMOVER</button>
                  </div>
                </>
              )}


              {activeModal === 'coupon_error' && (
                <>
                  <div className={`${style.modalIcon} ${style.iconError}`}>
                    <i className="bi bi-exclamation-lg"></i>
                  </div>
                  <h3 className={style.modalTitle}>Cupom inválido ou expirado!</h3>
                  <p className={style.modalText}>Infelizmente o cupom inserido não existe ou período de validade deste cupom já terminou.</p>
                  <button className={style.btnClose} onClick={() => setActiveModal('none')}>FECHAR</button>
                </>
              )}

              {activeModal === 'coupon_success' && (
                <>
                  <div className={`${style.modalIcon} ${style.iconSuccess}`}>
                    <i className="bi bi-check-lg"></i>
                  </div>
                  <h3 className={style.modalTitle}>Cupom adicionado!</h3>
                  <p className={style.modalText}>O desconto foi adicionado ao total da sua compra.</p>
                  <button className={style.btnClose} onClick={() => setActiveModal('none')}>FECHAR</button>
                </>
              )}

            </div>
          </div>
        )}

        <div className={style.checkoutLayout}>       

          <div className={style.leftColumn}>
            
            <div className={style.sectionCard}>
                <div className={style.sectionHeader}>
                    <div className={style.sectionTitle}>
                        <i className="bi bi-geo-alt-fill"></i> ENDEREÇO DE ENTREGA
                    </div>
                    <button className={style.editButton}>EDITAR DADOS</button>
                </div>
                <div className={style.addressText}>
                    <p className={style.addressName}>CLIENTE FULANO DA SILVA &nbsp; +55 (11) 9 7048-7095</p>
                    <p>Rua das Saudades, 53, Jardim Imaginário, São Paulo/SP - Brasil - 04852-012</p>
                </div>
            </div>

            <div>
                <div className={style.productHeader}>
                    <div style={{textAlign: 'left', paddingLeft:'1rem'}}>Produto</div>
                    <div>Preço</div>
                    <div>Quantidade</div>
                    <div>Total</div>
                    <div></div>
                </div>
                {items.map((item) => (
                    <div key={item.id} className={style.productRow}>
                        <div className={style.productInfo}>
                            <img src={item.image} alt={item.name} className={style.productImg} />
                            <div className={style.productDetails}>
                                <h4>{item.name}</h4>
                                <span>Tamanho: {item.size} <br/> Cor: {item.color}</span>
                            </div>
                        </div>
                        <div className={style.cellCenter}>R$ {item.unitPrice.toFixed(2)}</div>
                        <div className={style.cellCenter}>
                           
                           <i className="bi bi-dash-circle" style={{marginRight: 5}}></i> 
                           {item.quantity} 
                           <i className="bi bi-plus-circle" style={{marginLeft: 5}}></i>
                        </div>
                        <div className={style.cellCenter}>R$ {(item.unitPrice * item.quantity).toFixed(2)}</div>
                        <div className={style.cellCenter}>
                            <button className={style.removeBtn} onClick={() => requestRemoveItem(item.id)}>✕</button>
                        </div>
                    </div>
                ))}
                {items.length === 0 && <p style={{padding: '1rem', textAlign: 'center'}}>Carrinho vazio.</p>}
            </div>

            <div className={style.sectionCard}>
                <div className={style.sectionHeader} style={{border: 'none'}}>
                    <div className={style.sectionTitle}>METODO DE PAGAMENTO</div>
                </div>
                
                <div className={style.paymentToggle}>
                    <button 
                        className={`${style.paymentOption} ${paymentMethod === 'credit' ? style.activeMethod : style.inactiveMethod}`}
                        onClick={() => setPaymentMethod('credit')}
                    >
                        <i className="bi bi-credit-card-2-back" style={{fontSize: '1.5rem'}}></i>
                        CARTÃO DE CRÉDITO
                    </button>
                    <button 
                        className={`${style.paymentOption} ${paymentMethod === 'pix' ? style.activeMethod : style.inactiveMethod}`}
                        onClick={() => setPaymentMethod('pix')}
                    >
                        <i className="bi bi-ui-checks-grid" style={{fontSize: '1.5rem'}}></i>
                        PIX
                    </button>
                </div>

                {paymentMethod === 'credit' && (
                    <div className={style.cardForm}>
                        <div className={style.inputGroup}>
                            <label>Nome do titular</label>
                            <input type="text" placeholder="Digite o nome completo do titular" />
                        </div>
                        <div className={style.inputGroup}>
                            <label>CPF do titular</label>
                            <input type="text" placeholder="Digite o CPF do titular" />
                        </div>
                        <div className={style.inputGroup}>
                            <label>Número do cartão</label>
                            <input type="text" placeholder="Digite o número do cartão" />
                        </div>
                        <div className={style.rowInputs}>
                            <div className={style.inputGroup}>
                                <label>Código de segurança</label>
                                <input type="text" placeholder="CVC" />
                            </div>
                            <div className={style.inputGroup}>
                                <label>Data de validade</label>
                                <div style={{display:'flex', gap:'0.5rem'}}>
                                    <input type="text" placeholder="MÊS" style={{width: '100%'}}/>
                                    <input type="text" placeholder="ANO" style={{width: '100%'}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {paymentMethod === 'pix' && (
                    <div className={style.pixContainer}>             
                        <div style={{background: '#fff', padding: '10px', borderRadius: '8px', display: 'inline-block'}}>
                            <img 
                                src={QrCodeImg} 
                                alt="QR Code" 
                                className={style.qrCode} 
                                style={{width: '180px', height: '180px'}} 
                            /> 
                        </div>
                        
                        <div style={{color: '#F28D44', fontWeight: 'bold'}}>
                            <i className="bi bi-columns-gap"></i> ESCANEIE O QR CODE COM SEU CELULAR
                        </div>
                        
                        <p className={style.pixTimer}>
                           Tempo restante {formatTime(timeLeft)}
                        </p>
                        
                        <p style={{fontSize: '0.9rem', color: '#666', maxWidth: '400px'}}>
                            Abra o app do seu banco no celular, selecione Pix e aponte a câmera para o código.
                        </p>
                        <p style={{fontWeight: 'bold'}}>Valor da compra: R$ {total.toFixed(2)}</p>
                    </div>
                )}

            </div>
          </div>

          <div className={style.rightColumn}>
            
            <div className={style.summaryDark}>
                <h2 className={style.summaryTitle}>RESUMO DO PEDIDO</h2>
                
                <div className={style.summaryRow}>
                  <span>Quantidade de itens</span>
                  <span>{items.length}</span>
                </div>
                <div className={style.summaryRow}>
                  <span>Total dos produtos</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                    <div className={style.summaryRow}>
                        <span>Cupom</span>
                        <span style={{color: '#F28D44'}}>R$ {discount.toFixed(2)}</span>
                    </div>
                )}

                <div className={style.summaryRow}>
                  <span>Taxas</span>
                  <span>R$ {tax.toFixed(2)}</span>
                </div>
                <div className={style.summaryRow}>
                  <span>Frete</span>
                  <span>R$ {shipping.toFixed(2)}</span>
                </div>

                <div className={style.summaryTotal}>
                  <span>Total:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>

                <button className={style.checkoutButton} onClick={handleFinishOrder}>
                    COMPRAR
                </button>
            </div>

            <div className={style.couponSection}>
                <div className={style.couponHeader}>
                    <i className="bi bi-ticket-perforated-fill"></i> CUPOM LOGOLOGO
                </div>
                <div className={style.couponInputContainer}>
                    <input 
                        type="text" 
                        placeholder="Digite aqui o cupom" 
                        className={style.couponInput}
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <div style={{borderBottom: '1px dashed #1e1e1e', margin: '0.5rem 0'}}></div>
                    <button className={style.addCouponBtn} onClick={handleApplyCoupon}>
                        ADICIONAR CUPOM
                    </button>
                </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}