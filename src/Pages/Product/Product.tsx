import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Layout } from '../../components/Layout/Layout';
import { Category } from "../../components/Category/Category";
import style from './Product.module.css';

import Lightning from "../../assets/images/icons/lightning.svg";
import Dress from "../../assets/images/icons/dress.svg";
import Shirt from "../../assets/images/icons/shirt.svg";
import Bear from "../../assets/images/icons/bear.svg";
import Shoe from "../../assets/images/icons/shoe.svg";
import Necklace from "../../assets/images/icons/necklace.svg";

import ProdutoImagem1 from '../../assets/images/products/produto1.svg';
import ProdutoImagem1_1 from '../../assets/images/products/produto1_1.svg';
import ProdutoImagem1_2 from '../../assets/images/products/produto1_2.svg';
import ProdutoImagem1_3 from '../../assets/images/products/produto1_3.svg';

const PRODUCT_DATA = {
  title: "Blusa de ombro único assimétrica preta",
  category: "Feminino",
  price: 150.00,
  oldPrice: 230.00,
  discount: "-35%",
  description: "Blusa ombro único feminina confeccionada em malha estruturada. A peça tem modelagem confortavelmente ajustada ao corpo, com fivela em formato orgânico aplicada na lateral que cria franzido e modela a silhueta. O modelo tem barra e decote assimétricos e alça larga com prega.",
  sizes: ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG'],
  colors: [
    { name: 'Marrom', hex: '#4a3b32' },
    { name: 'Roxo', hex: '#7b68ee' },
    { name: 'Verde', hex: '#004d00' },
    { name: 'Preto', hex: '#000000' },
    { name: 'Branco', hex: '#ffffff' }
  ],
  images: [
    ProdutoImagem1, 
    ProdutoImagem1_1,
    ProdutoImagem1_2, 
    ProdutoImagem1_3, 
  ]
};

