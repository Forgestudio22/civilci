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
    tagline: "Forensic rebuild of your entire case.",
    description:
      "We turn chaos into a crystal-clear timeline. This service rebuilds your case from the first incident to the present day using documents, filings, videos, memos, bodycam, police reports, and your lived experience.",
    details: [
      "Full chronological reconstruction",
      "Evidence map (documents, exhibits, footage, links)",
      "Pattern identification and cross-agency analysis",
      "Contradiction detection",
      "Official misconduct flags",
      "Strategic report for attorneys and courts",
    ],
    forWho: "Anyone whose case is a mess, overwhelming, scattered, or deliberately made confusing.",
    whyDifferent: "Because Civil CI rebuilds cases like an intelligence analyst—not a lawyer.",
    featured: true,
  },
  {
    icon: Scale,
    title: "Civil Rights Misconduct Review",
    tagline: "We expose what they hoped you'd miss.",
    description:
      "A deep dive into actions taken by law enforcement, prosecutors, agencies, county officials, or courts. We analyze conduct and decisions through a civil-rights lens.",
    details: [
      "Warrant & affidavit breakdown",
      "Chain-of-custody scrutiny",
      "Due process review",
      "Fourth Amendment violation analysis",
      "Retaliation indicators",
      "Pattern tracking across counties or agencies",
    ],
    forWho: "Anyone who believes officials acted outside the law or abused their authority.",
    whyDifferent: "We analyze misconduct like a watchdog unit, not a defense team.",
    featured: true,
  },
  {
    icon: FileText,
    title: "Affidavit & Narrative Support",
    tagline: "Your story matters. We make it undeniable.",
    description:
      "You speak. We structure. Together, we build a statement that reflects your truth and aligns it with dates, evidence, and facts.",
    details: [
      "Statement drafting",
      "Affidavit structure & formatting",
      "Evidence-aligned narrative",
      "Chronology correction",
      "Fact-checking and internal consistency review",
      "Court-ready clarity",
    ],
    forWho: "Clients writing affidavits, declarations, victim statements, or personal narratives tied to legal or civil complaints.",
    whyDifferent: "We keep your voice intact—while giving it forensic precision.",
    featured: false,
  },
  {
    icon: Users,
    title: "Pro Se Support Package",
    tagline: "You're not alone. We become your support system.",
    description:
      "For those representing themselves or feeling abandoned by the system—Civil CI becomes your behind-the-scenes case structure, documentation partner, and strategy coach.",
    details: [
      "Weekly strategy calls",
      "Filing organization",
      "Evidence alignment",
      "Issue spotting",
      "Formatting support",
      "Step-by-step next-move planning",
    ],
    forWho: "People fighting their case without adequate legal help.",
    whyDifferent: "This isn't legal advice. It's survival strategy.",
    pricing: "Monthly",
    featured: false,
  },
  {
    icon: Clock,
    title: "Strategy Session",
    tagline: "Clarity when you need it most.",
    description:
      "A focused, immediate deep dive into your case to identify the key issues and determine your next steps.",
    details: [
      "Fast case review",
      "Identification of 3–7 critical issues",
      "Risk assessment",
      "Timeline priorities",
      "Customized strategy map",
      "Action items you can implement right away",
    ],
    forWho: "Anyone overwhelmed, confused, or unsure where to begin.",
    whyDifferent: "It's like sitting down with a forensic analyst, a strategist, and an advocate at the same time.",
    pricing: "60–90 min",
    featured: false,
  },
  {
    icon: FolderOpen,
    title: "Document & Evidence Organization",
    tagline: "Turn your evidence into a weapon of truth.",
    description:
      "We take every file, clip, screenshot, report, text, and document you have and organize it into a usable system.",
    details: [
      "Evidence folders",
      "Indexing & file labeling",
      "Exhibit creation",
      "Link mapping",
      "Master evidence archive",
    ],
    forWho: "Clients buried in documents—or lacking the ability to organize them.",
    whyDifferent: "Courts, lawyers, and agencies respond better to organized truth.",
    featured: false,
  },
  {
    icon: FileWarning,
    title: "Official Complaint & Report Support",
    tagline: "Hold them accountable the right way.",
    description:
      "We help you structure formal complaints to Internal Affairs, Sheriff's offices, Prosecutors, Judges, State agencies, Federal oversight entities, and Bar associations.",
    details: [
      "Drafting support",
      "Evidence alignment",
      "Timeline references",
      "Legal-issue framing",
      "Filing strategy",
    ],
    forWho: "Clients demanding accountability and change.",
    whyDifferent: "We know the patterns. We know the language. We know what needs to be exposed.",
    featured: false,
  },
  {
    icon: Map,
    title: "Case Timeline & Issue Map",
    tagline: "See your entire story in one frame.",
    description:
      "A visual and written timeline that shows every moment, event, hearing, filing, decision, and misconduct pattern.",
    details: [
      "Chronological timeline",
      "Pattern map",
      "Officer-by-officer misconduct chart",
      "County crossover map",
      "Evidence references",
      "Summary of key turning points",
    ],
    forWho: "Someone who needs their case summarized for court, attorneys, or media.",
    whyDifferent: "It turns confusion into clarity—and clarity into power.",
    featured: false,
  },
  {
    icon: Shield,
    title: "The Accountability Package",
    tagline: "When corruption is the pattern.",
    description:
      "A targeted package built for cases involving corruption, retaliation, abuse of authority, collusion between counties, multi-official misconduct, forged documents, illegal searches, seized property, and denial of protection.",
    details: [
      "Case reconstruction",
      "Misconduct deep dive",
      "Evidence map",
      "Accountability roadmap",
      "Complaint templates",
      "Strategy session",
      "Tools for pressure + exposure",
    ],
    forWho: "Exactly the kind of case Civil CI was born to fight.",
    whyDifferent: "This is our flagship. Built from experience. Designed for justice.",
    featured: true,
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

                <div className="pt-4 border-t border-border space-y-2">
                  <p className="text-sm text-foreground/80 italic">
                    {service.forWho}
                  </p>
                  <p className="text-xs text-gold/80">
                    {service.whyDifferent}
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
                  {service.pricing && (
                    <Badge variant="outline" className="text-xs border-gold/30 text-gold">
                      {service.pricing}
                    </Badge>
                  )}
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

                <div className="pt-3 border-t border-border space-y-1.5">
                  <p className="text-xs text-foreground/80 italic">
                    {service.forWho}
                  </p>
                  <p className="text-xs text-primary/70">
                    {service.whyDifferent}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
