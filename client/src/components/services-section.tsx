import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileStack, 
  Scale, 
  FileText, 
  Users, 
  Clock, 
  FolderOpen, 
  FileWarning, 
  Map, 
  Shield 
} from "lucide-react";

const services = [
  {
    icon: FileStack,
    title: "Case Reconstruction Package",
    tagline: "A forensic rebuild of everything that happened.",
    description:
      "We rebuild your entire case from scratch — in the correct order, with evidence attached, contradictions highlighted, and every act of misconduct exposed.",
    perfectFor: "Messy, chaotic, long-running, manipulated, or overwhelming cases.",
    details: [
      "Master timeline (with citations)",
      "Evidence map (docs, screenshots, footage, links)",
      "Officer/official breakdown",
      "County crossover map",
      "Affidavit/warrant contradiction analysis",
      "Missing-evidence flags",
      "Pattern recognition",
      "Strategy summary for lawyers, court, or media",
    ],
    whyMatters: "Because corruption thrives on confusion. We turn confusion into clarity — and clarity into a weapon.",
    pricing: "$2,000–$3,500",
    featured: true,
  },
  {
    icon: Scale,
    title: "Civil Rights Misconduct Review",
    tagline: "We expose what they hoped you'd miss.",
    description:
      "A deep dive into actions taken by law enforcement, prosecutors, county officials, or agencies through a civil-rights lens.",
    perfectFor: "Anyone suspecting wrongdoing by officers, prosecutors, county officials, or agencies.",
    details: [
      "Warrant and affidavit breakdown",
      "\"Plain view\" and probable cause analysis",
      "Illegal search indicators",
      "Use-of-force/misconduct review",
      "Rights violation tracking",
      "Pattern-of-abuse identification",
      "Cross-county coordination mapping",
      "Documentation for bar complaints, internal affairs, or civil rights suits",
    ],
    whyMatters: "Most misconduct is hidden in the details. We find the details.",
    pricing: "$1,200–$2,800",
    featured: true,
  },
  {
    icon: Shield,
    title: "The Accountability Package",
    tagline: "When corruption isn't the exception — it's the pattern.",
    description:
      "A comprehensive package for cases involving retaliation, corruption, overreach, forged documents, illegal searches, property seizures, denied protection orders, prosecutorial misconduct, and cross-county collusion.",
    perfectFor: "Clients in cases involving systemic corruption and multi-official misconduct.",
    details: [
      "Case reconstruction",
      "Misconduct deep dive",
      "Evidence packet",
      "Accountability roadmap",
      "Complaint templates",
      "Strategy call",
      "Documentation for media, attorneys, and agencies",
    ],
    whyMatters: "Because corruption doesn't end until someone documents it.",
    pricing: "Custom",
    featured: true,
  },
  {
    icon: FileText,
    title: "Affidavit & Narrative Support",
    tagline: "Your story, structured with forensic precision.",
    description:
      "We help you build victim statements, witness statements, declarations, and sworn affidavits with clarity and power.",
    perfectFor: "Victim statements, witness statements, declarations, sworn affidavits.",
    details: [
      "Full drafting support",
      "Fact-checked timeline alignment",
      "Incident listings with dates & citations",
      "Narrative flow refinement",
      "Court-ready formatting",
      "Trauma-aware support",
    ],
    whyMatters: "Your voice deserves clarity, not chaos.",
    pricing: "$500–$900",
    featured: false,
  },
  {
    icon: Users,
    title: "Pro Se Support",
    tagline: "When you're forced to stand alone — we stand with you.",
    description:
      "For individuals without legal representation or with overwhelmed/bad attorneys. We become your behind-the-scenes support system.",
    perfectFor: "Individuals without legal representation or with inadequate counsel.",
    details: [
      "Weekly strategy calls",
      "Filing organization",
      "Issue mapping",
      "Evidence structure",
      "Court prep",
      "Exhibit creation",
      "Deadlines and tracking",
      "Written guides for next steps",
    ],
    whyMatters: "You shouldn't need a law degree to survive legal abuse.",
    pricing: "$1,200/mo",
    featured: false,
  },
  {
    icon: Clock,
    title: "Strategy Session",
    tagline: "Immediate clarity for urgent situations.",
    description:
      "A focused 60–90 minute deep dive for people in crisis or unsure where to begin.",
    perfectFor: "People in crisis, unsure where to begin.",
    details: [
      "Rapid case evaluation",
      "Identification of key issues",
      "Prioritized timeline",
      "Immediate next steps",
      "Pressure points to target",
      "Strategy for survival",
    ],
    whyMatters: "Confusion is the system's greatest weapon. Clarity is yours.",
    pricing: "$300",
    featured: false,
  },
  {
    icon: FolderOpen,
    title: "Document & Evidence Organization",
    tagline: "Turn your evidence into a force they cannot ignore.",
    description:
      "We take every file, clip, screenshot, report, and document you have and organize it into a usable system.",
    perfectFor: "Anyone buried in documents, screenshots, footage, or scattered evidence.",
    details: [
      "File sorting & renaming",
      "Evidence folder creation",
      "Index spreadsheets",
      "Exhibit preparation",
      "Color-coded evidence map",
    ],
    whyMatters: "Organized truth is impossible to dismiss.",
    pricing: "$125/hr",
    featured: false,
  },
  {
    icon: FileWarning,
    title: "Official Complaint Support",
    tagline: "Hold them accountable — properly.",
    description:
      "We help you structure formal complaints to bar associations, internal affairs, sheriff/prosecutor offices, judicial ethics boards, and oversight agencies.",
    perfectFor: "Bar complaints, internal affairs reports, judicial ethics complaints, civil rights letters.",
    details: [
      "Drafting assistance",
      "Evidence alignment",
      "Timeline references",
      "Issue summaries",
      "Filing strategy",
    ],
    whyMatters: "The system protects itself. We show you how to expose it.",
    pricing: "$125/hr",
    featured: false,
  },
  {
    icon: Map,
    title: "Timeline & Issue Map",
    tagline: "See your case in one frame.",
    description:
      "A visual and written timeline that shows every moment, event, hearing, filing, decision, and misconduct pattern.",
    perfectFor: "Someone who needs their case summarized for court, attorneys, or media.",
    details: [
      "Visual timeline",
      "Issue clusters",
      "Violation map",
      "County crossover map",
      "Officer chain summary",
      "Evidence references",
    ],
    whyMatters: "This is what attorneys, judges, and investigators need to understand your case instantly.",
    pricing: "$125/hr",
    featured: false,
  },
];

