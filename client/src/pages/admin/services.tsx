import { useState } from "react";
import { AdminLayout } from "./index";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Star, DollarSign, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  priceNote?: string;
  icon: string;
  featured: boolean;
}

const initialServices: Service[] = [
  {
    id: "case-reconstruction",
    title: "Case Reconstruction",
    description: "Complete forensic reconstruction of your case timeline, evidence organization, and pattern analysis. Ideal for complex cases with multiple incidents.",
    price: "$1,500 - $3,500",
    priceNote: "Based on case complexity",
    icon: "FileSearch",
    featured: true,
  },
  {
    id: "misconduct-review",
    title: "Misconduct Review",
    description: "Detailed analysis of professional misconduct patterns, policy violations, and accountability breakdowns. Documentation for formal complaints.",
    price: "$125/hr",
    priceNote: "Typically 8-20 hours",
    icon: "Scale",
    featured: true,
  },
  {
    id: "affidavit-support",
    title: "Affidavit Support",
    description: "Expert assistance in preparing clear, compelling sworn statements with proper legal formatting and evidentiary support.",
    price: "$350 - $750",
    priceNote: "Per document",
    icon: "FileText",
    featured: true,
  },
  {
    id: "pro-se-support",
    title: "Pro-Se Support",
    description: "Comprehensive guidance for self-represented litigants navigating court procedures, filing requirements, and case strategy.",
    price: "$125/hr",
    priceNote: "Consultation + materials",
    icon: "BookOpen",
    featured: false,
  },
  {
    id: "strategy-session",
    title: "Strategy Session",
    description: "One-on-one consultation to review your situation, identify options, and develop an actionable plan forward.",
    price: "$200",
    priceNote: "90-minute session",
    icon: "Target",
    featured: false,
  },
  {
    id: "document-organization",
    title: "Document Organization",
    description: "Professional organization and indexing of evidence, correspondence, and legal documents for easy reference.",
    price: "$75/hr",
    priceNote: "2-hour minimum",
    icon: "FolderOpen",
    featured: false,
  },
  {
    id: "complaint-support",
    title: "Complaint Drafting",
    description: "Assistance preparing formal complaints to regulatory bodies, oversight agencies, and professional boards.",
    price: "$450 - $850",
    priceNote: "Includes research",
    icon: "ClipboardList",
    featured: false,
  },
  {
    id: "timeline-map",
    title: "Timeline Mapping",
    description: "Visual chronological mapping of events, communications, and decision points in your case.",
    price: "$300 - $600",
    priceNote: "Based on complexity",
    icon: "Calendar",
    featured: false,
  },
  {
    id: "accountability-package",
    title: "Accountability Package",
    description: "Full service package combining case reconstruction, complaint support, and ongoing advocacy assistance.",
    price: "$2,500 - $5,000",
    priceNote: "Comprehensive support",
    icon: "Shield",
    featured: true,
  },
];

export default function AdminServices() {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Service | null>(null);

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setFormData({ ...service });
  };

  const closeDialog = () => {
    setEditingService(null);
    setFormData(null);
  };

  const handleSave = () => {
    if (!formData) return;

    setServices(services.map(s => 
      s.id === formData.id ? formData : s
    ));
    closeDialog();
    toast({ title: "Service updated successfully" });
  };

  const toggleFeatured = (id: string) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, featured: !s.featured } : s
    ));
    toast({ title: "Service updated" });
  };

  const featuredServices = services.filter(s => s.featured);
  const additionalServices = services.filter(s => !s.featured);

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-primary" data-testid="text-services-title">
            Services Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Edit service descriptions and pricing displayed on the website
          </p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-8">
          <p className="text-sm text-yellow-600 dark:text-yellow-400">
            <strong>Note:</strong> Service changes are stored locally for this session. 
            For permanent updates to the website, contact your developer or update the source code.
          </p>
        </div>

        {/* Featured Services */}
        <div className="mb-8">
          <h2 className="text-xl font-serif text-primary mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-gold" />
            Featured Services
          </h2>
          <div className="space-y-4">
            {featuredServices.map((service) => (
              <div 
                key={service.id}
                className="bg-card border border-border rounded-lg p-4 lg:p-6"
                data-testid={`service-card-${service.id}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-medium text-lg">{service.title}</h3>
                      <Badge className="bg-gold/10 text-gold border-gold/20">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-gold font-medium">
                        <DollarSign className="h-4 w-4" />
                        {service.price}
                      </span>
                      {service.priceNote && (
                        <span className="text-muted-foreground">
                          {service.priceNote}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openEditDialog(service)}
                      data-testid={`button-edit-service-${service.id}`}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFeatured(service.id)}
                      data-testid={`button-unfeature-${service.id}`}
                    >
                      Unfeature
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Services */}
        <div>
          <h2 className="text-xl font-serif text-primary mb-4">
            Additional Services
          </h2>
          <div className="space-y-4">
            {additionalServices.map((service) => (
              <div 
                key={service.id}
                className="bg-card border border-border rounded-lg p-4 lg:p-6"
                data-testid={`service-card-${service.id}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-lg mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 font-medium">
                        <DollarSign className="h-4 w-4" />
                        {service.price}
                      </span>
                      {service.priceNote && (
                        <span className="text-muted-foreground">
                          {service.priceNote}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openEditDialog(service)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFeatured(service.id)}
                    >
                      Make Featured
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editingService} onOpenChange={closeDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl text-primary">
                Edit Service
              </DialogTitle>
            </DialogHeader>

            {formData && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Service Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    data-testid="input-service-title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    data-testid="input-service-description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="$125/hr"
                      data-testid="input-service-price"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priceNote">Price Note</Label>
                    <Input
                      id="priceNote"
                      value={formData.priceNote || ""}
                      onChange={(e) => setFormData({ ...formData, priceNote: e.target.value })}
                      placeholder="Optional note"
                      data-testid="input-service-price-note"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Label htmlFor="featured">Featured Service</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                    data-testid="switch-service-featured"
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button onClick={handleSave} data-testid="button-save-service">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={closeDialog}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
