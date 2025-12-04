import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Share2, FileText
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const jeremysCaseContent = `I never planned on becoming the person who tracks corruption like an analyst, builds timelines like a prosecutor, and reads warrants like my life depends on it.

I was just trying to help someone I cared about survive.

Jeremy's case didn't start with some big dramatic headline. It started with little things that didn't feel right. A search that didn't line up with the story. A report that didn't match what we saw on video. A warrant that somehow existed before it was even signed. Complaints about his dogs, his vehicles, his very existence. A town that treated him like a problem to be removed, not a person with rights.

Then the "little things" turned into impossible-to-ignore things: unlawful entries, conflicting paperwork, missing signatures, retaliation, poisoned dogs, and even bullets in his house.

And every time we tried to raise the alarm, the message was basically the same: sit down, be quiet, accept it.

Instead, I started documenting.

I watched hours of DVR footage. I read bodycam reports and then watched the videos that contradicted them. I compared affidavits, timestamps, and warrants that didn't match. I saw how power moved—across counties, across offices, across friendships and titles—like a quiet little network that assumed no one would ever string the pieces together.

I watched Jeremy get raided, searched, threatened, charged, and pushed to the edge, while the people hurting him moved like they were untouchable.

And I also watched something else happen: the more I learned, the less afraid I became.

You can't unsee a pattern once you've seen it. You can't unknow what a real warrant should look like. You can't unknow what due process is supposed to be. You can't un-feel what it's like to watch someone go through hell because people in power chose corruption over honesty.

Jeremy's case broke a lot of illusions for me.

It showed me how small towns and counties can act like their own little kingdoms. It showed me how easy it is to bury the truth under paperwork and intimidation. It showed me how quickly a person can be turned into a target just for existing in the "wrong" place, with the "wrong" people, while refusing to bow down.

But it also did something else: it gave me a mission.

Out of this whole nightmare, I started to realize that what I was doing for Jeremy—the timelines, the contradictions, the evidence mapping, the misconduct tracking—is what so many other people desperately need and never get.

People who know something is wrong but can't prove it alone. People who are drowning in paperwork and trauma and don't even know where to start. People who are told "that's just how it is" while their rights are being stomped on.

That's where Civil CI was born: out of watching one man get crushed for years and deciding that no one else should have to go through that alone.

Civil CI is my response to all of it.

It's my way of saying: No, we will not tolerate corruption. No, we will not just accept whatever story they write. No, we will not let misconduct hide in the dark corners of "procedure."

We may not control the system. But we can document it. We can expose it. We can demand accountability with receipts.

Jeremy's case is personal to me, and it always will be. But it's bigger than one person now.

It's every citizen who was dismissed, threatened, or silenced. It's every family who watched the system fail them on purpose. It's everyone who knows something isn't right and refuses to pretend otherwise.

So if you're reading this and you're in the middle of your own storm, hear me clearly:

You are not crazy. You are not alone. And you are not powerless.

We may not have badges. We may not have titles. But we have something they fear:

We have the truth, and we are learning how to use it.

For the people. By the people. And we demand accountability.`;

const posts: Record<string, { title: string; summary: string; content: string; category: string; tags: string[]; publishedAt: Date }> = {
  "my-experience-inside-jeremys-case": {
    title: "My Experience Inside Jeremy's Case",
    summary: "I never planned on becoming the person who tracks corruption like an analyst. I was just trying to help someone I cared about survive. This is how Civil CI was born.",
    content: jeremysCaseContent,
    category: "analysis",
    tags: ["origin-story", "corruption", "documentation", "civil-rights"],
    publishedAt: new Date("2024-12-04"),
  },
};

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const post = posts[slug];

  const scrollToSection = (sectionId: string) => {
    window.location.href = `/#${sectionId}`;
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background" data-testid="page-blog-post-not-found">
        <Navigation onNavigate={scrollToSection} />
        <main className="pt-24 pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FileText className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
              Post Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/blog">
              <Button className="bg-gold hover:bg-gold/90 text-background">
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer onNavigate={scrollToSection} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog-post">
      <Navigation onNavigate={scrollToSection} />
      
      <main className="pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="link-back-blog">
                <ArrowLeft className="h-4 w-4" />
                Back to Intelligence Briefings
              </Button>
            </Link>
          </div>

          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-blue-500/20 text-blue-400">
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {post.publishedAt.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6" data-testid="text-post-title">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-post-summary">
              {post.summary}
            </p>

            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Civil CI Founder</p>
                  <p className="text-sm text-muted-foreground">Civil Citizens Intelligence</p>
                </div>
              </div>
            </div>
          </header>

          <div className="prose prose-lg prose-invert max-w-none" data-testid="text-post-content">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-foreground/90 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          <footer className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="text-sm">
                  #{tag}
                </Badge>
              ))}
            </div>

            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                Are You Facing Something Similar?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                If you're in the middle of your own battle against systemic abuse or corruption, 
                you don't have to fight alone. We're here to help you document, organize, and expose the truth.
              </p>
              <Button 
                className="bg-gold hover:bg-gold/90 text-background"
                onClick={() => {
                  window.location.href = "/#contact";
                }}
                data-testid="button-request-review"
              >
                Request a Case Review
              </Button>
            </div>
          </footer>
        </article>
      </main>

      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
