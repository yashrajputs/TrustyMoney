"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import RotatingEarth from "./rotating-earth"

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const x = (e.clientX - centerX) / (rect.width / 2)
      const y = (e.clientY - centerY) / (rect.height / 2)
      
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])
  const title = "The Operating System for Cross-Border Business"
  const words = title.split(" ")

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden bg-background pt-20 pb-32 md:pt-24 md:pb-40 lg:pt-28 lg:pb-48"
    >
      {/* Background Globe */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <RotatingEarth 
          width={1200} 
          height={1200} 
          className="h-full w-full" 
          opacity={0.15}
          isBackground={true}
        />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center relative z-10">
            {/* Content Column */}
            <div className="w-full">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-secondary/50 px-4 py-1.5 text-sm">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-muted-foreground">Financial infrastructure for global businesses</span>
              </div>

              <h1 
                className="mb-6 text-5xl font-bold tracking-tight text-balance font-[family-name:var(--font-space-grotesk)] lg:text-6xl"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <span className="inline-block">
                  {words.map((word, index) => (
                    <span
                      key={index}
                      className="inline-block mr-2 transition-all duration-300"
                      style={{
                        animation: `wordSlideIn 0.6s ease-out ${index * 100}ms forwards`,
                        opacity: isVisible ? 1 : 0,
                        transform: `translateZ(${index * 5}px)`,
                        background: `linear-gradient(135deg, hsl(${(index * 30) % 360}, 70%, 60%), hsl(${(index * 30 + 60) % 360}, 70%, 50%))`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        filter: `hue-rotate(${mousePosition.x * 20}deg)`,
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              </h1>

              <p className="mb-8 text-lg text-muted-foreground text-balance leading-relaxed">
                Financial infrastructure purpose-built for cross-border business. Accept international payments,
                automate billing and tax compliance, collect funds through local virtual accounts, and receive instant
                INR settlements — all with zero FX markup and complete transparency.
              </p>

              <p className="mb-10 text-sm text-muted-foreground">
                Designed for billing, compliance, payments, FX, treasury and working capital
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group">
                  Let's Talk
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 animate-pulse" />
                </Button>
                <Button size="lg" variant="outline">
                  Talk to Our Team
                </Button>
              </div>
            </div>

            {/* Centered Globe */}
            <div className="h-[700px] md:h-[800px] lg:h-[900px] w-full relative z-10 flex items-center justify-center overflow-hidden">
              <RotatingEarth width={1600} height={900} className="h-full w-full max-w-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <style jsx global>{`
        @keyframes wordSlideIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  )
}
