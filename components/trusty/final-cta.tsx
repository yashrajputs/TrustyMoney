"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function FinalCTA() {
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

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-40 bg-foreground text-background relative overflow-hidden"
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 text-balance font-[family-name:var(--font-space-grotesk)] transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
              transformStyle: "preserve-3d",
              opacity: isVisible ? 1 : 0,
              animation: isVisible ? "textFloat 3s ease-in-out infinite" : "none",
            }}
          >
            <span className="inline-block" style={{ transform: "translateZ(0)" }}>
              Go Global Without Cross-Border Complexity
            </span>
          </h2>
          <p className="text-lg md:text-xl text-background/80 mb-8 md:mb-10 leading-relaxed">
            Build your cross-border stack — one layer at a time. Start accepting international payments with complete
            transparency and zero hidden fees.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90 group">
              Let's Talk
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-all duration-300 animate-pulse" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-background/20 text-background hover:bg-background/10 bg-transparent"
            >
              Talk to Sales
            </Button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes textFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes textGlow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          }
          50% {
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3);
          }
        }
      `}</style>
    </section>
  )
}
