"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export function Solution() {
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
      <div className="absolute inset-0 opacity-10">
        <Image src="/placeholder.svg?height=800&width=1600" alt="Global network" fill className="object-cover" />
      </div>
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 font-[family-name:var(--font-space-grotesk)] transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
              transformStyle: "preserve-3d",
              opacity: isVisible ? 1 : 0,
              animation: isVisible ? "textFloat 3s ease-in-out infinite" : "none",
            }}
          >
            <span className="inline-block" style={{ transform: "translateZ(0)" }}>
              We Are Rebuilding the Entire Infrastructure for Cross-Border Money Flow
            </span>
          </h2>
          <p className="text-lg md:text-xl text-background/80 leading-relaxed mb-4 md:mb-6">
            Trusty Money is not just a payment gateway. It is a complete operating system for global collections —
            designed to handle billing, compliance, payment collection, conversion, and settlement in one unified
            platform.
          </p>
          <p className="text-base md:text-lg text-background/70">
            Each component below is a standalone product that can be used independently or together.
          </p>
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
