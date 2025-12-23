"use client"
import { Layers } from "lucide-react"
import Image from "next/image"

export function PlatformLayers() {
  const layers = [
    {
      name: "Billing & Invoicing",
      image: "/billing-invoicing-layer-interface.jpg",
    },
    {
      name: "Compliance & AML Controls",
      image: "/compliance-aml-layer-security.jpg",
    },
    {
      name: "Payment Gateway & Checkout",
      image: "/payment-gateway-checkout-layer.jpg",
    },
    {
      name: "Global Collections & Settlement",
      image: "/global-collections-settlement-layer.jpg",
    },
    {
      name: "Treasury & Working Capital",
      image: "/treasury-working-capital-layer.jpg",
    },
    {
      name: "Reporting & Reconciliation",
      image: "/reporting-reconciliation-analytics-layer.jpg",
    },
  ]

  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-20 lg:mb-24">
          <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
            <Layers className="h-6 w-6 md:h-8 md:w-8 text-primary animate-layers-stack" />
            <span className="text-sm md:text-base font-medium text-primary">MODULAR PLATFORM</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-[family-name:var(--font-space-grotesk)]">
            Complete Stack for Cross-Border Operations
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Each layer works independently. Together, they eliminate cross-border friction.
          </p>
        </div>

        <div className="mx-auto max-w-xl">
          <div className="relative">
            {layers.map((layer, index) => (
              <div
                key={index}
                className="group mb-3 bg-card border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:scale-105 opacity-0 animate-fade-in-up"
                style={{
                  transform: `translateY(${index * 4}px)`,
                  zIndex: layers.length - index,
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="relative">
                  <div className="absolute inset-0 overflow-hidden opacity-20 group-hover:opacity-30 transition-opacity">
                    <Image
                      src={layer.image || "/placeholder.svg"}
                      alt={layer.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="relative p-6 md:p-8 lg:p-10 flex items-center justify-between">
                    <span className="font-semibold">{layer.name}</span>
                    <span className="text-sm text-muted-foreground">Layer {index + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes layers-stack {
          0%, 100% {
            transform: translateY(0);
          }
          25% {
            transform: translateY(-2px);
          }
          50% {
            transform: translateY(0);
          }
          75% {
            transform: translateY(2px);
          }
        }

        .animate-layers-stack {
          animation: layers-stack 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
