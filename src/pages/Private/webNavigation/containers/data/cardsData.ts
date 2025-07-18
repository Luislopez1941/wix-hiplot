export interface CardItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  image?: string;
  badge?: string;
  buttonText?: string;
  buttonLink?: string;
}

export const cardsData: CardItem[] = [
  {
    id: 1,
    title: "Diseño Moderno",
    description:
      "Interfaces elegantes y minimalistas que cautivan a tus usuarios desde el primer momento.",
    icon: "🎨",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "Popular",
    buttonText: "Ver más",
    buttonLink: "#",
  },
  {
    id: 2,
    title: "Performance Optimizada",
    description:
      "Velocidad de carga increíble y experiencia fluida en todos los dispositivos.",
    icon: "⚡",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "Nuevo",
    buttonText: "Explorar",
    buttonLink: "#",
  },
  {
    id: 3,
    title: "Seguridad Avanzada",
    description:
      "Protección de datos de nivel empresarial con cifrado y autenticación robusta.",
    icon: "🔒",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "Seguro",
    buttonText: "Descubrir",
    buttonLink: "#",
  },
  {
    id: 4,
    title: "Análiticas Inteligentes",
    description:
      "Dashboard con métricas en tiempo real y reportes automatizados para tu negocio.",
    icon: "📊",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    buttonText: "Ver demo",
    buttonLink: "#",
  }
];
