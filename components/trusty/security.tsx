"use client"
import { Shield, Lock, FileCheck2, Globe } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function Security() {
  const [activeCard, setActiveCard] = useState(0)
  const phoneRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Shield,
      title: "Enterprise-grade security architecture",
      description: "Bank-level security protecting your financial data",
    },
    {
      icon: Lock,
      title: "AML & regulatory sanctions screening",
      description: "Built-in frameworks for compliance and risk management",
    },
    {
      icon: FileCheck2,
      title: "Audit-ready documentation",
      description: "Complete paper trail for all transactions and operations",
    },
    {
      icon: Globe,
      title: "Global regulatory compliance",
      description: "Designed to align with compliance frameworks worldwide",
    },
  ]

  const phoneImages = [
    "/mobile-security-dashboard-with-shield-protection.jpg",
    "/aml-compliance-screening-interface.jpg",
    "/audit-documentation-trail-mobile-app.jpg",
    "/global-regulatory-compliance-dashboard.jpg",
  ]

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-secondary/30 overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-[family-name:var(--font-space-grotesk)]">
            Built for Trust, Security & Compliance
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">Enterprise-grade infrastructure you can rely on</p>
        </div>

        <div className="mx-auto max-w-7xl relative">
          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-12 items-center">
            {/* Left cards */}
            <div className="space-y-6">
              {features.slice(0, 2).map((feature, index) => (
                <div
                  key={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`bg-card border rounded-lg p-6 md:p-8 lg:p-10 transition-all duration-500 cursor-pointer relative ${
                    activeCard === index
                      ? "border-primary shadow-lg shadow-primary/20 scale-105"
                      : "hover:border-primary/50 hover:shadow-md hover:-translate-y-1"
                  } opacity-0 animate-fade-in-up`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    opacity: activeCard === index ? 0 : 1,
                    transform: activeCard === index ? "scale(0.8) translateX(-20px)" : "scale(1)",
                    pointerEvents: activeCard === index ? "none" : "auto",
                  }}
                  onClick={() => setActiveCard(index)}
                >
                  <div className={`icon-wrapper-${index}`}>
                    <feature.icon
                      className={`h-10 w-10 mb-4 transition-all duration-300 ${
                        activeCard === index ? "text-primary scale-110" : "text-primary/70"
                      }`}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>

                  {/* Connection dot */}
                  <div
                    className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full transition-all duration-300 ${
                      activeCard === index ? "bg-primary scale-150 animate-pulse" : "bg-primary/30"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Center phone with animated connecting lines */}
            <div className="relative flex items-center justify-center lg:min-h-[600px]">
              {/* Animated connecting lines - SVG for precise paths */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Left side connections */}
                {[0, 1].map((index) => (
                  <line
                    key={`left-${index}`}
                    x1="0"
                    y1={`${25 + index * 50}%`}
                    x2="50%"
                    y2="50%"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className={`transition-all duration-500 ${activeCard === index ? "opacity-100" : "opacity-20"}`}
                    style={{
                      strokeDashoffset: activeCard === index ? 0 : 100,
                      animation: activeCard === index ? "dash 2s linear infinite" : "none",
                    }}
                  />
                ))}

                {/* Right side connections */}
                {[2, 3].map((index) => (
                  <line
                    key={`right-${index}`}
                    x1="50%"
                    y1="50%"
                    x2="100%"
                    y2={`${25 + (index - 2) * 50}%`}
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className={`transition-all duration-500 ${activeCard === index ? "opacity-100" : "opacity-20"}`}
                    style={{
                      strokeDashoffset: activeCard === index ? 0 : 100,
                      animation: activeCard === index ? "dash 2s linear infinite" : "none",
                    }}
                  />
                ))}
              </svg>

              {/* Phone mockup */}
              <div
                ref={phoneRef}
                className="relative z-10 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "200ms" }}
              >
                <div className="relative w-[280px] h-[560px] bg-gray-900 rounded-[45px] shadow-2xl border-8 border-gray-800 overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20" />

                  {/* Screen content */}
                  <div className="relative h-full bg-white overflow-hidden">
                    {phoneImages.map((img, index) => (
                      <img
                        key={index}
                        src={img || "/placeholder.svg"}
                        alt={features[index].title}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                          activeCard === index ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    ))}

                    {/* Floating animation overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 animate-float" />
                  </div>

                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full z-20" />
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 -z-10 bg-primary/20 blur-3xl animate-pulse rounded-full" />
              </div>
            </div>

            {/* Right cards */}
            <div className="space-y-6">
              {features.slice(2, 4).map((feature, index) => {
                const actualIndex = index + 2
                return (
                  <div
                    key={actualIndex}
                    ref={(el) => (cardRefs.current[actualIndex] = el)}
                    className={`bg-card border rounded-lg p-6 md:p-8 lg:p-10 transition-all duration-500 cursor-pointer relative ${
                      activeCard === actualIndex
                        ? "border-primary shadow-lg shadow-primary/20 scale-105"
                        : "hover:border-primary/50 hover:shadow-md hover:-translate-y-1"
                    } opacity-0 animate-fade-in-up`}
                    style={{
                      animationDelay: `${actualIndex * 100}ms`,
                      opacity: activeCard === actualIndex ? 0 : 1,
                      transform: activeCard === actualIndex ? "scale(0.8) translateX(20px)" : "scale(1)",
                      pointerEvents: activeCard === actualIndex ? "none" : "auto",
                    }}
                    onClick={() => setActiveCard(actualIndex)}
                  >
                    <div className={`icon-wrapper-${actualIndex}`}>
                      <feature.icon
                        className={`h-10 w-10 mb-4 transition-all duration-300 ${
                          activeCard === actualIndex ? "text-primary scale-110" : "text-primary/70"
                        }`}
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>

                    {/* Connection dot */}
                    <div
                      className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full transition-all duration-300 ${
                        activeCard === actualIndex ? "bg-primary scale-150 animate-pulse" : "bg-primary/30"
                      }`}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center gap-2 md:gap-3 mt-8 md:mt-12 lg:mt-16">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCard(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeCard === index ? "bg-primary w-8" : "bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Show ${features[index].title}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            filter: drop-shadow(0 0 8px hsl(var(--primary) / 0.6));
          }
          50% {
            filter: drop-shadow(0 0 16px hsl(var(--primary) / 0.9));
          }
        }
        @keyframes rotate-subtle {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Shield icon - Pulse with glow */
        .icon-wrapper-0 {
          animation: pulse-glow 2.5s ease-in-out infinite;
        }
        
        /* Lock icon - Subtle rotate/wiggle */
        .icon-wrapper-1 {
          animation: rotate-subtle 3s ease-in-out infinite;
        }
        
        /* Document/FileCheck icon - Gentle bounce */
        .icon-wrapper-2 {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        
        /* Globe icon - Slow continuous spin */
        .icon-wrapper-3 {
          animation: spin-slow 20s linear infinite;
        }
        
        /* Hover effects for all icons */
        .icon-wrapper-0:hover,
        .icon-wrapper-1:hover,
        .icon-wrapper-2:hover,
        .icon-wrapper-3:hover {
          transform: scale(1.15);
          transition: transform 0.3s ease;
        }
      `}</style>
    </section>
  )
}
