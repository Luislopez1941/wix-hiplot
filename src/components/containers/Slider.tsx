"use client"

import type React from "react"
import { useEffect, useState } from "react"
import "./styles/Silder.css"

interface ClientLogo {
  id: number
  logo: string
  name: string
  website?: string
}

interface ClientsSliderProps {
  clients?: ClientLogo[]
  title?: string
  subtitle?: string
  speed?: "slow" | "normal" | "fast"
  pauseOnHover?: boolean
  showNames?: boolean
  grayscale?: boolean
}

const ClientsSlider: React.FC<ClientsSliderProps> = ({
  clients = defaultClients,
  title = "Our Clients",
  subtitle = "Companies that trust us",
  speed = "normal",
  pauseOnHover = true,
  showNames = false,
  grayscale = true,
}) => {
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate clients for smooth infinite effect
  const duplicatedClients = [...clients, ...clients]

  const getSpeedDuration = (speedType: string) => {
    switch (speedType) {
      case "slow":
        return "60s"
      case "fast":
        return "20s"
      default:
        return "40s"
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
    root.style.setProperty("--animation-duration", getSpeedDuration(speed))
  }, [speed])

  return (
    <div className="clients-container">
      {/* Header */}
      <div className="clients-header">
        <h2 className="clients-title">{title}</h2>
        <p className="clients-subtitle">{subtitle}</p>
      </div>

      {/* Slider */}
      <div className="clients-wrapper">
        <div
          className={`clients-marquee ${isPaused ? "paused" : ""} ${grayscale ? "grayscale" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="marquee-track">
            {duplicatedClients.map((client, index) => (
              <div key={`${client.id}-${index}`} className="client-item">
                <div className="client-card">
                  <img
                    src={client.logo || "/placeholder.svg"}
                    alt={`${client.name} logo`}
                    className="client-logo"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=80&width=120&query=company+logo"
                    }}
                  />
                  {showNames && (
                    <div className="client-overlay">
                      <span className="client-name">{client.name}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Masks */}
        <div className="gradient-left"></div>
        <div className="gradient-right"></div>
      </div>

      {/* Stats */}
      <div className="clients-stats">
        <div className="stat-item">
          <span className="stat-number">{clients.length}+</span>
          <span className="stat-label">Clients</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">100%</span>
          <span className="stat-label">Satisfaction</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">24/7</span>
          <span className="stat-label">Support</span>
        </div>
      </div>
    </div>
  )
}

// Sample data with test images
const defaultClients: ClientLogo[] = [
  {
    id: 1,
    logo: "https://picsum.photos/150/80?random=101",
    name: "TechCorp Solutions",
    website: "https://techcorp.com",
  },
  {
    id: 2,
    logo: "https://picsum.photos/150/80?random=102",
    name: "Innovate Industries",
    website: "https://innovate.com",
  },
  {
    id: 3,
    logo: "https://picsum.photos/150/80?random=103",
    name: "Global Dynamics",
    website: "https://global.com",
  },
  {
    id: 4,
    logo: "https://picsum.photos/150/80?random=104",
    name: "Future Systems",
    website: "https://future.com",
  },
  {
    id: 5,
    logo: "https://picsum.photos/150/80?random=105",
    name: "Nexus Technologies",
    website: "https://nexus.com",
  },
  {
    id: 6,
    logo: "https://picsum.photos/150/80?random=106",
    name: "Quantum Labs",
    website: "https://quantum.com",
  },
  {
    id: 7,
    logo: "https://picsum.photos/150/80?random=107",
    name: "Apex Corporation",
    website: "https://apex.com",
  },
  {
    id: 8,
    logo: "https://picsum.photos/150/80?random=108",
    name: "Vertex Group",
    website: "https://vertex.com",
  },
]

export default ClientsSlider
