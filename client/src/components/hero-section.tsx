import { Button } from "@/components/ui/button";
import { Shield, FileSearch, Eye } from "lucide-react";

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/95" />
      
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gold rotate-45" />
        <div className="absolute top-1/3 right-1/3 w-px h-48 bg-primary rotate-12" />
        <div className="absolute bottom-1/4 left-1/3 w-px h-24 bg-gold -rotate-30" />
        <div className="absolute top-1/2 right-1/4 w-24 h-px bg-primary" />
        <div className="absolute bottom-1/3 right-1/2 w-32 h-px bg-gold rotate-45" />
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-card/80 border border-border">
                <Shield className="h-4 w-4 text-gold" />
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Civil Rights Intelligence
                </span>
              </div>
              
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-hero font-bold tracking-tight" data-testid="text-hero-title">
                <span className="text-primary">CIVIL CI</span>
                <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-foreground/90 mt-2">
                  Civil Citizens Intelligence
                </span>
              </h1>
              
              <p className="text-gold font-serif text-lg sm:text-xl md:text-2xl italic" data-testid="text-hero-tagline">
                For the people. By the people.
              </p>
            </div>

            <div className="space-y-4 max-w-2xl">
              <p className="text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed" data-testid="text-hero-mission">
                We will not tolerate corruption.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                We have carried its burdens, endured its weapons, and survived its intent.
                And from every injustice, we built a movement — forged in fire, sharpened by truth, 
                united by the simple promise that corruption will not go unanswered.
              </p>

              <p className="text-foreground/90 font-medium leading-relaxed">
                We are done pleading. We are done waiting.
                <br />
                <span className="text-gold">We demand accountability — and this time, the people are watching.</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => onNavigate("contact")}
                className="bg-gold hover:bg-gold/90 text-gold-foreground font-semibold text-base px-8"
                data-testid="button-book-review"
              >
                Book a Case Review
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("services")}
                className="border-gold/50 text-gold hover:bg-gold/10 hover:border-gold font-medium text-base px-8"
                data-testid="button-explore-services"
              >
                Explore Services
              </Button>
            </div>

            <div className="pt-8 flex flex-wrap items-center gap-4 sm:gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2" data-testid="badge-forensic">
                <FileSearch className="h-4 w-4 text-gold" />
                <span>Forensic Analysis</span>
              </div>
              <div className="flex items-center gap-2" data-testid="badge-pattern">
                <Eye className="h-4 w-4 text-gold" />
                <span>Pattern Detection</span>
              </div>
              <div className="flex items-center gap-2" data-testid="badge-rights">
                <Shield className="h-4 w-4 text-gold" />
                <span>Rights Protection</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 relative">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-card via-card/90 to-background border border-border rounded-lg">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="w-full space-y-6">
                    <div className="flex items-center gap-3 opacity-60">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div className="h-px flex-1 bg-border" />
                      <div className="w-2 h-2 rounded-full bg-gold" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <div className="w-20 h-3 bg-primary/20 rounded" />
                        <div className="w-12 h-3 bg-gold/20 rounded" />
                      </div>
                      <div className="w-full h-3 bg-border/50 rounded" />
                      <div className="w-3/4 h-3 bg-border/30 rounded" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-4">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-16 rounded ${
                            i % 3 === 0 ? "bg-primary/10" : i % 3 === 1 ? "bg-gold/10" : "bg-border/20"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-4 opacity-60">
                      <div className="w-2 h-2 rounded-full bg-gold" />
                      <div className="h-px flex-1 bg-border" />
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>

                    <div className="text-center pt-4">
                      <p className="font-serif text-sm text-muted-foreground italic">
                        "Fire, focus, and forensic clarity."
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/30 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/30 rounded-br-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-gold/50" />
        </div>
      </div>
    </section>
  );
}
