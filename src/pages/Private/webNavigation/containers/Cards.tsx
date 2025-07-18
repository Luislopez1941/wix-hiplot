import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./styles/Cards.css";
import { cardsData } from "./data/cardsData";
import type { CardItem } from "./data/cardsData";
import {
  IdCard,
  Award,
  Monitor,
  CreditCard,
  FileText,
  Flag,
} from "lucide-react";

const Cards = ({
  title = "Nuestros Servicios",
  subtitle = "Descubre todas las funcionalidades que tenemos para ofrecerte",
  data = cardsData,
  showAnimation = true,
}: any) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { active: false },
    },
  });

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(true);
    }
  }, [showAnimation]);

  const getBadgeClass = (badge: string) => {
    return `card-badge ${badge.toLowerCase()}`;
  };

  const getIcon = (iconName: string) => {
    const iconProps = { size: 40, strokeWidth: 1.5 };

    switch (iconName) {
      case "gafetes":
        return <IdCard {...iconProps} />;
      case "reconocimientos":
        return <Award {...iconProps} />;
      case "displays":
        return <Monitor {...iconProps} />;
      case "tarjetas":
        return <CreditCard {...iconProps} />;
      case "volantes":
        return <FileText {...iconProps} />;
      case "banners":
        return <Flag {...iconProps} />;
      default:
        return <IdCard {...iconProps} />;
    }
  };

  const renderCard = (card: CardItem) => (
    <div key={card.id} className="card-item">
      {card.image && (
        <div className="card-image-container">
          <img src={card.image} alt={card.title} className="card-image" />
          {card.badge && (
            <div className={getBadgeClass(card.badge)}>{card.badge}</div>
          )}
        </div>
      )}

      <div className="card-content">
        <div className="card-icon">{getIcon(card.icon)}</div>

        <h3 className="card-title">{card.title}</h3>

        <p className="card-description">{card.description}</p>

        {card.buttonText && (
          <button className="card-button">{card.buttonText}</button>
        )}
      </div>
    </div>
  );

  return (
    <section className="cards-section">
      <div className="cards-container">
        <div className="cards-header">
          <h2 className="cards-title">{title}</h2>
          <p className="cards-subtitle">{subtitle}</p>
        </div>

        {/* Desktop Grid */}
        <div
          className={`cards-grid ${showAnimation && !isLoaded ? "loading" : ""}`}
        >
          {data.map(renderCard)}
        </div>

        {/* Mobile Carousel */}
        <div className="cards-carousel">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {data.map((card: any) => (
                <div key={`carousel-${card.id}`} className="embla__slide">
                  {renderCard(card)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;
