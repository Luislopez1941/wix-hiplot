import "./styles/AboutUs.css";

const AboutUs = () => {
  const stats = [
    { number: "25+", label: "Años de Experiencia" },
    { number: "5000+", label: "Proyectos Completados" },
    { number: "500+", label: "Clientes Satisfechos" },
    { number: "24/7", label: "Soporte Técnico" },
  ];

  const values = [
    {
      icon: "🎯",
      title: "Calidad",
      description: "Comprometidos con la excelencia en cada proyecto",
    },
    {
      icon: "⚡",
      title: "Eficiencia",
      description: "Entrega rápida sin comprometer la calidad",
    },
    {
      icon: "🤝",
      title: "Confianza",
      description: "Relaciones duraderas basadas en la transparencia",
    },
    {
      icon: "🚀",
      title: "Innovación",
      description: "Tecnología de vanguardia en cada servicio",
    },
  ];

  const services = [
    {
      title: "Impresión Digital",
      description: "Alta resolución y acabados profesionales",
      features: ["Gran formato", "Pequeño tiraje", "Personalización"],
    },
    {
      title: "Offset Tradicional",
      description: "Para grandes volúmenes con máxima calidad",
      features: ["Grandes tirajes", "Colores especiales", "Papeles exclusivos"],
    },
    {
      title: "Rótulos y Señalética",
      description: "Diseño e instalación de identidad visual",
      features: [
        "Diseño personalizado",
        "Instalación incluida",
        "Materiales resistentes",
      ],
    },
    {
      title: "Diseño Gráfico",
      description: "Creatividad al servicio de tu marca",
      features: ["Logotipos", "Papelería", "Material publicitario"],
    },
  ];

  return (
    <div className="about-container">
      {/* Header */}
      <div className="about-header">
        <div className="container">
          <h1 className="about-title">NOSOTROS</h1>
          <p className="about-subtitle">
            Más de 25 años creando soluciones gráficas de calidad
          </p>
        </div>
      </div>

      <div className="container">
        <div className="about-content">
          {/* Hero Section */}
          <div className="hero-section">
            <div className="hero-text">
              <h2>HIPLOT - Rótulos y Offset de Cancún</h2>
              <p className="hero-description">
                Desde 1998, somos una empresa familiar dedicada a brindar
                soluciones integrales en impresión y diseño gráfico. Ubicados en
                el corazón de Cancún, hemos crecido junto a nuestra comunidad,
                ofreciendo servicios de alta calidad que han acompañado el
                crecimiento de cientos de empresas locales y nacionales.
              </p>
              <div className="company-logo-section">
                <div className="company-logo">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 7h-9" />
                    <path d="M14 17H5" />
                    <circle cx="17" cy="17" r="3" />
                    <circle cx="7" cy="7" r="3" />
                  </svg>
                </div>
                <div className="company-info">
                  <h3>ROTULOS Y OFFSET DE CANCUN S.A. DE C.V.</h3>
                  <p>Comprometidos con la excelencia desde 1998</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <h3>Nuestra Trayectoria en Números</h3>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="mission-vision-section">
            <div className="mission-vision-grid">
              <div className="mission-card">
                <div className="card-icon">🎯</div>
                <h4>Nuestra Misión</h4>
                <p>
                  Proporcionar soluciones gráficas innovadoras y de alta calidad
                  que superen las expectativas de nuestros clientes,
                  contribuyendo al crecimiento y éxito de sus negocios mediante
                  servicios profesionales, tecnología de vanguardia y un equipo
                  comprometido con la excelencia.
                </p>
              </div>
              <div className="vision-card">
                <div className="card-icon">🌟</div>
                <h4>Nuestra Visión</h4>
                <p>
                  Ser la empresa líder en soluciones gráficas en la región,
                  reconocida por nuestra innovación, calidad y compromiso con el
                  medio ambiente. Aspiramos a ser el socio estratégico preferido
                  de nuestros clientes, expandiendo nuestros servicios y
                  presencia en el mercado nacional.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="values-section">
            <h3>Nuestros Valores</h3>
            <div className="values-grid">
              {values.map((value, index) => (
                <div key={index} className="value-card">
                  <div className="value-icon">{value.icon}</div>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Services Overview */}
          <div className="services-overview">
            <h3>Nuestros Servicios</h3>
            <div className="services-grid">
              {services.map((service, index) => (
                <div key={index} className="service-card">
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                  <ul className="service-features">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="why-choose-section">
            <div className="why-choose-content">
              <div className="why-choose-text">
                <h3>¿Por qué elegir HIPLOT?</h3>
                <div className="reasons-list">
                  <div className="reason-item">
                    <span className="reason-icon">🏆</span>
                    <div>
                      <strong>Experiencia Comprobada:</strong>
                      <p>Más de 25 años en el mercado nos respaldan</p>
                    </div>
                  </div>
                  <div className="reason-item">
                    <span className="reason-icon">🔧</span>
                    <div>
                      <strong>Tecnología Avanzada:</strong>
                      <p>
                        Equipos de última generación para mejores resultados
                      </p>
                    </div>
                  </div>
                  <div className="reason-item">
                    <span className="reason-icon">👥</span>
                    <div>
                      <strong>Equipo Profesional:</strong>
                      <p>Personal capacitado y comprometido con la calidad</p>
                    </div>
                  </div>
                  <div className="reason-item">
                    <span className="reason-icon">📍</span>
                    <div>
                      <strong>Ubicación Estratégica:</strong>
                      <p>En el centro de Cancún, fácil acceso y entrega</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="why-choose-image">
                <div className="image-placeholder">
                  <svg
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M3 3v18h18" />
                    <path d="M18.7 8a3 3 0 0 0-5.4 0" />
                    <path d="M18.7 16a3 3 0 0 0-5.4 0" />
                    <path d="M8.7 8a3 3 0 0 0-5.4 0" />
                    <path d="M8.7 16a3 3 0 0 0-5.4 0" />
                  </svg>
                  <span>25 años de trayectoria</span>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="cta-section">
            <div className="cta-content">
              <h3>¿Listo para trabajar con nosotros?</h3>
              <p>
                Descubre cómo podemos ayudarte a llevar tu proyecto al siguiente
                nivel
              </p>
              <div className="cta-buttons">
                <button className="cta-primary">Solicitar Cotización</button>
                <button className="cta-secondary">Ver Nuestros Trabajos</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
