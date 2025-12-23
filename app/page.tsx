import { Hero } from "@/components/trusty/hero"
import { Problem } from "@/components/trusty/problem"
import { Cards3D } from "@/components/trusty/card-3d"
import { Solution } from "@/components/trusty/solution"
import { HowItWorks } from "@/components/trusty/how-it-works"
import { Pricing } from "@/components/trusty/pricing"
import { Comparison } from "@/components/trusty/comparison"
import { AIPowered } from "@/components/trusty/ai-powered"
import { Security } from "@/components/trusty/security"
import { Testimonials } from "@/components/trusty/testimonials"
import { FAQ } from "@/components/trusty/faq"
import { FinalCTA } from "@/components/trusty/final-cta"

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Cards3D />
      <Solution />
      <HowItWorks />
      <Pricing />
      <Comparison />
      <AIPowered />
      <Security />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  )
}
