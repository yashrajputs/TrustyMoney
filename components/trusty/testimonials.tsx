"use client"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Trusty Money transformed how we handle international payments. The transparency and speed are game-changing for our global operations.",
      author: "Sarah Chen",
      role: "CFO, TechCorp International",
      rating: 5,
    },
    {
      quote:
        "Finally, a solution that understands the complexity of cross-border business. The compliance automation alone has saved us countless hours.",
      author: "Raj Patel",
      role: "Finance Director, Global Services Ltd",
      rating: 5,
    },
    {
      quote:
        "The virtual accounts feature is brilliant. Our clients can pay locally while we receive instant INR settlements. It's exactly what we needed.",
      author: "Maria Rodriguez",
      role: "Head of Operations, Export Solutions",
      rating: 5,
    },
  ]

  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-[family-name:var(--font-space-grotesk)]">
            Trusted by Global Businesses
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">See what our customers say about their experience</p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card border rounded-lg p-6 md:p-8 lg:p-10 hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-accent text-accent transition-all duration-300 hover:scale-125 hover:rotate-12 animate-pulse"
                      style={{ animationDelay: `${i * 100}ms`, animationDuration: "2s" }}
                    />
                  ))}
                </div>
                <p className="text-sm mb-6 leading-relaxed">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
