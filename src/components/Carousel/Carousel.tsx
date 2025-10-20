import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Carousel.module.css";

import CarouselImage1 from "../../assets/images/carrossel item 1.svg";
import CarouselImage2 from "../../assets/images/carrossel item 2.svg";
import CarouselImage3 from "../../assets/images/carrossel item 3.svg";

const images = [CarouselImage1, CarouselImage2, CarouselImage3];

export function Carousel() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleImageClick = (index: number) => {
    if (index === 2) {
      navigate("/login");
    }
  };

  return (
    <div className={styles.carousel}>
      <div
        className={styles.inner}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Imagem ${index + 1} do carrossel`}
            className={styles.image}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>

      <button
        className={`${styles.button} ${styles.prev}`}
        onClick={() =>
          setCurrent((prev) => (prev - 1 + images.length) % images.length)
        }
      >
        <i className="bi bi-chevron-left"></i>
      </button>
      <button
        className={`${styles.button} ${styles.next}`}
        onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
}
