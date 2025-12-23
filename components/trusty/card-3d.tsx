"use client"

import { useState, useRef, useEffect } from "react"
import { 
  Zap, 
  Shield, 
  Globe, 
  Rocket,
  Sparkles,
  TrendingUp
} from "lucide-react"

interface Card3DProps {
  icon: any
  title: string
  description: string
  gradient: string
  delay?: number
}

function Card3D({ icon: Icon, title, description, gradient, delay = 0 }: Card3DProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10
    
    setMousePosition({ x: rotateY, y: rotateX })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <div
      ref={cardRef}
      className="perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <div
        className={`
          relative w-full h-full
          transition-transform duration-300 ease-out
          ${isHovered ? "scale-105" : "scale-100"}
        `}
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className={`
            relative h-full w-full rounded-2xl
            bg-gradient-to-br ${gradient}
            p-8 shadow-2xl
            border border-white/20
            overflow-hidden
            transition-all duration-300
            ${isHovered ? "shadow-3xl" : ""}
            opacity-0 animate-card-3d-in
          `}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
            <div 
              className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.1)_50%,transparent_70%)]"
              style={{
                transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
                transition: "transform 3s ease-in-out",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Icon */}
            <div
              className={`
                mb-6 transition-transform duration-300
                ${isHovered ? "scale-110 rotate-3" : ""}
              `}
              style={{
                transform: `translateZ(50px)`,
              }}
            >
              <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Icon className="h-8 w-8 text-white" />
              </div>
            </div>

            {/* Title */}
            <h3
              className="text-2xl font-bold text-white mb-3"
              style={{
                transform: `translateZ(30px)`,
              }}
            >
              {title}
            </h3>

            {/* Description */}
            <p
              className="text-white/80 text-sm leading-relaxed flex-grow"
              style={{
                transform: `translateZ(20px)`,
              }}
            >
              {description}
            </p>

            {/* Shine effect on hover */}
            {isHovered && (
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
                  transform: "translateX(-100%) translateY(-100%)",
                  animation: "shine 0.6s ease-in-out",
                }}
              />
            )}
          </div>

          {/* Glow effect */}
          <div
            className={`
              absolute -inset-1 rounded-2xl blur-xl opacity-50
              bg-gradient-to-br ${gradient}
              transition-opacity duration-300
              ${isHovered ? "opacity-75" : "opacity-0"}
            `}
            style={{ zIndex: -1 }}
          />
        </div>
      </div>
    </div>
  )
}

export function Cards3D() {
  const cards = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Ultra-fast processing with real-time updates and instant responses for all your operations.",
      gradient: "from-yellow-400 via-orange-500 to-red-500",
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Bank-level security with end-to-end encryption and advanced fraud protection systems.",
      gradient: "from-blue-400 via-indigo-500 to-purple-500",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with businesses worldwide through our extensive international network infrastructure.",
      gradient: "from-teal-400 via-cyan-500 to-blue-500",
    },
    {
      icon: Rocket,
      title: "Scale Instantly",
      description: "Grow your business without limits. Our platform scales automatically with your needs.",
      gradient: "from-pink-400 via-rose-500 to-red-500",
    },
    {
      icon: Sparkles,
      title: "AI Powered",
      description: "Intelligent automation powered by advanced AI to streamline your workflow processes.",
      gradient: "from-violet-400 via-purple-500 to-fuchsia-500",
    },
    {
      icon: TrendingUp,
      title: "Analytics & Insights",
      description: "Get deep insights into your business with comprehensive analytics and reporting tools.",
      gradient: "from-emerald-400 via-green-500 to-teal-500",
    },
  ]

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-[family-name:var(--font-space-grotesk)]">
            Powerful Features
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Experience the future of business operations with our cutting-edge platform
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl w-full">
            {cards.map((card, index) => (
              <div key={index} className="h-[320px] flex justify-center items-center">
                <div className="w-full h-full">
                  <Card3D
                    icon={card.icon}
                    title={card.title}
                    description={card.description}
                    gradient={card.gradient}
                    delay={index * 100}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        @keyframes card-3d-in {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-card-3d-in {
          animation: card-3d-in 0.6s ease-out forwards;
        }

        @keyframes shine {
          to {
            transform: translateX(200%) translateY(200%);
          }
        }
      `}</style>
    </section>
  )
}