export function Product() {
  const navigate = useNavigate();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('P');
  const [selectedColor, setSelectedColor] = useState('Preto');
  const [quantity, setQuantity] = useState(1);
  const [isNewsletterSent, setIsNewsletterSent] = useState(false);

  const handleQuantity = (type: 'inc' | 'dec') => {
    if (type === 'dec' && quantity > 1) setQuantity(quantity - 1);
    if (type === 'inc') setQuantity(quantity + 1);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewsletterSent(true);
  };

  return (
    <Layout theme="light">
      
      <div className={style.categoriesWrapper}>
          <Category icon={Lightning} titulo="Novidades" />
          <Category icon={Dress} titulo="Feminino" />
          <Category icon={Shirt} titulo="Masculino" />
          <Category icon={Bear} titulo="Infantil" />
          <Category icon={Shoe} titulo="Calçados" />
          <Category icon={Necklace} titulo="Acessórios" />
      </div>

      <div className={style.breadcrumbContainer}>
        <div className={style.breadcrumb}>
          INÍCIO <span>&gt;</span> FEMININO <span>&gt;</span> BLUSA RECORTE
        </div>
      </div>

      <div className={style.fullWidthBanner}>
        <div className={style.bannerContent}>
          <h2 className={style.promoText}>10R$ Off Na Sua Primeira Compra</h2>
          <div className={style.couponBox}>
            <span className={style.couponLabel}>Copiar</span>
            <span className={style.couponCode}>PRIMEIRA10</span>
          </div>
        </div>
      </div>

      <div className={style.container}>
        
        <div className={style.productGrid}>
          
          <div className={style.gallery}>
            <div className={style.mainImageWrapper}>
              <img 
                src={PRODUCT_DATA.images[selectedImage]} 
                alt="Produto Principal" 
                className={style.mainImage} 
              />
            </div>
            <div className={style.thumbnails}>
              {PRODUCT_DATA.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumb ${index}`}
                  className={`${style.thumb} ${selectedImage === index ? style.active : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          <div className={style.details}>
            <span className={style.categoryTitle}>{PRODUCT_DATA.category}</span>
            <h1 className={style.productTitle}>{PRODUCT_DATA.title}</h1>
            
            <div className={style.rating}>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <span className={style.ratingText}>5.0/5.0</span>
            </div>

            <p className={style.description}>
              {PRODUCT_DATA.description}
            </p>

            <div className={style.priceContainer}>
              <span className={style.price}>${PRODUCT_DATA.price}</span>
              <span className={style.oldPrice}>${PRODUCT_DATA.oldPrice}</span>
              <span className={style.discountBadge}>{PRODUCT_DATA.discount}</span>
            </div>

            <div className={style.selectorGroup}>
              <span className={style.selectorTitle}>Tamanhos</span>
              <div className={style.options}>
                {PRODUCT_DATA.sizes.map(size => (
                  <button 
                    key={size}
                    className={`${style.sizeBtn} ${selectedSize === size ? style.active : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className={style.selectorGroup}>
              <span className={style.selectorTitle}>Cores</span>
              <div className={style.options}>
                {PRODUCT_DATA.colors.map(color => (
                  <button 
                    key={color.name}
                    className={`${style.colorBtn} ${selectedColor === color.name ? style.active : ''}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    onClick={() => setSelectedColor(color.name)}
                  />
                ))}
              </div>
            </div>

            <div className={style.actions}>
              <div className={style.quantitySelector}>
                <button className={style.qtyBtn} onClick={() => handleQuantity('dec')}>-</button>
                <span>{quantity}</span>
                <button className={style.qtyBtn} onClick={() => handleQuantity('inc')}>+</button>
              </div>
              
              <button 
                className={style.addToCartBtn} 
                onClick={() => navigate('/carrinho')}
              >
                Adicionar ao carrinho
              </button>
              
              <button 
                className={style.buyNowBtn} 
                onClick={() => navigate('/carrinho')}
              >
                Comprar Agora
              </button>
            </div>
            
            <span className={style.sku}>ID: SKFNDIISOMIBVISDNV</span>
          </div>
        </div>

        <div className={style.bottomSection}>
          
          <div className={style.accordionWrapper}>
            <details className={style.accordionItem}>
              <summary className={style.accordionSummary}>
                <span><i className="bi bi-chevron-down" style={{marginRight: 10}}></i> Entrega expressa</span>
              </summary>
              <div className={style.accordionContent}>Receba seu pedido em até 24 horas. Verifique a disponibilidade no fechamento da compra</div>
            </details>
            
            <details className={style.accordionItem}>
              <summary className={style.accordionSummary}>
                <span><i className="bi bi-chevron-down" style={{marginRight: 10}}></i> Tabela de medidas</span>
              </summary>
              <div className={style.accordionContent}>
                PP: Ombro 41cm • Tórax 48cm • Comprimento 66cm • Manga 61cm <br /><br />
                P: Ombro 43cm • Tórax 50cm • Comprimento 68cm • Manga 62cm <br /><br />
                M: Ombro 45cm • Tórax 52cm • Comprimento 70cm • Manga 63cm <br /><br />
                G: Ombro 47cm • Tórax 54cm • Comprimento 72cm • Manga 64cm <br /><br />
                GG: Ombro 49cm • Tórax 57cm • Comprimento 74cm • Manga 65cm <br /><br />
                XG: Ombro 51cm • Tórax 60cm • Comprimento 76cm • Manga 66cm <br /><br />
                XGG: Ombro 53cm • Tórax 63cm • Comprimento 78cm • Manga 67cm
              </div>
            </details>

            <details className={style.accordionItem}>
              <summary className={style.accordionSummary}>
                <span><i className="bi bi-chevron-down" style={{marginRight: 10}}></i> Composição</span>
              </summary>
              <div className={style.accordionContent}>95% Algodão e 5% Elastano</div>
            </details>

            <details className={style.accordionItem}>
              <summary className={style.accordionSummary}>
                <span><i className="bi bi-chevron-down" style={{marginRight: 10}}></i> Trocas e devoluções</span>
              </summary>
              <div className={style.accordionContent}>Aceitamos trocas e devoluções em até 30 dias após o recebimento, desde que o produto esteja sem uso, com etiquetas e em perfeito estado. Para solicitar, basta entrar em contato pelos nossos canais de atendimento.</div>
            </details>
          </div>

          <div className={style.newsletterWrapper}>
            <div className={style.newsletterBox}>
              {!isNewsletterSent ? (
                <>
                  <h3>As melhores novidades chegam primeiro aqui</h3>
                  <form className={style.newsletterForm} onSubmit={handleNewsletterSubmit}>
                    <input type="text" placeholder="Seu nome" className={style.input} required />
                    <input type="email" placeholder="Seu e-mail" className={style.input} required />
                    <button type="submit" className={style.sendBtn}>ENVIAR</button>
                  </form>
                </>
              ) : (
                <div className={style.newsletterSuccess}>
                  <div className={style.successIconWrapper}>
                    <i className="bi bi-check-lg"></i>
                  </div>
                  <h3 className={style.successTitle}>Inscrição confirmada!</h3>
                  <p className={style.successText}>
                    Agora você receberá nossas melhores ofertas e novidades diretamente no seu e-mail.
                  </p>
                  <button className={style.closeBtn} onClick={() => setIsNewsletterSent(false)}>
                    FECHAR
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={style.reviewsSection}>
          <div className={style.reviewsHeader}>
            <h3>Veja o que estão falando sobre este produto</h3>
            <span className={style.ratingBig}>5.0</span>
            <div style={{color: '#ffc107', fontSize: '1.2rem'}}>★★★★★</div>
          </div>

          <div className={style.reviewCard}>
            <div className={style.reviewer}>
              <img src="https://i.pravatar.cc/150?img=35" alt="User" className={style.avatar} />
              <strong>Xao Chin</strong>
            </div>
            <div style={{fontSize: '0.8rem', marginBottom: 5}}>
            <span style={{color: '#ffc107'}}>★★★★★</span>
            <span style={{color: '#000', marginLeft: 5}}>5.0/5.0</span>
            </div>
            <span className={style.reviewTitle}><strong>Ótima Qualidade e Conforto!</strong></span>
            <p className={style.reviewText}>
              A camiseta surpreendeu pela maciez e pelo caimento perfeito. O tecido é leve, veste muito bem e não esquenta. Usei o dia inteiro e continuou confortável. O acabamento é muito bem-feito e as medidas bateram certinho. Recomendo demais!
            </p>
          </div>

          <div className={style.reviewCard}>
            <div className={style.reviewer}>
              <img src="https://i.pravatar.cc/150?img=9" alt="User" className={style.avatar} />
              <strong>Cintia Alves</strong>
            </div>
            <div style={{fontSize: '0.8rem', marginBottom: 5}}>
            <span style={{color: '#ffc107'}}>★★★★★</span>
            <span style={{color: '#000', marginLeft: 5}}>5.0/5.0</span>
            </div>
            <span className={style.reviewTitle}><strong>Custo-Benefício Excelente.</strong></span>
            <p className={style.reviewText}>
              Fiquei muito satisfeita com a compra. A peça é bonita, elegante e combina com qualquer estilo. O tecido estica na medida certa e o corte deixa o visual bem alinhado. Atendimento rápido e entrega antes do prazo. Vale totalmente a pena.
            </p>
          </div>
        </div>

      </div>
    </Layout>
  );
}