import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, FileSearch, Shield, Scale, AlertTriangle } from "lucide-react";
import type { CaseStudy } from "@shared/schema";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const categoryIcons: Record<string, typeof FileSearch> = {
  "pattern-exposure": FileSearch,
  "misconduct-documentation": Shield,
  "rights-violation": Scale,
  "systemic-abuse": AlertTriangle,
};

const categoryColors: Record<string, string> = {
  "pattern-exposure": "bg-gold/20 text-gold",
  "misconduct-documentation": "bg-primary/20 text-primary",
  "rights-violation": "bg-blue-500/20 text-blue-400",
  "systemic-abuse": "bg-orange-500/20 text-orange-400",
};

export default function CaseStudiesPage() {
  const { data: caseStudies, isLoading } = useQuery<CaseStudy[]>({
    queryKey: ["/api/case-studies"],
  });

  const scrollToSection = (sectionId: string) => {
    window.location.href = `/#${sectionId}`;
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-case-studies">
      <Navigation onNavigate={scrollToSection} />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="link-back-home">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4" data-testid="text-case-studies-title">
              Case Studies
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-case-studies-description">
              Anonymized examples of pattern exposure, misconduct documentation, and successful 
              civil rights defense. Real outcomes from real cases.
            </p>
          </div>

          <div className="mb-8 p-4 rounded-lg bg-gold/10 border border-gold/30">
            <p className="text-sm text-foreground/90 text-center">
              <strong className="text-gold">Privacy Notice:</strong> All case studies are anonymized 
              to protect client identities. Details have been altered while preserving the essential 
              patterns and outcomes.
            </p>
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          ) : caseStudies && caseStudies.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map(study => {
                const Icon = categoryIcons[study.category] || FileSearch;
                return (
                  <Card 
                    key={study.id} 
                    className="bg-card border-border hover-elevate transition-colors"
                    data-testid={`card-case-study-${study.id}`}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-gold/10">
                          <Icon className="h-5 w-5 text-gold" />
                        </div>
                        <Badge className={categoryColors[study.category] || "bg-muted"}>
                          {study.category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                        </Badge>
                      </div>
                      <CardTitle className="text-foreground">{study.title}</CardTitle>
                      <CardDescription>{study.summary}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {study.outcome && (
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                          <p className="text-sm text-green-400">
                            <strong>Outcome:</strong> {study.outcome}
                          </p>
                        </div>
                      )}
                      <Button 
                        variant="ghost" 
                        className="w-full mt-4 text-gold hover:text-gold/80"
                        data-testid={`button-read-case-${study.id}`}
                      >
                        Read Full Case Study
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <FileSearch className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                Case Studies Coming Soon
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                We're currently preparing our first published case studies. Check back soon for 
                detailed examples of how we've helped clients expose patterns and protect their rights.
              </p>
              <Link href="/#contact">
                <Button className="bg-gold hover:bg-gold/90 text-background" data-testid="button-contact-cta">
                  Request a Case Review
                </Button>
              </Link>
            </div>
          )}

          <div className="mt-16 p-8 rounded-lg bg-background border border-border text-center">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
              Have a Case We Should Know About?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              If you've experienced systemic abuse, misconduct, or rights violations, your story 
              could help others facing similar situations. All submissions are confidential.
            </p>
            <Button 
              className="bg-gold hover:bg-gold/90 text-background" 
              data-testid="button-share-story"
              onClick={() => {
                window.location.href = "/#contact";
                setTimeout(() => {
                  const element = document.getElementById("contact");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            >
              Share Your Story
            </Button>
          </div>
        </div>
      </main>

      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
