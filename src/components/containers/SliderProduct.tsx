"use client"

import type React from "react"
import { useEffect, useState } from "react"
import "./styles/SliderProduct.css"

interface SliderItem {
  id: number
  imagen: string
  title?: string
  description?: string
}

interface AutomaticSliderProps {
  items: SliderItem[]
  title?: string
  description?: string
  speed?: "slow" | "normal" | "fast"
  direction?: "left" | "right"
  pauseOnHover?: boolean
  showControls?: boolean
}

const AutomaticSlider: React.FC<AutomaticSliderProps> = ({
  items = defaultItems,
  title = "Nuestros Productos",
  description = "Descubre nuestra amplia gama de productos de alta calidad",
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
  showControls = false,
}) => {
  const [isPaused, setIsPaused] = useState(false)
  const [currentSpeed, setCurrentSpeed] = useState(speed)

  // Duplicar items para efecto infinito suave
  const duplicatedItems = [...items, ...items]

  const getSpeedDuration = (speedType: string) => {
    switch (speedType) {
      case "slow":
        return "80s"
      case "fast":
        return "30s"
      default:
        return "50s"
    }
  }

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true)
    }
  }

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false)
    }
  }

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty("--animation-duration", getSpeedDuration(currentSpeed))
    root.style.setProperty("--animation-direction", direction === "left" ? "normal" : "reverse")
  }, [currentSpeed, direction])

  if (items.length === 0) {
    return (
      <div className="slider-container">
        <div className="slider-header">
          <h2 className="slider-title">{title}</h2>
          <p className="slider-description">No hay elementos para mostrar</p>
        </div>
      </div>
    )
  }

  return (
    <div className="slider-container">
      {/* Header */}
      <div className="slider-header">
        <h2 className="slider-title">{title}</h2>
        <p className="slider-description">{description}</p>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="slider-controls">
          <button
            className={`control-btn ${currentSpeed === "slow" ? "active" : ""}`}
            onClick={() => setCurrentSpeed("slow")}
          >
            Lento
          </button>
          <button
            className={`control-btn ${currentSpeed === "normal" ? "active" : ""}`}
            onClick={() => setCurrentSpeed("normal")}
          >
            Normal
          </button>
          <button
            className={`control-btn ${currentSpeed === "fast" ? "active" : ""}`}
            onClick={() => setCurrentSpeed("fast")}
          >
            Rápido
          </button>
          <button className="control-btn" onClick={() => setIsPaused(!isPaused)}>
            {isPaused ? "▶️" : "⏸️"}
          </button>
        </div>
      )}

      {/* Slider */}
      <div className="slider-wrapper">
        <div
          className={`marquee ${isPaused ? "paused" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="marquee-group">
            {duplicatedItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="slider-item">
                <div className="item-image-container">
                  <img
                    src={item.imagen || "/placeholder.svg"}
                    alt={item.title || `Producto ${item.id}`}
                    className="item-image"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=200&width=200&query=product+image"
                    }}
                  />
                  <div className="item-overlay">
                    {item.title && <h3 className="item-title">{item.title}</h3>}
                    {item.description && <p className="item-description">{item.description}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Masks */}
        <div className="gradient-mask gradient-left"></div>
        <div className="gradient-mask gradient-right"></div>
      </div>

      {/* Progress Indicator */}
      <div className="progress-container">
        <div className={`progress-bar ${isPaused ? "paused" : ""}`}></div>
      </div>
    </div>
  )
}

// Datos de ejemplo con imágenes Lorem Ipsum
const defaultItems: SliderItem[] = [
  {
    id: 1,
    imagen: "https://picsum.photos/300/300?random=1",
    title: "Producto Premium",
    description: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    id: 2,
    imagen: "https://picsum.photos/300/300?random=2",
    title: "Tecnología Avanzada",
    description: "Adipiscing elit sed do eiusmod tempor",
  },
  {
    id: 3,
    imagen: "https://picsum.photos/300/300?random=3",
    title: "Diseño Moderno",
    description: "Incididunt ut labore et dolore magna",
  },
  {
    id: 4,
    imagen: "https://picsum.photos/300/300?random=4",
    title: "Calidad Superior",
    description: "Aliqua enim ad minim veniam quis",
  },
  {
    id: 5,
    imagen: "https://picsum.photos/300/300?random=5",
    title: "Innovación",
    description: "Nostrud exercitation ullamco laboris",
  },
  {
    id: 6,
    imagen: "https://picsum.photos/300/300?random=6",
    title: "Experiencia Única",
    description: "Nisi ut aliquip ex ea commodo consequat",
  },
  {
    id: 7,
    imagen: "https://picsum.photos/300/300?random=7",
    title: "Rendimiento",
    description: "Duis aute irure dolor in reprehenderit",
  },
  {
    id: 8,
    imagen: "https://picsum.photos/300/300?random=8",
    title: "Elegancia",
    description: "Voluptate velit esse cillum dolore",
  },
]

export default AutomaticSlider
