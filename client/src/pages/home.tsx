import { useRef } from "react";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { WhatWeDoSection } from "@/components/what-we-do-section";
import { ServicesSection } from "@/components/services-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const whatWeDoRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      hero: heroRef,
      "what-we-do": whatWeDoRef,
      services: servicesRef,
      "how-it-works": howItWorksRef,
      about: aboutRef,
      contact: contactRef,
    };
    
    const ref = refs[section];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation onNavigate={scrollToSection} />
      
      <main>
        <div ref={heroRef}>
          <HeroSection onNavigate={scrollToSection} />
        </div>
        
        <div ref={whatWeDoRef}>
          <WhatWeDoSection />
        </div>
        
        <div ref={servicesRef}>
          <ServicesSection />
        </div>
        
        <div ref={howItWorksRef}>
          <HowItWorksSection />
        </div>
        
        <div ref={aboutRef}>
          <AboutSection />
        </div>
        
        <div ref={contactRef}>
          <ContactSection />
        </div>
      </main>

      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
