import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import style from "./Carrinho.module.css";


import ProductImg1 from "../../assets/images/products/produto1.svg";
import ProductImg2 from "../../assets/images/products/produto2.svg";
import ProductImg3 from "../../assets/images/products/produto3.svg";
import ProductImg4 from "../../assets/images/products/produto4.svg";
import ProductImg5 from "../../assets/images/products/produto5.svg";
import TrashIcon from "../../assets/images/icons/trash.svg"; 

export function Carrinho() {
  
  const inStockItems = [
    {
      image: ProductImg1,
      name: "Blusa de ombro único assimétrica preta",
      unitPrice: 75.0,
      totalPrice: 150.0,
      size: "P",
      color: "#000000",
    },
    {
      image: ProductImg2,
      name: "Camiseta verde listrada",
      unitPrice: 75.0,
      totalPrice: 150.0,
      size: "M",
      color: "#695751",
    },
    {
      image: ProductImg3,
      name: "Camiseta laranja courage",
      unitPrice: 75.0,
      totalPrice: 150.0,
      size: "M",
      color: "#D96E32",
    },
  ];

  const outOfStockItems = [
    {
      image: ProductImg4,
      name: "Short jeans azul lavado",
      unitPrice: 75.0,
      totalPrice: 150.0,
      size: "52",
      color: "#5975A5",
    },
    {
      image: ProductImg5,
      name: "Calça jeans skin preta",
      unitPrice: 75.0,
      totalPrice: 150.0,
      size: "48",
      color: "#1E1E1E",
    },
  ];

  return (
    <div className={style.pageContainer}>
      <Header />

      <main className={style.main}>
        <h1 className={style.title}>Carrinho</h1>
        <div className={style.cartLayout}>
          {/* Coluna da Esquerda: Itens do Carrinho */}
          <div className={style.cartItems}>
            {/* Itens em Estoque */}
            {inStockItems.map((item, index) => (
              <div key={index} className={style.item}>
                <input type="checkbox" className={style.checkbox} defaultChecked />
                <img src={item.image} alt={item.name} className={style.itemImage} />
                <div className={style.itemDetails}>
                  <p className={style.itemName}>{item.name}</p>
                  <p className={style.itemPriceSmall}>R$ {item.unitPrice.toFixed(2)}</p>
                  <span className={style.stockStatus}>Em estoque</span>
                  <div className={style.itemOptions}>
                    <span>Tamanho: {item.size}</span>
                    <div className={style.colorOption}>
                      <span>Cor:</span>
                      <span className={style.colorSwatch} style={{ backgroundColor: item.color }}></span>
                    </div>
                  </div>
                  <div className={style.quantitySelector}>
                    <button>−</button>
                    <span>1</span>
                    <button>+</button>
                  </div>
                </div>
                <div className={style.itemTotal}>
                  <p>R$ {item.totalPrice.toFixed(2)}</p>
                  <button className={style.removeButton}>
                    Remover <img src={TrashIcon} alt="Remover" />
                  </button>
                </div>
              </div>
            ))}

            {/* Itens Fora de Estoque */}
            <div className={style.outOfStockSection}>
              <h2 className={style.sectionTitle}>Produtos fora de estoque</h2>
              {outOfStockItems.map((item, index) => (
                 <div key={index} className={`${style.item} ${style.itemOutOfStock}`}>
                    <input type="checkbox" className={style.checkbox} defaultChecked />
                    <img src={item.image} alt={item.name} className={style.itemImage} />
                    <div className={style.itemDetails}>
                    <p className={style.itemName}>{item.name}</p>
                    <p className={style.itemPriceSmall}>R$ {item.unitPrice.toFixed(2)}</p>
                    <span className={`${style.stockStatus} ${style.outOfStockLabel}`}>Fora de estoque</span>
                     <div className={style.itemOptions}>
                        <span>Tamanho: {item.size}</span>
                         <div className={style.colorOption}>
                            <span>Cor:</span>
                            <span className={style.colorSwatch} style={{ backgroundColor: item.color }}></span>
                        </div>
                     </div>
                     <div className={style.quantitySelector}>
                        <button>−</button>
                        <span>1</span>
                        <button>+</button>
                     </div>
                    </div>
                    <div className={style.itemTotal}>
                        <p>R$ {item.totalPrice.toFixed(2)}</p>
                         <button className={style.removeButton}>
                            Remover <img src={TrashIcon} alt="Remover" />
                        </button>
                    </div>
                 </div>
              ))}
            </div>
            
            <button className={style.clearCartButton}>LIMPAR CARRINHO</button>
          </div>

          {/* Coluna da Direita: Resumo do Pedido */}
          <div className={style.summary}>
            <h2 className={style.summaryTitle}>RESUMO DO PEDIDO</h2>
            <div className={style.summaryRow}>
              <span>Quantidade de itens</span>
              <span>3</span>
            </div>
            <div className={style.summaryRow}>
              <span>Total dos produtos</span>
              <span>R$ 450,00</span>
            </div>
            <div className={style.summaryTotal}>
              <span>Total:</span>
              <span>R$ 450,00</span>
            </div>
            <button className={style.checkoutButton}>COMPRAR</button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}