import { Calendar, Lock, Search, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Calendar,
    title: "Book a Case Review",
    description:
      "Start with an intake and fit check. Tell us what you're facing — we'll determine if we can help and how.",
  },
  {
    number: "02",
    icon: Lock,
    title: "Secure Intake & Evidence",
    description:
      "Gather your documents, footage, and filings in one secure place. We handle your case materials with strict confidentiality.",
  },
  {
    number: "03",
    icon: Search,
    title: "Forensic Reconstruction",
    description:
      "We build your timeline, identify misconduct, map contradictions, and create forensic clarity from chaos.",
  },
  {
    number: "04",
    icon: ArrowRight,
    title: "Strategy Handoff",
    description:
      "Receive a clear, structured record with strategic next steps. You leave equipped to fight back or brief your attorney.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      className="relative py-20 md:py-32 bg-card/30 overflow-hidden"
      data-testid="section-how-it-works"
    >
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gold" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-section font-bold text-primary mb-4" data-testid="text-how-it-works-title">
            How It Works
          </h2>
          <p className="text-base md:text-lg text-muted-foreground" data-testid="text-how-it-works-description">
            From overwhelmed to organized. Our process is designed to be{" "}
            <span className="text-gold">simple, secure, and safe</span> for people who've 
            been through enough already.
          </p>
        </div>

        <div className="hidden lg:block relative mb-8">
          <div className="absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-gold/50 via-primary/50 to-gold/50" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
              data-testid={`step-${index + 1}`}
            >
              <div className="relative bg-background border border-border rounded-lg p-6 lg:p-8 h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute -top-4 left-6 bg-background px-3">
                  <span className="font-serif text-3xl font-bold text-gold">
                    {step.number}
                  </span>
                </div>

                <div className="pt-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center">
                      <ArrowRight className="h-3 w-3 text-gold" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-block px-6 md:px-8 py-4 rounded-lg border border-gold/30 bg-gold/5">
            <p className="text-foreground font-medium" data-testid="text-cta-headline">
              Ready to turn chaos into clarity?
            </p>
            <p className="text-sm text-muted-foreground mt-1" data-testid="text-cta-subline">
              Your first step is just a message away.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
