import { Link } from "wouter";
import { ArrowLeft, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import blogHeroImage from "@assets/56AD7A1A-567F-4004-B02A-D6ADE7C4CDFC_1764896170532.png";

export default function AboutBlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative min-h-[500px]">
        <div 
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: `url(${blogHeroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 py-8">
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 text-white hover:text-white hover:bg-white/20" data-testid="link-back-blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          
          <div className="max-w-4xl mx-auto pt-48 pb-12">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg" data-testid="text-about-title">
              About the Civil CI Blog
            </h1>
            <p className="text-2xl md:text-3xl text-primary font-semibold drop-shadow-lg">
              For the people. By the people.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <section className="space-y-6">
            <p className="text-xl text-muted-foreground leading-relaxed">
              The Civil CI Blog exists for one purpose: <span className="text-foreground font-semibold">to expose the truth that corruption tries to bury.</span>
            </p>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>This is not a legal blog.</p>
              <p>Not a gentle commentary space.</p>
              <p>Not a sanitized public-relations voice.</p>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This is the voice of citizens rising, of people who've seen the system up close, of survivors of misconduct, retaliation, intimidation, falsified records, and weaponized authority.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This blog was born out of lived experience — from watching good people be crushed by systems that claimed to protect them, from seeing warrants altered, rights ignored, property seized, truth distorted, and power abused.
            </p>
            <p className="text-xl font-semibold text-primary">
              What we witnessed didn't make us silent. It made us dangerous.
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="font-serif text-3xl font-bold text-primary flex items-center gap-3">
              <span className="w-3 h-3 bg-primary rounded-sm"></span>
              What This Blog Stands For
            </h2>
            
            <div className="grid gap-6">
              <div className="p-6 rounded-lg border border-border/50 bg-card/50 space-y-3">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Flame className="h-5 w-5 text-primary" />
                  Truth over intimidation.
                </h3>
                <p className="text-muted-foreground">
                  We call out misconduct when we see it. We document what officials hope goes unnoticed. We expose patterns, not just incidents.
                </p>
              </div>
              
              <div className="p-6 rounded-lg border border-border/50 bg-card/50 space-y-3">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Flame className="h-5 w-5 text-primary" />
                  Education for the people.
                </h3>
                <p className="text-muted-foreground">
                  We break down complex rights, laws, and procedures into real human language — the kind of clarity the system hopes you never gain.
                </p>
              </div>
              
              <div className="p-6 rounded-lg border border-border/50 bg-card/50 space-y-3">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Flame className="h-5 w-5 text-primary" />
                  Forensic visibility.
                </h3>
                <p className="text-muted-foreground">
                  We teach citizens how to build timelines, map evidence, identify contradictions, recognize retaliatory behavior, and understand the mechanics of abuse.
                </p>
              </div>
              
              <div className="p-6 rounded-lg border border-border/50 bg-card/50 space-y-3">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Flame className="h-5 w-5 text-primary" />
                  Accountability. Always.
                </h3>
                <p className="text-muted-foreground">
                  When power becomes unchecked, we become the check. When officials operate in the dark, we become the light. When corruption spreads quietly, we speak loudly.
                </p>
              </div>
              
              <div className="p-6 rounded-lg border border-border/50 bg-card/50 space-y-3">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Flame className="h-5 w-5 text-primary" />
                  Support for the targeted.
                </h3>
                <p className="text-muted-foreground">
                  This blog is for the people who feel isolated, overwhelmed, unheard, or cornered by authority. It's for those who know something is wrong but don't know where to begin. It's for those who refuse to be silenced.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-primary flex items-center gap-3">
              <span className="w-3 h-3 bg-primary rounded-sm"></span>
              What We Write About
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Small-town & county corruption",
                "Illegal searches & defective warrants",
                "Cross-county coordination (the hidden networks)",
                "Civil rights violations",
                "Prosecutorial & police misconduct",
                "Evidence manipulation",
                "Retaliation patterns",
                "Citizen survival strategies",
                "Trauma-aware case documentation",
                "How to build a case the system cannot ignore",
                "Stories of resilience, resistance & truth"
              ].map((topic, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></span>
                  <span className="text-muted-foreground">{topic}</span>
                </div>
              ))}
            </div>
            
            <p className="text-lg text-muted-foreground italic">
              Every topic is designed to pull back the curtain on how local power really works — and how citizens can fight back.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-primary flex items-center gap-3">
              <span className="w-3 h-3 bg-primary rounded-sm"></span>
              Why This Blog Exists
            </h2>
            
            <div className="space-y-3 text-lg text-muted-foreground">
              <p>Because corruption grows in silence.</p>
              <p>Because citizens are dismissed until they bring evidence.</p>
              <p>Because the people who need help the most are the ones the system ignores.</p>
              <p>Because too many have suffered alone, confused, overwhelmed, and unprotected.</p>
              <p>Because no one teaches you how to survive when the system targets you.</p>
              <p className="font-semibold text-foreground">Because someone had to start telling the truth out loud.</p>
            </div>
            
            <p className="text-xl text-primary font-semibold">
              Civil CI exists because of everything we've seen… and everything we refuse to let happen again.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-primary flex items-center gap-3">
              <span className="w-3 h-3 bg-primary rounded-sm"></span>
              Who This Blog Is For
            </h2>
            
            <p className="text-lg text-muted-foreground">This blog is for:</p>
            
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "People targeted by corrupt officials",
                "Victims of retaliation",
                "Citizens fighting alone",
                "Whistleblowers",
                "Pro se litigants",
                "Family members searching for answers",
                "Advocates",
                "Anyone who has ever felt powerless in front of a badge, a bench, or a county office"
              ].map((audience, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border/30">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                  <span className="text-muted-foreground">{audience}</span>
                </div>
              ))}
            </div>
            
            <p className="text-xl font-semibold text-foreground">
              If you've ever felt the system working against you instead of for you — this blog is yours.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-primary flex items-center gap-3">
              <span className="w-3 h-3 bg-primary rounded-sm"></span>
              Our Promise
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
                <p className="font-semibold">We do not sugarcoat.</p>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
                <p className="font-semibold">We do not minimize.</p>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
                <p className="font-semibold">We do not look away.</p>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
                <p className="font-semibold">We do not stay silent.</p>
              </div>
            </div>
            
            <div className="space-y-2 text-lg text-muted-foreground">
              <p>We demand accountability.</p>
              <p>We document the truth.</p>
              <p>We stand with the people.</p>
              <p className="text-xl font-semibold text-primary">We rise together.</p>
            </div>
          </section>

          <section className="py-12 border-t border-border/50">
            <div className="text-center space-y-6">
              <p className="text-xl text-muted-foreground">
                Civil CI is not just a blog.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-lg font-semibold">
                <span className="text-primary">It is a movement.</span>
                <span className="text-accent">A record.</span>
                <span className="text-primary">A warning.</span>
                <span className="text-accent">And a beacon.</span>
              </div>
              <div className="pt-6">
                <p className="text-2xl font-serif font-bold text-foreground">For the people.</p>
                <p className="text-2xl font-serif font-bold text-foreground">By the people.</p>
                <p className="text-xl text-primary font-semibold mt-2">Always.</p>
              </div>
            </div>
          </section>

          <div className="flex justify-center pt-8">
            <Link href="/blog">
              <Button size="lg" data-testid="button-view-blog">
                View Intelligence Briefings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
