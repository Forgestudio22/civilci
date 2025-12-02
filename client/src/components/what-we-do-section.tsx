import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, FileSearch, Shield } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Civil Rights Intelligence for Regular People",
    description:
      "Turn messy cases into timelines, maps, and clear summaries. We transform overwhelming documents and scattered evidence into structured intelligence that exposes what happened.",
    accent: "primary",
  },
  {
    icon: FileSearch,
    title: "Forensic Case Reconstruction & Misconduct Analysis",
    description:
      "Rebuild events with precision. Examine warrants, reports, filings, and footage. Identify contradictions, patterns, and rights violations that others miss or hide.",
    accent: "gold",
  },
  {
    icon: Shield,
    title: "Watchdog & Support System Against Abusive Power",
    description:
      "Help people pressured or targeted by local power structures. Provide structure and documentation they can use with lawyers, courts, agencies, and media.",
    accent: "primary",
  },
];

export function WhatWeDoSection() {
  return (
    <section
      className="relative py-20 md:py-32 bg-card/30"
      data-testid="section-what-we-do"
    >
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-section font-bold text-primary mb-4" data-testid="text-what-we-do-title">
            What We Do
          </h2>
          <p className="text-base md:text-lg text-muted-foreground" data-testid="text-what-we-do-description">
            This is bigger than consulting. This is an{" "}
            <span className="text-gold font-medium">intelligence unit for citizens</span> — 
            built to fight back with facts, structure, and forensic precision.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <Card
              key={index}
              className={`relative bg-card border-border hover:-translate-y-1 transition-transform duration-300 overflow-visible ${
                pillar.accent === "gold" ? "border-t-gold" : "border-t-primary"
              } border-t-2`}
              data-testid={`card-pillar-${index}`}
            >
              <CardHeader className="space-y-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    pillar.accent === "gold"
                      ? "bg-gold/10 text-gold"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <pillar.icon className="h-6 w-6" />
                </div>
                <CardTitle className="font-serif text-xl text-foreground leading-tight">
                  {pillar.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 md:gap-4 px-4 md:px-6 py-3 rounded-lg bg-background border border-border">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse hidden sm:block" />
            <p className="text-sm text-muted-foreground" data-testid="text-mission-statement">
              <span className="text-foreground font-medium">Our Mission:</span>{" "}
              Expose abuse. Defend citizens. Document truth.
            </p>
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
