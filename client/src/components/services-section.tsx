import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileStack, Scale, FileText, Users, Clock } from "lucide-react";

const services = [
  {
    icon: FileStack,
    title: "Case Reconstruction Package",
    description:
      "Full timeline, evidence map, contradiction analysis, and strategic summary. We take your scattered documents, footage, and filings and build a forensic-grade reconstruction of what happened.",
    details: [
      "Comprehensive timeline reconstruction",
      "Evidence mapping and cross-referencing",
      "Contradiction and discrepancy analysis",
      "Strategic summary for legal use",
    ],
    forWho: "For anyone buried under paperwork who needs to prove what really happened.",
    pricing: "Contact for pricing",
    featured: true,
  },
  {
    icon: Scale,
    title: "Civil Rights Misconduct Review",
    description:
      "Deep dive into official conduct, cross-county patterns, affidavit/warrant issues, and prosecutorial behavior. We examine the system's actions against established rights and protocols.",
    details: [
      "Rights violation identification",
      "Cross-jurisdiction pattern analysis",
      "Warrant and affidavit examination",
      "Prosecutorial conduct review",
    ],
    forWho: "For those who suspect officials acted outside the law.",
    pricing: "Contact for pricing",
    featured: true,
  },
  {
    icon: FileText,
    title: "Affidavit & Narrative Support",
    description:
      "Helping clients structure their story, affidavits, declarations, and written statements aligned with evidence. We ensure your voice is heard clearly and powerfully.",
    details: [
      "Narrative structuring",
      "Evidence-aligned statements",
      "Affidavit preparation support",
      "Declaration drafting assistance",
    ],
    forWho: "For those who need to tell their story in a way courts take seriously.",
    pricing: "Contact for pricing",
    featured: false,
  },
  {
    icon: Users,
    title: "Pro Se Support (Ongoing)",
    description:
      "Monthly/ongoing structure and support for people representing themselves. We provide the research, organization, and strategic framework you need to navigate the system.",
    details: [
      "Monthly case organization",
      "Filing preparation support",
      "Strategic planning sessions",
      "Document management system",
    ],
    forWho: "For self-represented litigants who need consistent backup.",
    pricing: "Monthly retainer",
    featured: false,
  },
  {
    icon: Clock,
    title: "Strategy Sessions",
    description:
      "60–90 minute focused consult to get clarity and next steps. Bring your questions, documents, and confusion — leave with a clear path forward.",
    details: [
      "Focused 60-90 minute session",
      "Case assessment",
      "Prioritized action items",
      "Strategic recommendations",
    ],
    forWho: "For anyone who needs immediate direction.",
    pricing: "Contact for pricing",
    featured: false,
  },
];

export function ServicesSection() {
  return (
    <section
      className="relative py-20 md:py-32"
      data-testid="section-services"
    >
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-[0.02]">
        <div className="absolute inset-0 bg-gradient-to-l from-gold to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-section font-bold text-primary mb-4" data-testid="text-services-title">
            Our Services
          </h2>
          <p className="text-base md:text-lg text-muted-foreground" data-testid="text-services-description">
            Boutique-level intelligence services. Each engagement is tailored to your 
            situation — because every case of abuse is personal.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {services.slice(0, 2).map((service, index) => (
            <Card
              key={index}
              className="relative bg-card border-border overflow-visible group hover:-translate-y-1 transition-transform duration-300"
              data-testid={`card-service-${index}`}
            >
              <div className="absolute top-4 right-4">
                <Badge className="bg-gold text-gold-foreground">Featured</Badge>
              </div>
              
              <div className="absolute top-0 left-0 w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-transparent" />
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gold to-transparent" />
              </div>

              <CardHeader className="pt-8">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-gold" />
                </div>
                <CardTitle className="font-serif text-2xl text-foreground">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-base mt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-2">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-foreground/80 italic mb-3">
                    {service.forWho}
                  </p>
                  <p className="text-gold font-semibold">{service.pricing}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.slice(2).map((service, index) => (
            <Card
              key={index + 2}
              className="relative bg-card border-border overflow-visible hover:-translate-y-1 transition-transform duration-300"
              data-testid={`card-service-${index + 2}`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />

              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <service.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="font-serif text-xl text-foreground">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm mt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-1.5">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-foreground/80 italic mb-2">
                    {service.forWho}
                  </p>
                  <p className="text-gold font-medium text-sm">{service.pricing}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
