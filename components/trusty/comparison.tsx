"use client"

import { Check, X } from "lucide-react"

export function Comparison() {
  const features = [
    { name: "FX Transparency", banks: false, gateways: false, trusty: true },
    { name: "Virtual Intl Accounts", banks: false, gateways: false, trusty: true },
    { name: "Billing + Compliance", banks: false, gateways: false, trusty: true },
    { name: "Faster Settlement", banks: false, gateways: false, trusty: true },
    { name: "Crypto / Stablecoin", banks: false, gateways: false, trusty: true },
  ]

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-secondary/30 overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-20 lg:mb-24 opacity-0 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-[family-name:var(--font-space-grotesk)]">
            Why Businesses Choose Trusty Money
          </h2>
        </div>

        <div
          className="mx-auto max-w-4xl overflow-x-auto opacity-0 animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <table className="w-full bg-card border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <thead className="opacity-0 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <tr className="border-b bg-muted/30">
                <th className="text-left p-4 font-semibold">Feature</th>
                <th className="text-center p-4 font-semibold">Banks</th>
                <th className="text-center p-4 font-semibold">Gateways</th>
                <th className="text-center p-4 font-semibold bg-primary/10 relative">
                  <span className="relative z-10">TrustyMoney</span>
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/20 animate-pulse"
                    style={{ animationDuration: "3s" }}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className="border-b last:border-b-0 opacity-0 animate-fade-in-up hover:bg-muted/20 transition-all duration-300 group"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <td className="p-4 font-medium group-hover:translate-x-1 transition-transform duration-300">
                    {feature.name}
                  </td>
                  <td className="text-center p-4">
                    {feature.banks ? (
                      <Check className="h-5 w-5 text-accent mx-auto transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground mx-auto transition-all duration-300 group-hover:scale-110 opacity-40" />
                    )}
                  </td>
                  <td className="text-center p-4">
                    {feature.gateways ? (
                      <Check className="h-5 w-5 text-accent mx-auto transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground mx-auto transition-all duration-300 group-hover:scale-110 opacity-40" />
                    )}
                  </td>
                  <td className="text-center p-4 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300 relative">
                    {feature.trusty ? (
                      <div className="relative inline-block">
                        <Check className="h-5 w-5 text-accent mx-auto transition-all duration-300 group-hover:scale-150 group-hover:rotate-[360deg] relative z-10" />
                        <div className="absolute inset-0 blur-md bg-accent/0 group-hover:bg-accent/30 rounded-full transition-all duration-300 scale-0 group-hover:scale-150" />
                      </div>
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground mx-auto transition-all duration-300 group-hover:scale-110 opacity-40" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
