"use client"

import { Brain, FileCheck, SearchCheck, BarChart3 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function AIPowered() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const features = [
    {
      icon: Brain,
      title: "Intelligent billing & reconciliation",
      description: "AI-powered automation for accurate financial operations",
      image: "/ai-powered-financial-billing-automation-dashboard.jpg",
    },
    {
      icon: FileCheck,
      title: "Automated compliance checks",
      description: "Stay compliant across all jurisdictions automatically",
      image: "/automated-compliance-verification-system.jpg",
    },
    {
      icon: SearchCheck,
      title: "Payment recognition & anomaly detection",
      description: "Detect and prevent issues before they impact your business",
      image: "/payment-anomaly-detection-analytics.jpg",
    },
    {
      icon: BarChart3,
      title: "Smart reporting and insights",
      description: "Actionable intelligence from your financial data",
      image: "/financial-intelligence-reporting-dashboard.jpg",
    },
  ]

  const cardsPerView = 4
  const maxIndex = Math.max(0, features.length - cardsPerView)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-4xl font-bold mb-4 md:mb-6 font-[family-name:var(--font-space-grotesk)] md:text-5xl lg:text-6xl">
            AI-Powered Finance Intelligence
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Advanced AI capabilities built into every layer of the platform
          </p>
        </div>

        <div className="relative mx-auto max-w-7xl pl-6 md:pl-8 lg:pl-12 pr-6 md:pr-8 lg:pr-12">
          <div className="overflow-hidden">
            <div
              className="flex gap-6 md:gap-8 lg:gap-10 transition-transform duration-500 ease-out items-stretch"
              style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-card border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1 opacity-0 animate-fade-in-up flex-shrink-0 flex flex-col h-full"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    width: `calc((100% - ${(cardsPerView - 1) * 40}px) / ${cardsPerView})`,
                  }}
                >
                  <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden flex-shrink-0">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-6 md:p-8 lg:p-10 flex flex-col flex-grow">
                    <div className={`icon-ai-${index} mb-4 md:mb-6 flex-shrink-0`}>
                      <feature.icon className="h-10 w-10 md:h-12 md:w-12 text-primary transition-all duration-300 group-hover:scale-125" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 leading-tight flex-shrink-0">{feature.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-grow">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>


          <div className="flex justify-center gap-2 md:gap-3 mt-8 md:mt-12 lg:mt-16">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes brain-pulse {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.08);
            filter: brightness(1.3);
          }
        }

        @keyframes check-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes search-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes chart-grow {
          0%, 100% {
            transform: scaleY(1);
            transform-origin: bottom;
          }
          50% {
            transform: scaleY(1.15);
            transform-origin: bottom;
          }
        }

        /* Brain icon - Pulse with glow */
        .icon-ai-0 {
          animation: brain-pulse 2.5s ease-in-out infinite;
        }

        /* FileCheck icon - Bounce */
        .icon-ai-1 {
          animation: check-bounce 2s ease-in-out infinite;
        }

        /* SearchCheck icon - Slow rotate */
        .icon-ai-2 {
          animation: search-rotate 8s linear infinite;
        }

        /* BarChart3 icon - Growth animation */
        .icon-ai-3 {
          animation: chart-grow 2s ease-in-out infinite;
        }

        .icon-ai-0:hover,
        .icon-ai-1:hover,
        .icon-ai-2:hover,
        .icon-ai-3:hover {
          animation-duration: 1s;
        }
      `}</style>
    </section>
  )
}
