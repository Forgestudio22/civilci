import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertCaseReviewSchema, type InsertCaseReview } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Clock, Shield, CheckCircle, Loader2 } from "lucide-react";

export function ContactSection() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<InsertCaseReview>({
    resolver: zodResolver(insertCaseReviewSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: undefined,
      caseSummary: "",
      urgency: "medium",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertCaseReview) => {
      const response = await apiRequest("POST", "/api/case-reviews", data);
      return response;
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Case Review Request Submitted",
        description: "We'll review your case and get back to you soon.",
      });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertCaseReview) => {
    submitMutation.mutate(data);
  };

  if (submitted) {
    return (
      <section
        className="relative py-20 md:py-32 bg-card/30"
        data-testid="section-contact"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 mb-6">
            <CheckCircle className="h-10 w-10 text-gold" />
          </div>
          <h2 className="font-serif text-section font-bold text-foreground mb-4">
            Request Received
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Thank you for reaching out. We take every case seriously and will review 
            your submission carefully. Expect to hear from us within 48 hours.
          </p>
          <p className="mt-8 text-gold font-medium">
            Stay strong. You've taken the first step.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative py-20 md:py-32 bg-card/30"
      data-testid="section-contact"
    >
      <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-section font-bold text-primary mb-4" data-testid="text-contact-title">
            Request a Case Review
          </h2>
          <p className="text-base md:text-lg text-muted-foreground" data-testid="text-contact-description">
            If you're facing misconduct, railroading, or corruption — you don't have to 
            fight alone. Tell us what's happening. We'll listen.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            <Card className="bg-background border-border">
              <CardContent className="p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Name *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your full name"
                                className="bg-card border-border focus:border-gold focus:ring-gold"
                                data-testid="input-name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Email *</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                className="bg-card border-border focus:border-gold focus:ring-gold"
                                data-testid="input-email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Phone <span className="text-muted-foreground">(optional)</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="(555) 123-4567"
                              className="bg-card border-border focus:border-gold focus:ring-gold"
                              data-testid="input-phone"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="serviceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Service Requested</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger
                                  className="bg-card border-border focus:border-gold focus:ring-gold"
                                  data-testid="select-service"
                                >
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="case-reconstruction">Case Reconstruction</SelectItem>
                                <SelectItem value="misconduct-review">Misconduct Review</SelectItem>
                                <SelectItem value="affidavit-support">Affidavit Support</SelectItem>
                                <SelectItem value="pro-se-support">Pro Se Support</SelectItem>
                                <SelectItem value="strategy-session">Strategy Session</SelectItem>
                                <SelectItem value="document-organization">Document Organization</SelectItem>
                                <SelectItem value="complaint-support">Complaint Support</SelectItem>
                                <SelectItem value="timeline-map">Timeline & Issue Map</SelectItem>
                                <SelectItem value="accountability-package">Accountability Package</SelectItem>
                                <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="urgency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Urgency Level *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger
                                  className="bg-card border-border focus:border-gold focus:ring-gold"
                                  data-testid="select-urgency"
                                >
                                  <SelectValue placeholder="Select urgency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="low">No urgent deadline</SelectItem>
                                <SelectItem value="medium">Within 1 week</SelectItem>
                                <SelectItem value="high">Within 48 hours</SelectItem>
                                <SelectItem value="critical">Immediate (rush)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="caseSummary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Case Summary *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Briefly describe your situation. What happened? Who is involved? What deadlines are you facing? (Don't send full documents yet — just give us an overview.)"
                              className="bg-card border-border focus:border-gold focus:ring-gold min-h-[160px] resize-none"
                              data-testid="textarea-case-summary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-semibold"
                      disabled={submitMutation.isPending}
                      data-testid="button-submit"
                    >
                      {submitMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Request Case Review"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                Who Should Reach Out?
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                  <span>People dealing with documented misconduct by officials</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                  <span>Those who feel railroaded by local power structures</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                  <span>Anyone facing small-town or county corruption</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                  <span>People who need help organizing overwhelming evidence</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                What to Include
              </h3>
              <p className="text-muted-foreground mb-3">
                Just the basics for now — we'll request documents later if we move forward.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Any upcoming deadlines or court dates</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Brief overview of what happened</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border">
              <div className="flex items-start gap-4">
                <Lock className="h-6 w-6 text-gold flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Your Privacy Matters
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Everything you share is kept strictly confidential. We understand 
                    the risks of speaking up. Your information stays between us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
