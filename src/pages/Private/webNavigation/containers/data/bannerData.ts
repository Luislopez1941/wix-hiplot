export interface BannerItem {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonText?: string;
  buttonLink?: string;
}

export const bannerData: BannerItem[] = [
  {
    id: 1,
    title: "Discover Amazing\nExperiences",
    subtitle: "Welcome to Innovation",
    description:
      "Transform your digital presence with cutting-edge solutions designed for the modern world.",
    backgroundImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    backgroundColor: "from-slate-900 to-slate-700",
    textColor: "text-white",
    buttonText: "Get Started",
    buttonLink: "#",
  },
  {
    id: 2,
    title: "Build Something\nExtraordinary",
    subtitle: "Create with Purpose",
    description:
      "Unleash your creativity with powerful tools and seamless workflows that bring ideas to life.",
    backgroundImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80",
    backgroundColor: "from-blue-600 to-purple-600",
    textColor: "text-white",
    buttonText: "Learn More",
    buttonLink: "#",
  },
  {
    id: 3,
    title: "Connect & Grow\nTogether",
    subtitle: "Community First",
    description:
      "Join thousands of creators, developers, and innovators building the future together.",
    backgroundImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    backgroundColor: "from-emerald-500 to-teal-600",
    textColor: "text-white",
    buttonText: "Join Now",
    buttonLink: "#",
  },
  {
    id: 4,
    title: "Excellence in\nEvery Detail",
    subtitle: "Precision Matters",
    description:
      "Experience unparalleled quality and attention to detail in everything we create.",
    backgroundImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
    backgroundColor: "from-orange-500 to-red-500",
    textColor: "text-white",
    buttonText: "Explore",
    buttonLink: "#",
  },
];
