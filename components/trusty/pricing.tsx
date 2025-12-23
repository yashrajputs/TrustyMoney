"use client"

import { Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function Pricing() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const phoneRef = useRef<HTMLDivElement>(null)

  const images = [
    {
      src: "/images/trusty-app-exchange-screen.png",
      alt: "Real Time Exchange",
    },
    {
      src: "/images/image.png",
      alt: "Pricing Example",
    },
    {
      src: "/mobile-app-dashboard-showing-transaction-history-a.jpg",
      alt: "Transaction Dashboard",
    },
    {
      src: "/mobile-app-showing-real-time-currency-exchange-rat.jpg",
      alt: "Exchange Rates",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 },
    )

    if (phoneRef.current) {
      observer.observe(phoneRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isVisible, images.length])

  return (
    <section id="pricing" className="py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-[family-name:var(--font-space-grotesk)]">
            Transparent Pricing. No Hidden FX Margins.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Trusty Money charges transaction-based fees only for payment processing. Other modules are priced
            independently.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center max-w-6xl mx-auto">
          <div className="mx-auto max-w-2xl bg-card border rounded-lg p-8 md:p-10 lg:p-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Simple Pricing</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent mt-0.5 animate-check-pop" style={{ animationDelay: "0ms" }} />
                    <div>
                      <p className="font-semibold">Starting from 0.49%</p>
                      <p className="text-sm text-muted-foreground">Per transaction</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check
                      className="h-5 w-5 text-accent mt-0.5 animate-check-pop"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div>
                      <p className="font-semibold">Zero FX markup</p>
                      <p className="text-sm text-muted-foreground">Real-time mid-market rate</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check
                      className="h-5 w-5 text-accent mt-0.5 animate-check-pop"
                      style={{ animationDelay: "300ms" }}
                    />
                    <div>
                      <p className="font-semibold">All fees disclosed upfront</p>
                      <p className="text-sm text-muted-foreground">Complete transparency</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/30 rounded-lg p-6">
                <h4 className="font-semibold mb-3">Example</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  If the USD to INR rate is ₹90.91 today, that's exactly what you get.
                </p>
                <div className="bg-card rounded p-4 border">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Exchange Rate</span>
                    <span className="font-mono font-semibold">₹90.91</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Your Rate</span>
                    <span className="font-mono font-semibold text-accent">₹90.91</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={phoneRef}
            className={`relative flex justify-center lg:justify-end transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            {/* Phone frame */}
            <div className="relative w-[320px] h-[650px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl ring-1 ring-gray-800">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10" />

              {/* Screen */}
              <div className="relative h-full bg-white rounded-[2.5rem] overflow-hidden">
                {/* Status bar */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-white z-10 flex items-center justify-between px-8 pt-2">
                  <span className="text-xs font-semibold">9:41</span>
                  <div className="flex gap-1 items-center">
                    <div className="w-4 h-3 border border-gray-900 rounded-sm relative">
                      <div className="absolute inset-0.5 bg-gray-900 rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* Content with cycling images */}
                <div className="absolute inset-0 pt-12 pb-2">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        index === currentImageIndex ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        className="w-full h-full object-cover animate-float"
                      />
                    </div>
                  ))}
                </div>

                {/* Home indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-900/30 rounded-full z-10" />
              </div>

              {/* Side buttons */}
              <div className="absolute -left-[2px] top-24 w-[2px] h-8 bg-gray-800 rounded-l" />
              <div className="absolute -left-[2px] top-36 w-[2px] h-12 bg-gray-800 rounded-l" />
              <div className="absolute -left-[2px] top-52 w-[2px] h-12 bg-gray-800 rounded-l" />
              <div className="absolute -right-[2px] top-36 w-[2px] h-20 bg-gray-800 rounded-r" />
            </div>

            {/* Floating glow effect */}
            <div
              className={`absolute inset-0 -z-10 transition-opacity duration-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
            </div>

            {/* Pagination dots outside the phone frame */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? "bg-accent w-6" : "bg-gray-400"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes check-pop {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          60% {
            transform: scale(1.2) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        .animate-check-pop {
          animation: check-pop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}
