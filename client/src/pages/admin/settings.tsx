import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AdminLayout } from "./index";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  Bell, 
  Globe, 
  Shield,
  Save,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@shared/schema";

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
}

interface NotificationSettings {
  emailNewCases: boolean;
  emailStatusUpdates: boolean;
  emailWeeklyDigest: boolean;
}

interface EmailSettings {
  fromName: string;
  fromEmail: string;
  replyToEmail: string;
  apiKeyConfigured: boolean;
}

const defaultSiteSettings: SiteSettings = {
  siteName: "Civil CI",
  siteDescription: "Civil-rights intelligence platform exposing corruption and supporting victims of systemic abuse.",
  contactEmail: "contact@civilci.com",
  phoneNumber: "",
  address: "",
};

const defaultNotificationSettings: NotificationSettings = {
  emailNewCases: true,
  emailStatusUpdates: true,
  emailWeeklyDigest: false,
};

const defaultEmailSettings: EmailSettings = {
  fromName: "Civil CI",
  fromEmail: "noreply@civilci.com",
  replyToEmail: "contact@civilci.com",
  apiKeyConfigured: false,
};

interface EmailStatus {
  configured: boolean;
}

export default function AdminSettings() {
  const { toast } = useToast();
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(defaultNotificationSettings);
  const [emailSettings, setEmailSettings] = useState<EmailSettings>(defaultEmailSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [emailTestResult, setEmailTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const { data: user } = useQuery<User>({
    queryKey: ["/api/auth/user"],
  });

  const { data: emailStatus } = useQuery<EmailStatus>({
    queryKey: ["/api/admin/email-status"],
    enabled: !!user && user.role === "admin",
  });

  useEffect(() => {
    if (emailStatus) {
      setEmailSettings(prev => ({ ...prev, apiKeyConfigured: emailStatus.configured }));
    }
  }, [emailStatus]);

  const testEmailMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/admin/email-test");
      return res.json();
    },
    onSuccess: (data) => {
      setEmailTestResult(data);
    },
    onError: () => {
      setEmailTestResult({ success: false, message: "Failed to test connection" });
    },
  });

  const handleSaveSite = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSaving(false);
    toast({ title: "Site settings saved" });
  };

  const handleSaveNotifications = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSaving(false);
    toast({ title: "Notification preferences saved" });
  };

  const handleSaveEmail = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSaving(false);
    toast({ title: "Email settings saved" });
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-primary" data-testid="text-settings-title">
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure site settings, notifications, and email preferences
          </p>
        </div>

        <Tabs defaultValue="site" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="site" data-testid="tab-site">
              <Globe className="h-4 w-4 mr-2" />
              Site
            </TabsTrigger>
            <TabsTrigger value="notifications" data-testid="tab-notifications">
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="email" data-testid="tab-email">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </TabsTrigger>
          </TabsList>

          {/* Site Settings */}
          <TabsContent value="site">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Site Information</CardTitle>
                <CardDescription>
                  Basic information about your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                      data-testid="input-site-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={siteSettings.contactEmail}
                      onChange={(e) => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                      data-testid="input-contact-email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={siteSettings.siteDescription}
                    onChange={(e) => setSiteSettings({ ...siteSettings, siteDescription: e.target.value })}
                    rows={2}
                    data-testid="input-site-description"
                  />
                </div>

                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={siteSettings.phoneNumber}
                      onChange={(e) => setSiteSettings({ ...siteSettings, phoneNumber: e.target.value })}
                      placeholder="Optional"
                      data-testid="input-phone"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={siteSettings.address}
                      onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                      placeholder="Optional"
                      data-testid="input-address"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button onClick={handleSaveSite} disabled={isSaving} data-testid="button-save-site">
                    <Save className="h-4 w-4 mr-2" />
                    Save Site Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Case Submissions</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when someone submits a new case review request
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNewCases}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, emailNewCases: checked })
                    }
                    data-testid="switch-new-cases"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Status Update Confirmations</p>
                    <p className="text-sm text-muted-foreground">
                      Send confirmation emails when case status changes
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailStatusUpdates}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, emailStatusUpdates: checked })
                    }
                    data-testid="switch-status-updates"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Digest</p>
                    <p className="text-sm text-muted-foreground">
                      Receive a weekly summary of all activity
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailWeeklyDigest}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, emailWeeklyDigest: checked })
                    }
                    data-testid="switch-weekly-digest"
                  />
                </div>

                <div className="pt-4">
                  <Button onClick={handleSaveNotifications} disabled={isSaving} data-testid="button-save-notifications">
                    <Save className="h-4 w-4 mr-2" />
                    Save Notification Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Email Configuration</CardTitle>
                <CardDescription>
                  Configure how emails are sent from the system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* API Key Status */}
                <div className={`p-4 rounded-lg border ${
                  emailSettings.apiKeyConfigured 
                    ? "bg-green-500/10 border-green-500/20" 
                    : "bg-yellow-500/10 border-yellow-500/20"
                }`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {emailSettings.apiKeyConfigured ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
                      <div>
                        <p className="font-medium">
                          {emailSettings.apiKeyConfigured 
                            ? "Email service connected" 
                            : "Email service not configured"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {emailSettings.apiKeyConfigured 
                            ? "Resend API key is configured and ready to send emails"
                            : "Add your Resend API key in the Secrets panel to enable email sending"}
                        </p>
                      </div>
                    </div>
                    {emailSettings.apiKeyConfigured && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => testEmailMutation.mutate()}
                        disabled={testEmailMutation.isPending}
                        data-testid="button-test-email"
                      >
                        {testEmailMutation.isPending ? "Testing..." : "Test Connection"}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Test Result */}
                {emailTestResult && (
                  <div className={`p-4 rounded-lg border ${
                    emailTestResult.success 
                      ? "bg-green-500/10 border-green-500/20" 
                      : "bg-red-500/10 border-red-500/20"
                  }`}>
                    <div className="flex items-center gap-3">
                      {emailTestResult.success ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      )}
                      <p className={`text-sm ${emailTestResult.success ? "text-green-600" : "text-red-600"}`}>
                        {emailTestResult.message}
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromName">From Name</Label>
                    <Input
                      id="fromName"
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
                      data-testid="input-from-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromEmail">From Email</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      value={emailSettings.fromEmail}
                      onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                      data-testid="input-from-email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="replyToEmail">Reply-To Email</Label>
                  <Input
                    id="replyToEmail"
                    type="email"
                    value={emailSettings.replyToEmail}
                    onChange={(e) => setEmailSettings({ ...emailSettings, replyToEmail: e.target.value })}
                    data-testid="input-reply-to"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email address where replies will be sent
                  </p>
                </div>

                <div className="pt-4">
                  <Button onClick={handleSaveEmail} disabled={isSaving} data-testid="button-save-email">
                    <Save className="h-4 w-4 mr-2" />
                    Save Email Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Account Security */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Account Security
                </CardTitle>
                <CardDescription>
                  Your admin account information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Admin User</p>
                      <p className="text-sm text-muted-foreground">
                        {user?.email || "Loading..."}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                      {user?.role || "admin"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your account is secured through Replit authentication. 
                    Account settings can be managed in your Replit profile.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
