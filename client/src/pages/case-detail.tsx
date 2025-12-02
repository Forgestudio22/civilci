import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "wouter";
import { 
  ArrowLeft,
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  User,
  LogOut,
  Send,
  MessageSquare,
  Scale,
  Shield,
  Activity
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { EvidenceUpload } from "@/components/evidence-upload";
import type { CaseReview, CaseNote } from "@shared/schema";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  in_review: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  in_progress: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  closed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

const statusLabels: Record<string, string> = {
  pending: "Pending Review",
  in_review: "Under Review",
  in_progress: "In Progress",
  completed: "Completed",
  closed: "Closed",
};

const statusDescriptions: Record<string, string> = {
  pending: "Your case has been received and is awaiting initial review by our team.",
  in_review: "An analyst is currently reviewing your case and identifying patterns.",
  in_progress: "We are actively working on your case documentation and analysis.",
  completed: "Case analysis is complete. Review the findings and next steps.",
  closed: "This case has been closed. Contact us if you have questions.",
};

const urgencyColors: Record<string, string> = {
  low: "bg-green-500/20 text-green-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  high: "bg-orange-500/20 text-orange-400",
  critical: "bg-red-500/20 text-red-400",
};

const timelineSteps = [
  { status: "pending", label: "Submitted", icon: FileText },
  { status: "in_review", label: "Under Review", icon: Scale },
  { status: "in_progress", label: "In Progress", icon: Activity },
  { status: "completed", label: "Complete", icon: CheckCircle },
];

export default function CaseDetail() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const params = useParams();
  const caseId = params.id;
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You need to be logged in to view this page.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isAuthenticated, authLoading, toast]);

  const { data: caseReview, isLoading: caseLoading, error: caseError } = useQuery<CaseReview>({
    queryKey: [`/api/case-reviews/${caseId}`],
    enabled: isAuthenticated && !!caseId,
  });

  const { data: notes, isLoading: notesLoading } = useQuery<CaseNote[]>({
    queryKey: [`/api/case-reviews/${caseId}/notes`],
    enabled: isAuthenticated && !!caseId,
  });

  const addNoteMutation = useMutation({
    mutationFn: async (content: string) => {
      return apiRequest("POST", `/api/case-reviews/${caseId}/notes`, { 
        content,
        isInternal: false 
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/case-reviews/${caseId}/notes`] });
      setNewNote("");
      toast({
        title: "Note added",
        description: "Your note has been added to the case.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add note. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddNote = () => {
    if (newNote.trim()) {
      addNoteMutation.mutate(newNote.trim());
    }
  };

  const getTimelineProgress = (currentStatus: string) => {
    const statusOrder = ["pending", "in_review", "in_progress", "completed"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    return currentIndex >= 0 ? currentIndex + 1 : 0;
  };

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (caseLoading) {
    return (
      <div className="min-h-screen bg-background" data-testid="page-case-detail">
        <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-48 w-full mb-6" />
          <Skeleton className="h-32 w-full" />
        </main>
      </div>
    );
  }

  if (caseError || !caseReview) {
    return (
      <div className="min-h-screen bg-background" data-testid="page-case-detail">
        <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Case Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The case you're looking for doesn't exist or you don't have access to it.
            </p>
            <Link href="/dashboard">
              <Button className="bg-gold hover:bg-gold/90 text-background">
                Return to Dashboard
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const progress = getTimelineProgress(caseReview.status);

  return (
    <div className="min-h-screen bg-background" data-testid="page-case-detail">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2" data-testid="link-back-dashboard">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="h-6 w-px bg-border" />
              <h1 className="font-serif text-xl font-bold text-primary">Case Details</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {user?.profileImageUrl ? (
                  <img 
                    src={user.profileImageUrl} 
                    alt="Profile" 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                )}
                <span className="text-sm text-foreground hidden sm:block">
                  {user?.firstName || user?.email || "User"}
                </span>
              </div>
              <a href="/api/logout">
                <Button variant="ghost" size="sm" className="gap-2" data-testid="button-logout">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground" data-testid="text-case-id">
              Case #{caseReview.id.slice(0, 8)}
            </h2>
            <Badge 
              className={`${statusColors[caseReview.status]} border`}
              data-testid="badge-case-status"
            >
              {statusLabels[caseReview.status] || caseReview.status}
            </Badge>
            <Badge className={urgencyColors[caseReview.urgency]} data-testid="badge-urgency">
              {caseReview.urgency.charAt(0).toUpperCase() + caseReview.urgency.slice(1)} Priority
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Submitted on {new Date(caseReview.createdAt).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <Card className="bg-card border-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-gold" />
              Case Progress
            </CardTitle>
            <CardDescription>
              {statusDescriptions[caseReview.status]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="flex justify-between mb-2">
                {timelineSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isComplete = index < progress;
                  const isCurrent = index === progress - 1;
                  
                  return (
                    <div 
                      key={step.status} 
                      className="flex flex-col items-center flex-1"
                      data-testid={`timeline-step-${step.status}`}
                    >
                      <div 
                        className={`
                          w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 transition-colors
                          ${isComplete || isCurrent 
                            ? "bg-gold/20 border-gold text-gold" 
                            : "bg-muted/30 border-border text-muted-foreground"
                          }
                        `}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={`text-xs text-center ${isCurrent ? "text-gold font-medium" : "text-muted-foreground"}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-border -z-10 mx-12">
                <div 
                  className="h-full bg-gold transition-all duration-500"
                  style={{ width: `${((progress - 1) / (timelineSteps.length - 1)) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gold" />
                Case Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Contact Information</h4>
                  <p className="text-foreground">{caseReview.name}</p>
                  <p className="text-muted-foreground text-sm">{caseReview.email}</p>
                  {caseReview.phone && (
                    <p className="text-muted-foreground text-sm">{caseReview.phone}</p>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Case Description</h4>
                  <p className="text-foreground whitespace-pre-wrap" data-testid="text-case-summary">
                    {caseReview.caseSummary}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Last Updated</h4>
                  <p className="text-muted-foreground text-sm">
                    {new Date(caseReview.updatedAt || caseReview.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-gold" />
                Case Notes
              </CardTitle>
              <CardDescription>
                Communication and updates about your case
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notesLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : notes && notes.length > 0 ? (
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {notes.map(note => (
                      <div 
                        key={note.id} 
                        className="p-3 rounded-lg bg-background border border-border"
                        data-testid={`note-${note.id}`}
                      >
                        <p className="text-foreground text-sm">{note.content}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(note.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <MessageSquare className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No notes yet</p>
                  </div>
                )}

                <div className="pt-4 border-t border-border">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Add a note or question about your case..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="min-h-[80px] resize-none bg-background"
                      data-testid="input-new-note"
                    />
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button 
                      onClick={handleAddNote}
                      disabled={!newNote.trim() || addNoteMutation.isPending}
                      className="bg-gold hover:bg-gold/90 text-background gap-2"
                      data-testid="button-add-note"
                    >
                      <Send className="h-4 w-4" />
                      {addNoteMutation.isPending ? "Sending..." : "Add Note"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <EvidenceUpload caseId={caseId!} />
        </div>

        <Card className="bg-card border-border mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-gold" />
              What Happens Next
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-4 rounded-lg bg-background border border-border">
                <Clock className="h-8 w-8 text-gold mb-3" />
                <h4 className="font-medium text-foreground mb-1">Initial Review</h4>
                <p className="text-sm text-muted-foreground">
                  Our team reviews your submission within 24-48 hours and identifies key patterns.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-background border border-border">
                <Scale className="h-8 w-8 text-gold mb-3" />
                <h4 className="font-medium text-foreground mb-1">Pattern Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  We cross-reference your case with known misconduct patterns and prior cases.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-background border border-border">
                <FileText className="h-8 w-8 text-gold mb-3" />
                <h4 className="font-medium text-foreground mb-1">Documentation</h4>
                <p className="text-sm text-muted-foreground">
                  You'll receive a detailed analysis report and recommended next steps.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
