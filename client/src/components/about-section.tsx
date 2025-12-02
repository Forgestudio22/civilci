import { Quote } from "lucide-react";

export function AboutSection() {
  return (
    <section
      className="relative py-20 md:py-32 overflow-hidden"
      data-testid="section-about"
    >
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
      </div>

      <div className="absolute left-0 top-1/4 w-1 h-32 bg-gradient-to-b from-gold/30 to-transparent" />
      <div className="absolute right-0 bottom-1/4 w-1 h-32 bg-gradient-to-t from-primary/30 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-section font-bold text-primary mb-4" data-testid="text-about-title">
            About Civil CI
          </h2>
        </div>

        <div className="space-y-6 md:space-y-8 text-base md:text-lg leading-relaxed">
          <p className="text-foreground/90" data-testid="text-about-story-1">
            Civil CI was born out of a real, brutal case where small-town counties conspired, 
            abused their power, forged or altered documents, retaliated, and tried to bury one 
            man and his story.
          </p>

          <p className="text-muted-foreground" data-testid="text-about-story-2">
            Instead of giving up, we documented everything. We learned the systems — the ways 
            they manipulate, the patterns they follow, the tricks they use to overwhelm and 
            isolate their targets. And we realized how many other people were living the same 
            kind of nightmare.
          </p>

          <p className="text-foreground/90" data-testid="text-about-story-3">
            Now Civil CI stands in that gap: not a law firm, not a government office — but a{" "}
            <span className="text-gold font-medium">citizen-built intelligence unit</span>{" "}
            dedicated to exposing what they try to hide.
          </p>
        </div>

        <div className="my-12 md:my-16 relative">
          <div className="absolute -left-2 md:-left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-gold via-gold/50 to-transparent rounded-full" />
          
          <div className="pl-6 md:pl-8">
            <Quote className="h-8 w-8 md:h-10 md:w-10 text-gold/30 mb-4" />
            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl italic text-foreground leading-relaxed" data-testid="text-about-quote">
              "They thought we'd stay overwhelmed and alone. Instead, we built an intelligence 
              unit for everyone they ever targeted."
            </blockquote>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pt-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="font-serif text-2xl font-bold text-primary">01</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Real Experience</h3>
            <p className="text-sm text-muted-foreground">
              Born from actual battle against corrupt systems.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-4">
              <span className="font-serif text-2xl font-bold text-gold">02</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Citizen-Built</h3>
            <p className="text-sm text-muted-foreground">
              Not government. Not corporate. For the people.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="font-serif text-2xl font-bold text-primary">03</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Forensic Focus</h3>
            <p className="text-sm text-muted-foreground">
              Precision, clarity, and evidence-driven analysis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
