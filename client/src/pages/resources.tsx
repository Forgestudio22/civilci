import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, BookOpen, FileText, Download, ExternalLink, Search, Scale, Shield, AlertTriangle } from "lucide-react";
import type { Resource } from "@shared/schema";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const categoryIcons: Record<string, typeof FileText> = {
  "foia": Search,
  "affidavit": FileText,
  "rights-violations": Scale,
  "legal-basics": Shield,
  "documentation": BookOpen,
};

const categoryColors: Record<string, string> = {
  "foia": "bg-blue-500/20 text-blue-400",
  "affidavit": "bg-gold/20 text-gold",
  "rights-violations": "bg-primary/20 text-primary",
  "legal-basics": "bg-green-500/20 text-green-400",
  "documentation": "bg-purple-500/20 text-purple-400",
};

const typeIcons: Record<string, typeof FileText> = {
  "guide": BookOpen,
  "template": FileText,
  "checklist": Shield,
  "article": FileText,
};

const sampleResources: Resource[] = [
  {
    id: "1",
    title: "How to File a FOIA Request",
    description: "A step-by-step guide to requesting public records under the Freedom of Information Act.",
    content: "",
    category: "foia",
    type: "guide",
    isPublished: "true",
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Writing an Effective Affidavit",
    description: "Learn how to document your experiences in a legally sound format for official proceedings.",
    content: "",
    category: "affidavit",
    type: "guide",
    isPublished: "true",
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Recognizing Civil Rights Violations",
    description: "Common patterns of rights violations and how to identify them when they happen to you.",
    content: "",
    category: "rights-violations",
    type: "guide",
    isPublished: "true",
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "Evidence Documentation Checklist",
    description: "Essential items to document when building your case file for maximum impact.",
    content: "",
    category: "documentation",
    type: "checklist",
    isPublished: "true",
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function ResourcesPage() {
  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources"],
  });

  const displayResources = resources && resources.length > 0 ? resources : sampleResources;

  const scrollToSection = (sectionId: string) => {
    window.location.href = `/#${sectionId}`;
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-resources">
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
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4" data-testid="text-resources-title">
              Resource Library
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-resources-description">
              Practical guides, templates, and educational materials to help you understand 
              your rights and document your experiences.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {[
              { icon: Search, label: "FOIA Guides", count: 3, category: "foia" },
              { icon: FileText, label: "Affidavit Writing", count: 2, category: "affidavit" },
              { icon: Scale, label: "Rights Education", count: 4, category: "rights-violations" },
              { icon: BookOpen, label: "Documentation", count: 3, category: "documentation" },
            ].map((cat, index) => (
              <Card 
                key={index} 
                className="bg-card border-border hover-elevate cursor-pointer"
                data-testid={`card-category-${cat.category}`}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-gold/10">
                    <cat.icon className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{cat.label}</p>
                    <p className="text-sm text-muted-foreground">{cat.count} resources</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-48 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {displayResources.map(resource => {
                const CategoryIcon = categoryIcons[resource.category] || FileText;
                const TypeIcon = typeIcons[resource.type] || FileText;
                return (
                  <Card 
                    key={resource.id} 
                    className="bg-card border-border hover-elevate"
                    data-testid={`card-resource-${resource.id}`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-gold/10">
                            <CategoryIcon className="h-4 w-4 text-gold" />
                          </div>
                          <Badge className={categoryColors[resource.category] || "bg-muted"}>
                            {resource.category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                          </Badge>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <TypeIcon className="h-3 w-3" />
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </Badge>
                      </div>
                      <CardTitle className="text-foreground">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-gold hover:bg-gold/90 text-background"
                          data-testid={`button-read-${resource.id}`}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Read Guide
                        </Button>
                        <Button 
                          variant="outline"
                          data-testid={`button-download-${resource.id}`}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  These resources are for educational purposes only and do not constitute legal advice. 
                  Every situation is unique, and you should consult with a qualified attorney for 
                  specific legal guidance. Civil CI provides intelligence and documentation support, 
                  not legal representation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gold/5 border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Request a Resource
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Can't find what you're looking for? Let us know what resources would be helpful, 
                  and we'll work to create them.
                </p>
                <Link href="/#contact">
                  <Button variant="outline" className="border-gold text-gold hover:bg-gold/10" data-testid="button-request-resource">
                    Suggest a Resource
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
