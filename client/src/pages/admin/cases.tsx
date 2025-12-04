import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AdminLayout } from "./index";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Eye, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  MessageSquare,
  Filter
} from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { CaseReview, User } from "@shared/schema";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  "in-progress": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "under-review": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  completed: "bg-green-500/10 text-green-500 border-green-500/20",
  closed: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

const urgencyIcons: Record<string, typeof AlertTriangle> = {
  low: Clock,
  medium: Clock,
  high: AlertTriangle,
  critical: AlertTriangle,
};

const urgencyColors: Record<string, string> = {
  low: "text-gray-400",
  medium: "text-yellow-500",
  high: "text-orange-500",
  critical: "text-red-500",
};

const serviceLabels: Record<string, string> = {
  "case-reconstruction": "Case Reconstruction",
  "misconduct-review": "Misconduct Review",
  "affidavit-support": "Affidavit Support",
  "pro-se-support": "Pro-Se Support",
  "strategy-session": "Strategy Session",
  "document-organization": "Document Organization",
  "complaint-support": "Complaint Support",
  "timeline-map": "Timeline Map",
  "accountability-package": "Accountability Package",
  "not-sure": "Not Sure Yet",
};

export default function AdminCases() {
  const { toast } = useToast();
  const [selectedCase, setSelectedCase] = useState<CaseReview | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [noteContent, setNoteContent] = useState("");

  const { data: user } = useQuery<User>({
    queryKey: ["/api/auth/user"],
  });

  const { data: caseReviews = [], isLoading } = useQuery<CaseReview[]>({
    queryKey: ["/api/case-reviews"],
    enabled: !!user && user.role === "admin",
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return apiRequest("PATCH", `/api/case-reviews/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/case-reviews"] });
      toast({ title: "Status updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update status", variant: "destructive" });
    },
  });

  const addNoteMutation = useMutation({
    mutationFn: async ({ caseId, content }: { caseId: string; content: string }) => {
      return apiRequest("POST", `/api/case-reviews/${caseId}/notes`, { content, isInternal: true });
    },
    onSuccess: () => {
      setNoteContent("");
      toast({ title: "Note added successfully" });
    },
    onError: () => {
      toast({ title: "Failed to add note", variant: "destructive" });
    },
  });

  const filteredCases = statusFilter === "all" 
    ? caseReviews 
    : caseReviews.filter(c => c.status === statusFilter);

  const sortedCases = [...filteredCases].sort((a, b) => {
    const urgencyOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const aUrgency = urgencyOrder[a.urgency as keyof typeof urgencyOrder] ?? 4;
    const bUrgency = urgencyOrder[b.urgency as keyof typeof urgencyOrder] ?? 4;
    if (aUrgency !== bUrgency) return aUrgency - bUrgency;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-serif text-primary" data-testid="text-cases-title">
              Case Reviews
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and respond to case review submissions
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40" data-testid="select-status-filter">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cases</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading cases...</div>
        ) : sortedCases.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {statusFilter === "all" ? "No case reviews yet" : `No ${statusFilter} cases`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedCases.map((caseReview) => {
              const UrgencyIcon = urgencyIcons[caseReview.urgency] || Clock;
              return (
                <div 
                  key={caseReview.id}
                  className="bg-card border border-border rounded-lg p-4 lg:p-6"
                  data-testid={`case-card-${caseReview.id}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-medium text-lg">{caseReview.name}</h3>
                        <Badge 
                          variant="outline" 
                          className={statusColors[caseReview.status]}
                        >
                          {caseReview.status}
                        </Badge>
                        <div className={`flex items-center gap-1 text-sm ${urgencyColors[caseReview.urgency]}`}>
                          <UrgencyIcon className="h-4 w-4" />
                          <span className="capitalize">{caseReview.urgency}</span>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground mb-3 space-y-1">
                        <p>{caseReview.email}</p>
                        {caseReview.phone && <p>{caseReview.phone}</p>}
                        {caseReview.serviceType && (
                          <p className="text-foreground">
                            Service: {serviceLabels[caseReview.serviceType] || caseReview.serviceType}
                          </p>
                        )}
                        <p>Submitted: {new Date(caseReview.createdAt).toLocaleDateString()}</p>
                      </div>

                      <p className="text-sm line-clamp-2">{caseReview.caseSummary}</p>
                    </div>

                    <div className="flex flex-row lg:flex-col gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedCase(caseReview)}
                        data-testid={`button-view-case-${caseReview.id}`}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Select 
                        value={caseReview.status}
                        onValueChange={(status) => updateStatusMutation.mutate({ id: caseReview.id, status })}
                      >
                        <SelectTrigger className="w-32" data-testid={`select-status-${caseReview.id}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="under-review">Under Review</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Case Detail Modal */}
        <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedCase && (
              <>
                <DialogHeader>
                  <DialogTitle className="font-serif text-xl text-primary">
                    Case Review: {selectedCase.name}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedCase.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{selectedCase.phone || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Service Requested</p>
                      <p className="font-medium">
                        {selectedCase.serviceType 
                          ? serviceLabels[selectedCase.serviceType] || selectedCase.serviceType
                          : "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Urgency</p>
                      <p className={`font-medium capitalize ${urgencyColors[selectedCase.urgency]}`}>
                        {selectedCase.urgency}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge variant="outline" className={statusColors[selectedCase.status]}>
                        {selectedCase.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted</p>
                      <p className="font-medium">
                        {new Date(selectedCase.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Case Summary</p>
                    <div className="bg-muted/50 rounded-lg p-4 text-sm whitespace-pre-wrap">
                      {selectedCase.caseSummary}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Add Internal Note
                    </p>
                    <Textarea
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      placeholder="Add a note about this case..."
                      className="mb-2"
                      data-testid="input-case-note"
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        if (noteContent.trim()) {
                          addNoteMutation.mutate({ caseId: selectedCase.id, content: noteContent });
                        }
                      }}
                      disabled={!noteContent.trim() || addNoteMutation.isPending}
                      data-testid="button-add-note"
                    >
                      Add Note
                    </Button>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Select 
                      value={selectedCase.status}
                      onValueChange={(status) => {
                        updateStatusMutation.mutate({ id: selectedCase.id, status });
                        setSelectedCase({ ...selectedCase, status });
                      }}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="under-review">Under Review</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={() => setSelectedCase(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
