import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "What makes Trusty Money different from traditional payment gateways?",
      answer:
        "Trusty Money is a complete operating system for cross-border business, not just a payment gateway. We handle billing, compliance, payments, and settlement in one unified platform with zero FX markup and complete transparency.",
    },
    {
      question: "How does the zero FX markup work?",
      answer:
        "We provide the real-time mid-market exchange rate without any hidden markups. If the USD to INR rate is ₹90.91, that's exactly what you get. We only charge a transparent transaction fee starting from 0.49%.",
    },
    {
      question: "What currencies do you support?",
      answer:
        "We support major global currencies including USD, GBP, EUR, CAD, and more through virtual bank accounts. Your international clients can pay in their local currency while you receive instant INR settlements.",
    },
    {
      question: "How quickly can I receive settlements?",
      answer:
        "Settlements to your Indian bank account are instant. You have complete control over conversion timing and can convert anytime without delays or pressure.",
    },
    {
      question: "Is the platform compliant with international regulations?",
      answer:
        "Yes, we have built-in AML and regulatory sanctions screening, automatic tax compliance for different jurisdictions, and audit-ready documentation. We're designed to align with global regulatory frameworks.",
    },
    {
      question: "Can I use individual modules or do I need the complete platform?",
      answer:
        "Each module is a standalone product that can be used independently. You can start with just payment collection or billing, and add other modules as your needs grow.",
    },
  ]

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-16 md:mb-20 lg:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-[family-name:var(--font-space-grotesk)]">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">Everything you need to know about Trusty Money</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
