"use client"
import { AlertCircle, FileText, Clock, TrendingDown } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export function Problem() {
  const [displayedText, setDisplayedText] = useState("")
  const fullText = "Cross-Border Payment Operations Are More Than Just Transactions"
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
        setIsAnimating(false)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const problems = [
    {
      icon: FileText,
      title: "Manual invoicing",
      description: "Invoicing is manual and inconsistent across countries",
      image: "/manual-invoice-documents-scattered-messy-paperwork.jpg",
    },
    {
      icon: AlertCircle,
      title: "Fragmented compliance",
      description: "Compliance requirements change by geography and transaction type",
      image: "/complex-compliance-regulations-network-map.jpg",
    },
    {
      icon: Clock,
      title: "Expensive & slow collections",
      description: "Banks add hidden FX margins, settlements are slow",
      image: "/slow-loading-payment-processing-hourglass.jpg",
    },
    {
      icon: TrendingDown,
      title: "Poor cash-flow visibility",
      description: "Lack visibility over global cash flows and working capital",
      image: "/unclear-blurry-financial-dashboard-charts.jpg",
    },
  ]

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-[family-name:var(--font-space-grotesk)]">
            <span className="inline-block">
              {displayedText.split("").map((char, index) => (
                <span
                  key={index}
                  className="inline-block animate-char-reveal"
                  style={{
                    animationDelay: `${index * 30}ms`,
                    animationFillMode: "both",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
              {isAnimating && (
                <span className="inline-block w-1 h-8 md:h-10 lg:h-12 bg-primary ml-1 animate-blink" />
              )}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            The friction exists across billing, compliance, payments, settlement, and working capital. Finance teams
            spend time stitching systems together instead of running the business.
          </p>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="overflow-x-auto scrollbar-hide scroll-smooth pb-4">
            <div className="flex gap-6 md:gap-8 lg:gap-10 min-w-max pl-6 md:pl-8 lg:pl-12">
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className="group bg-card border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1 opacity-0 animate-fade-in-up flex-shrink-0"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    width: "320px",
                    minWidth: "320px",
                  }}
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={problem.image || "/placeholder.svg"}
                      alt={problem.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 md:p-8 lg:p-10">
                    <div className={`icon-problem-${index} mb-4 md:mb-6`}>
                      <problem.icon className="h-10 w-10 md:h-12 md:w-12 text-primary transition-all duration-300 group-hover:scale-125" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 leading-tight">{problem.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-2px) rotate(-2deg);
          }
          75% {
            transform: translateX(2px) rotate(2deg);
          }
        }

        @keyframes pulse-scale {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes tick-tock {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-10deg);
          }
          75% {
            transform: rotate(10deg);
          }
        }

        @keyframes drop {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        /* FileText icon - Shake */
        .icon-problem-0 {
          animation: shake 2s ease-in-out infinite;
        }

        /* AlertCircle icon - Pulse */
        .icon-problem-1 {
          animation: pulse-scale 2s ease-in-out infinite;
        }

        /* Clock icon - Tick-tock */
        .icon-problem-2 {
          animation: tick-tock 2s ease-in-out infinite;
        }

        /* TrendingDown icon - Drop */
        .icon-problem-3 {
          animation: drop 2s ease-in-out infinite;
        }

        .icon-problem-0:hover,
        .icon-problem-1:hover,
        .icon-problem-2:hover,
        .icon-problem-3:hover {
          animation-duration: 0.5s;
        }

        @keyframes char-reveal {
          from {
            opacity: 0;
            transform: translateY(20px) rotateX(90deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }

        .animate-char-reveal {
          animation: char-reveal 0.5s ease-out forwards;
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </section>
  )
}
