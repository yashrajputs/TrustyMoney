"use client"
import { useState, useRef } from "react"
import { Sparkles, Shield, Building2, Zap, CreditCard } from "lucide-react"
import Image from "next/image"

export function HowItWorks() {
  const steps = [
    {
      icon: Sparkles,
      title: "AI-Powered Billing & Invoicing",
      description: "Smart billing designed for international businesses",
      features: [
        "Automated invoice generation",
        "Country-specific tax calculation",
        "Compliance-ready invoice formats",
        "Usage-based and milestone billing",
        "Accurate payment recognition & tracking",
      ],
      image: "/modern-invoice-dashboard-interface-automated-billi.jpg",
    },
    {
      icon: Shield,
      title: "Built-in Global Tax & Compliance Automation",
      description: "Compliance handled automatically",
      features: [
        "Buyer-country tax logic applied",
        "Sales tax / VAT / GST included where applicable",
        "Compliance-ready documentation generated",
        "AML & regulatory sanctions screening",
      ],
      image: "/tax-compliance-shield-automation-system.jpg",
    },
    {
      icon: Building2,
      title: "Virtual International Payment Accounts",
      description: "Local accounts for global collections",
      features: [
        "Virtual bank accounts in major currencies (USD, GBP, EUR, CAD & more)",
        "Overseas clients pay via local bank transfers",
        "Transparent FX with zero markups",
        "Faster and predictable payment cycles",
        "Hosted checkout pages & APIs",
      ],
      image: "/virtual-bank-accounts-multiple-currencies-internat.jpg",
    },
    {
      icon: Zap,
      title: "Faster INR Settlement",
      description: "Instant settlement without conversion stress",
      features: [
        "Funds collected internationally",
        "Instant settlement to Indian bank accounts",
        "Currency conversion handled by TrustyMoney",
        "Convert anytime — no delays, no pressure",
      ],
      image: "/fast-instant-settlement-lightning-bolt-currency-co.jpg",
    },
    {
      icon: CreditCard,
      title: "Multiple Payment Methods",
      description: "Flexible payment rails for global businesses",
      features: ["Bank-to-bank transfers", "Credit & debit cards", "Stablecoin & crypto payments (optional)"],
      image: "/multiple-payment-methods-cards-bank-transfers-cryp.jpg",
    },
  ]

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-[family-name:var(--font-space-grotesk)]">How It Works</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            End-to-end cross-border payment infrastructure in five integrated steps
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="space-y-8 md:space-y-10 lg:space-y-12">
            {steps.map((step, index) => {
              const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
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
                  
                  const rotateX = ((y - centerY) / centerY) * -8
                  const rotateY = ((x - centerX) / centerX) * 8
                  
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
                  >
                    <div
                      className={`
                        relative transition-transform duration-300 ease-out
                        ${isHovered ? "scale-[1.02]" : "scale-100"}
                      `}
                      style={{
                        transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div
                        className="bg-card border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-2xl opacity-0 animate-fade-in-up"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <div className="flex flex-col md:flex-row gap-0 relative">
                          {/* Glow effect */}
                          {isHovered && (
                            <div
                              className="absolute -inset-1 rounded-lg bg-primary/20 blur-xl opacity-50 transition-opacity duration-300"
                              style={{ zIndex: -1 }}
                            />
                          )}
                          
                          <div 
                            className="relative md:w-2/5 h-64 md:h-auto overflow-hidden"
                            style={{
                              transform: `translateZ(20px)`,
                            }}
                          >
                            <Image
                              src={step.image || "/placeholder.svg"}
                              alt={step.title}
                              fill
                              className="object-cover transition-transform duration-700"
                              style={{
                                transform: isHovered ? "scale(1.1)" : "scale(1)",
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                          </div>
                          <div 
                            className="flex-1 p-8 md:p-10 lg:p-12 relative"
                            style={{
                              transform: `translateZ(30px)`,
                            }}
                          >
                            <div className="flex-shrink-0 mb-4">
                              <div 
                                className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center icon-sparkle-wrapper group-hover:bg-primary/20 transition-colors duration-300"
                                style={{
                                  transform: `translateZ(40px) ${isHovered ? "scale(1.1)" : "scale(1)"}`,
                                }}
                              >
                                <step.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                              </div>
                            </div>
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                              </div>
                              <span 
                                className="text-sm font-medium text-muted-foreground"
                                style={{
                                  transform: `translateZ(25px)`,
                                }}
                              >
                                Step {index + 1}
                              </span>
                            </div>
                            <ul className="space-y-2">
                              {step.features.map((feature, featureIndex) => (
                                <li 
                                  key={featureIndex} 
                                  className="flex items-start gap-2 text-sm"
                                  style={{
                                    transform: `translateZ(${20 + featureIndex * 2}px)`,
                                    transition: `transform 0.3s ease-out ${featureIndex * 50}ms`,
                                  }}
                                >
                                  <span className="text-accent mt-1">•</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              return <StepCard key={index} step={step} index={index} />
            })}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        @keyframes sparkle {
          0%,
          100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.1);
            filter: brightness(1.3);
          }
        }

        .icon-sparkle-wrapper {
          animation: sparkle 2s ease-in-out infinite;
        }

        .icon-sparkle-wrapper:hover {
          animation: sparkle 0.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
