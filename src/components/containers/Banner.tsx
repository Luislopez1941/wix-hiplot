import { useState, useEffect, useCallback } from "react";
import "./styles/Banner.css";
import { bannerData } from "./data/bannerData";


const Banner = ({
  autoPlay = true,
  showNavigation = true,
  showDots = true,
  item,
  data = bannerData,
}: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying] = useState(autoPlay);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % data.length);
    setProgress(0);
  }, [data.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);
    setProgress(0);
  }, [data.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  }, []);



  // // Auto-play functionality
  // useEffect(() => {
  //   if (!isPlaying || isPaused) return;

  //   const interval = setInterval(() => {
  //     setProgress((prev) => {
  //       if (prev >= 100) {
  //         nextSlide();
  //         return 0;
  //       }
  //       return prev + 100 / (autoPlayInterval / 100);
  //     });
  //   }, 100);

  //   return () => clearInterval(interval);
  // }, [isPlaying, isPaused, nextSlide, autoPlayInterval]);

  // // Keyboard navigation
  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === "ArrowLeft") {
  //       prevSlide();
  //     } else if (event.key === "ArrowRight") {
  //       nextSlide();
  //     } else if (event.key === " ") {
  //       event.preventDefault();
  //       togglePlayPause();
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, [nextSlide, prevSlide]);

  console.log('item', item)
  useEffect(() => {
    console.log("🎯 Banner MONTADO");
  }, []);


  return (
    <div
      className="banner_web"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="banner-slides-container">
        {item?.contenido?.data.map((item: any, index: number) => (
          <div
            key={item.id}
            className={`banner-slide slide-${item.id} ${currentSlide === index ? "active" : ""
              }`}
          >
            {/* Background Image */}
            {item.backgroundImage && (
              <div
                className="banner-slide-image"
                style={{
                  backgroundImage: `url(${item.backgroundImage})`,
                }}
              />
            )}

            {/* Gradient Overlay */}
            <div className={`banner-slide-overlay slide-${item.id}`} />

            <div className="banner-background-pattern" />

            <div className="title__container">
              <div className="title__content">
                {item.titulo && (
                  <p className="banner-subtitle">{item.titulo}</p>
                )}

                <h1 className="banner-title">
                  {item.title
                    .split("\n")
                    .map((line: string, lineIndex: number) => (
                      <span key={lineIndex} style={{ display: "block" }}>
                        {line}
                      </span>
                    ))}
                </h1>

                {item.description && (
                  <p className="banner-description">{item.description}</p>
                )}

                {item.buttonText && (
                  <button className="banner-button">{item.buttonText}</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showNavigation && (
        <>
          <button
            className="banner-navigation prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            &#8249;
          </button>
          <button
            className="banner-navigation next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            &#8250;
          </button>
        </>
      )}



      {/* Dots Navigation */}
      {showDots && (
        <div className="banner-dots">
          {data.map((_: any, index: any) => (
            <button
              key={index}
              className={`banner-dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {autoPlay && isPlaying && !isPaused && (
        <div className="banner-progress">
          <div
            className="banner-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Slide Counter */}
      <div className="banner-counter">
        {currentSlide + 1} / {data.length}
      </div>
    </div>
  );
};

export default Banner;
