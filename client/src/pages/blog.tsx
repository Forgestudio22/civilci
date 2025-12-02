import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, FileText, Calendar, User, ArrowRight, Search, Scale, Eye, Shield } from "lucide-react";
import type { BlogPost } from "@shared/schema";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const categoryIcons: Record<string, typeof FileText> = {
  "analysis": Search,
  "patterns": Eye,
  "rights": Scale,
  "updates": FileText,
  "education": Shield,
};

const categoryColors: Record<string, string> = {
  "analysis": "bg-blue-500/20 text-blue-400",
  "patterns": "bg-gold/20 text-gold",
  "rights": "bg-primary/20 text-primary",
  "updates": "bg-green-500/20 text-green-400",
  "education": "bg-purple-500/20 text-purple-400",
};

const samplePosts: BlogPost[] = [
  {
    id: "1",
    authorId: null,
    title: "Recognizing Patterns of Systemic Retaliation",
    slug: "recognizing-patterns-systemic-retaliation",
    summary: "An analysis of common retaliation tactics used by institutions and how to document them effectively for your defense.",
    content: "",
    category: "patterns",
    tags: ["retaliation", "documentation", "patterns"],
    isPublished: "true",
    publishedAt: new Date("2024-11-15"),
    createdAt: new Date("2024-11-15"),
    updatedAt: new Date("2024-11-15"),
  },
  {
    id: "2",
    authorId: null,
    title: "How Counties Coordinate: Cross-Jurisdictional Abuse",
    slug: "cross-jurisdictional-abuse-patterns",
    summary: "When multiple agencies work together to target individuals, the patterns become clear. Here's what to look for.",
    content: "",
    category: "analysis",
    tags: ["coordination", "agencies", "investigation"],
    isPublished: "true",
    publishedAt: new Date("2024-11-08"),
    createdAt: new Date("2024-11-08"),
    updatedAt: new Date("2024-11-08"),
  },
  {
    id: "3",
    authorId: null,
    title: "Understanding Your Right to Public Records",
    slug: "right-to-public-records",
    summary: "A comprehensive guide to FOIA and state public records laws, and how to use them to expose misconduct.",
    content: "",
    category: "rights",
    tags: ["foia", "public-records", "transparency"],
    isPublished: "true",
    publishedAt: new Date("2024-11-01"),
    createdAt: new Date("2024-11-01"),
    updatedAt: new Date("2024-11-01"),
  },
];

export default function BlogPage() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const displayPosts = posts && posts.length > 0 ? posts : samplePosts;

  const scrollToSection = (sectionId: string) => {
    window.location.href = `/#${sectionId}`;
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog">
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
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4" data-testid="text-blog-title">
              Intelligence Briefings
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-blog-description">
              Analysis of systemic patterns, civil rights issues, and insights from our work 
              exposing institutional misconduct.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {["All", "Analysis", "Patterns", "Rights", "Updates", "Education"].map((cat) => (
              <Badge 
                key={cat}
                variant={cat === "All" ? "default" : "outline"}
                className={cat === "All" ? "bg-gold text-background" : "cursor-pointer hover:bg-muted"}
                data-testid={`filter-${cat.toLowerCase()}`}
              >
                {cat}
              </Badge>
            ))}
          </div>

          {isLoading ? (
            <div className="grid gap-8 lg:grid-cols-3">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-72 w-full" />
              ))}
            </div>
          ) : (
            <>
              {displayPosts.length > 0 && (
                <Card 
                  className="bg-card border-border hover-elevate mb-8"
                  data-testid={`card-featured-post-${displayPosts[0].id}`}
                >
                  <CardContent className="p-6 lg:p-8">
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-primary/20 to-gold/10 rounded-lg aspect-video flex items-center justify-center">
                        <Eye className="h-16 w-16 text-gold/50" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge className={categoryColors[displayPosts[0].category] || "bg-muted"}>
                            {displayPosts[0].category.charAt(0).toUpperCase() + displayPosts[0].category.slice(1)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Featured
                          </span>
                        </div>
                        <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
                          {displayPosts[0].title}
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          {displayPosts[0].summary}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {displayPosts[0].publishedAt && new Date(displayPosts[0].publishedAt).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                        <Button className="bg-gold hover:bg-gold/90 text-background w-fit" data-testid="button-read-featured">
                          Read Briefing
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {displayPosts.slice(1).map(post => {
                  const Icon = categoryIcons[post.category] || FileText;
                  return (
                    <Card 
                      key={post.id} 
                      className="bg-card border-border hover-elevate"
                      data-testid={`card-post-${post.id}`}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-2 rounded-lg bg-gold/10">
                            <Icon className="h-4 w-4 text-gold" />
                          </div>
                          <Badge className={categoryColors[post.category] || "bg-muted"}>
                            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                          </Badge>
                        </div>
                        <CardTitle className="text-foreground line-clamp-2">{post.title}</CardTitle>
                        <CardDescription className="line-clamp-3">{post.summary}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {post.publishedAt && new Date(post.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <Button variant="ghost" className="text-gold hover:text-gold/80" data-testid={`button-read-${post.id}`}>
                            Read More
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-4">
                            {post.tags.slice(0, 3).map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}

          <div className="mt-16 p-8 rounded-lg bg-background border border-border text-center">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
              Stay Informed
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Get notified when we publish new intelligence briefings, pattern analyses, 
              and civil rights updates. We respect your privacy and never share your information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                data-testid="input-newsletter-email"
              />
              <Button className="bg-gold hover:bg-gold/90 text-background" data-testid="button-subscribe">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