export function ServicesSection() {
  const featuredServices = services.filter(s => s.featured);
  const otherServices = services.filter(s => !s.featured);

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
            For the people. By the people.{" "}
            <span className="text-gold">Boutique-level intelligence services</span> — each engagement 
            tailored to your situation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {featuredServices.map((service, index) => (
            <Card
              key={index}
              className="relative bg-card border-border overflow-visible group hover:-translate-y-1 transition-transform duration-300"
              data-testid={`card-service-featured-${index}`}
            >
              <div className="absolute top-4 right-4">
                <Badge className="bg-gold text-gold-foreground">{service.pricing}</Badge>
              </div>
              
              <div className="absolute top-0 left-0 w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-transparent" />
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gold to-transparent" />
              </div>

              <CardHeader className="pt-8">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-gold" />
                </div>
                <CardTitle className="font-serif text-xl text-foreground">
                  {service.title}
                </CardTitle>
                <p className="text-gold font-medium text-sm mt-1">
                  {service.tagline}
                </p>
                <CardDescription className="text-muted-foreground text-sm mt-3">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                <div>
                  <p className="text-xs text-foreground/70 mb-2">Perfect for:</p>
                  <p className="text-xs text-gold italic">{service.perfectFor}</p>
                </div>

                <ul className="space-y-1.5">
                  {service.details.slice(0, 5).map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                  {service.details.length > 5 && (
                    <li className="text-xs text-gold">+ {service.details.length - 5} more</li>
                  )}
                </ul>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-foreground/90 italic leading-relaxed">
                    {service.whyMatters}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherServices.map((service, index) => (
            <Card
              key={index}
              className="relative bg-card border-border overflow-visible hover:-translate-y-1 transition-transform duration-300"
              data-testid={`card-service-${index}`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs border-gold/30 text-gold">
                    {service.pricing}
                  </Badge>
                </div>
                <CardTitle className="font-serif text-lg text-foreground mt-3">
                  {service.title}
                </CardTitle>
                <p className="text-gold font-medium text-xs">
                  {service.tagline}
                </p>
                <CardDescription className="text-muted-foreground text-xs mt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 pt-0">
                <ul className="space-y-1">
                  {service.details.slice(0, 4).map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                  {service.details.length > 4 && (
                    <li className="text-xs text-primary/70">+ {service.details.length - 4} more</li>
                  )}
                </ul>

                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-foreground/90 italic">
                    {service.whyMatters}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block px-6 py-3 rounded-lg border border-border bg-card/50">
            <p className="text-sm text-muted-foreground">
              <span className="text-gold font-medium">Rush work available</span> — add 35% for urgent deadlines
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
