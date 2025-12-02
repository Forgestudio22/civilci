import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  onNavigate: (section: string) => void;
}

const navLinks = [
  { label: "What We Do", section: "what-we-do" },
  { label: "Services", section: "services" },
  { label: "How It Works", section: "how-it-works" },
  { label: "About", section: "about" },
];

export function Navigation({ onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
      data-testid="navigation-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-2 group"
            data-testid="link-home"
          >
            <span className="font-serif text-xl md:text-2xl font-semibold text-primary group-hover:text-gold transition-colors">
              CIVIL CI
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => handleNavClick(link.section)}
                className="text-sm font-medium text-muted-foreground hover:text-gold transition-colors relative group"
                data-testid={`link-${link.section}`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              onClick={() => handleNavClick("contact")}
              className="bg-gold hover:bg-gold/90 text-gold-foreground font-medium"
              data-testid="button-cta-nav"
            >
              Book Case Review
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-gold transition-colors"
            data-testid="button-mobile-menu-toggle"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-b border-border">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => handleNavClick(link.section)}
                className="block w-full text-left py-2 text-muted-foreground hover:text-gold transition-colors"
                data-testid={`link-mobile-${link.section}`}
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => handleNavClick("contact")}
              className="w-full mt-4 bg-gold hover:bg-gold/90 text-gold-foreground font-medium"
              data-testid="button-cta-mobile"
            >
              Book Case Review
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
