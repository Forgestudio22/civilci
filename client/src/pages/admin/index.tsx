import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Settings, 
  ClipboardList,
  ChevronRight,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { User } from "@shared/schema";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/cases", label: "Case Reviews", icon: ClipboardList },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["/api/auth/user"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-primary mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You do not have permission to access this area.</p>
          <Link href="/">
            <Button variant="outline" data-testid="button-return-home">Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-card border-r border-border">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center h-16 px-6 border-b border-border">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-serif text-xl text-primary font-bold">Civil CI</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Admin</span>
            </Link>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-1" data-testid="admin-nav">
            {navItems.map((item) => {
              const isActive = location === item.href || 
                (item.href !== "/admin" && location.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                    data-testid={`nav-${item.label.toLowerCase().replace(" ", "-")}`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                    {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 px-3 py-2">
              {user.profileImageUrl ? (
                <img 
                  src={user.profileImageUrl} 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-sm font-medium">
                    {user.firstName?.[0] || user.email?.[0]?.toUpperCase() || "A"}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" data-testid="text-admin-name">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <a href="/api/logout" className="block mt-2">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2" data-testid="button-logout">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-14 flex items-center px-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <span className="font-serif text-lg text-primary font-bold ml-3">Civil CI Admin</span>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-card transform transition-transform ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex flex-col h-full pt-14">
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => {
              const isActive = location === item.href || 
                (item.href !== "/admin" && location.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-border">
            <a href="/api/logout">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:pl-64">
        <div className="pt-14 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  const { data: user } = useQuery<User>({
    queryKey: ["/api/auth/user"],
  });

  const { data: caseReviews = [] } = useQuery<any[]>({
    queryKey: ["/api/case-reviews"],
    enabled: !!user && user.role === "admin",
  });

  const { data: blogPosts = [] } = useQuery<any[]>({
    queryKey: ["/api/admin/blog"],
    enabled: !!user && user.role === "admin",
  });

  const pendingCases = caseReviews.filter((c: any) => c.status === "pending");
  const inProgressCases = caseReviews.filter((c: any) => c.status === "in-progress");
  const publishedPosts = blogPosts.filter((p: any) => p.isPublished === "true");

  const stats = [
    { label: "Pending Cases", value: pendingCases.length, color: "text-yellow-500" },
    { label: "In Progress", value: inProgressCases.length, color: "text-blue-500" },
    { label: "Total Cases", value: caseReviews.length, color: "text-primary" },
    { label: "Published Posts", value: publishedPosts.length, color: "text-green-500" },
  ];

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-primary" data-testid="text-admin-title">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.firstName || "Admin"}. Here's your overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div 
              key={stat.label}
              className="bg-card border border-border rounded-lg p-4"
              data-testid={`stat-${stat.label.toLowerCase().replace(" ", "-")}`}
            >
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-serif text-primary mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/admin/blog/new">
                <Button variant="outline" className="w-full justify-start gap-2" data-testid="button-new-post">
                  <FileText className="h-4 w-4" />
                  Create New Blog Post
                </Button>
              </Link>
              <Link href="/admin/cases">
                <Button variant="outline" className="w-full justify-start gap-2" data-testid="button-view-cases">
                  <ClipboardList className="h-4 w-4" />
                  Review Pending Cases
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-serif text-primary mb-4">Recent Activity</h2>
            {caseReviews.length > 0 ? (
              <div className="space-y-3">
                {caseReviews.slice(0, 3).map((caseReview: any) => (
                  <div key={caseReview.id} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">{caseReview.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {new Date(caseReview.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      caseReview.status === "pending" 
                        ? "bg-yellow-500/10 text-yellow-500"
                        : caseReview.status === "in-progress"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-green-500/10 text-green-500"
                    }`}>
                      {caseReview.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No recent activity</p>
            )}
          </div>
        </div>

        {/* Pending Cases Alert */}
        {pendingCases.length > 0 && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <ClipboardList className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="font-medium text-yellow-500">
                  {pendingCases.length} case{pendingCases.length > 1 ? "s" : ""} awaiting review
                </p>
                <p className="text-sm text-muted-foreground">
                  New submissions need your attention
                </p>
              </div>
              <Link href="/admin/cases" className="ml-auto">
                <Button size="sm" variant="outline" className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10">
                  Review Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
