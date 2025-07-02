import React, { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import "./styles/Testimonials.css";

interface Testimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  rating: number;
  comment: string;
  avatar: string;
  service: string;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({
  title = "Lo que dicen nuestros clientes",
  subtitle = "Más de 500 empresas confían en nosotros para sus proyectos de diseño e impresión",
  testimonials = defaultTestimonials,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`testimonial-star ${
          index < rating ? "testimonial-star-filled" : "testimonial-star-empty"
        }`}
      />
    ));
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        {/* Header */}
        <div className="testimonials-header">
          <h2 className="testimonials-title">{title}</h2>
          <p className="testimonials-subtitle">{subtitle}</p>
        </div>

        {/* Featured Testimonial */}
        <div className="testimonials-featured">
          <div className="testimonials-featured-card">
            <div className="testimonials-quote-icon">
              <Quote size={32} />
            </div>

            <div className="testimonials-featured-content">
              <div className="testimonials-featured-rating">
                {renderStars(testimonials[currentIndex].rating)}
              </div>

              <blockquote className="testimonials-featured-comment">
                "{testimonials[currentIndex].comment}"
              </blockquote>

              <div className="testimonials-featured-author">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="testimonials-featured-avatar"
                />
                <div className="testimonials-featured-info">
                  <div className="testimonials-featured-name">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="testimonials-featured-position">
                    {testimonials[currentIndex].position}
                  </div>
                  <div className="testimonials-featured-company">
                    {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonial-card ${
                index === currentIndex ? "testimonial-card-active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="testimonial-content">
                <div className="testimonial-rating">
                  {renderStars(testimonial.rating)}
                </div>

                <p className="testimonial-comment">
                  "
                  {testimonial.comment.length > 120
                    ? testimonial.comment.substring(0, 120) + "..."
                    : testimonial.comment}
                  "
                </p>

                <div className="testimonial-author">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="testimonial-avatar"
                  />
                  <div className="testimonial-info">
                    <div className="testimonial-name">{testimonial.name}</div>
                    <div className="testimonial-company">
                      {testimonial.company}
                    </div>
                  </div>
                </div>

                <div className="testimonial-service">
                  Servicio: {testimonial.service}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="testimonials-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonials-dot ${
                index === currentIndex ? "testimonials-dot-active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ver testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonios de muestra
const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "María González",
    company: "TechSolutions SA",
    position: "Directora de Marketing",
    rating: 5,
    comment:
      "Excelente servicio de diseño de gafetes para nuestro equipo. La calidad de impresión es excepcional y el diseño superó nuestras expectativas. Muy profesionales en todo el proceso.",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    service: "Gafetes Corporativos",
  },
  {
    id: "2",
    name: "Carlos Mendoza",
    company: "Innovate Corp",
    position: "CEO",
    rating: 5,
    comment:
      "Las tarjetas de presentación que diseñaron para nuestra empresa son simplemente perfectas. La atención al detalle y la calidad de los materiales son de primera clase.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    service: "Tarjetas de Presentación",
  },
  {
    id: "3",
    name: "Ana Rodríguez",
    company: "Creative Studio",
    position: "Diseñadora Principal",
    rating: 5,
    comment:
      "Trabajar con este equipo ha sido una experiencia fantástica. Su creatividad y profesionalismo se refleja en cada proyecto. Altamente recomendados para cualquier trabajo de diseño.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    service: "Diseño Personalizado",
  },
  {
    id: "4",
    name: "Roberto Silva",
    company: "Global Enterprises",
    position: "Gerente General",
    rating: 4,
    comment:
      "Los banners publicitarios que crearon para nuestra campaña fueron espectaculares. La calidad de impresión en gran formato es impresionante y los colores son vibrantes.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    service: "Banners Publicitarios",
  },
  {
    id: "5",
    name: "Laura Jiménez",
    company: "StartUp Plus",
    position: "Fundadora",
    rating: 5,
    comment:
      "Como startup necesitábamos materials de calidad a buen precio. Este equipo nos ayudó a crear una identidad visual sólida con materiales de excelente calidad.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    service: "Identidad Corporativa",
  },
  {
    id: "6",
    name: "Miguel Torres",
    company: "Professional Services",
    position: "Director de Operaciones",
    rating: 5,
    comment:
      "El servicio de reconocimientos personalizados superó todas nuestras expectativas. La calidad del grabado y los materiales utilizados son de primera clase.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    service: "Reconocimientos",
  },
];

export default Testimonials;
