interface FooterProps {
  onNavigate: (section: string) => void;
}

const quickLinks = [
  { label: "What We Do", section: "what-we-do" },
  { label: "Services", section: "services" },
  { label: "How It Works", section: "how-it-works" },
  { label: "About", section: "about" },
  { label: "Contact", section: "contact" },
];

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card border-t border-border" data-testid="footer">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          <div className="space-y-4">
            <button
              onClick={() => onNavigate("hero")}
              className="inline-block"
              data-testid="link-footer-home"
            >
              <span className="font-serif text-2xl font-semibold text-primary">
                CIVIL CI
              </span>
            </button>
            <p className="text-gold font-serif italic">
              For the people. Be the people.
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              A civil-rights intelligence unit for regular people. Forensic case 
              reconstruction and misconduct analysis.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.section}>
                  <button
                    onClick={() => onNavigate(link.section)}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                    data-testid={`link-footer-${link.section}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Ready to take the first step? We're here to help.
            </p>
            <button
              onClick={() => onNavigate("contact")}
              className="inline-flex items-center gap-2 text-gold hover:text-gold/80 font-medium transition-colors"
              data-testid="button-footer-case-review"
              aria-label="Request a case review"
            >
              Request a Case Review
              <span className="text-lg" aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground" data-testid="text-copyright">
              &copy; {currentYear} Civil CI. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground italic" data-testid="text-footer-tagline">
              Exposing abuse. Defending citizens. Documenting truth.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
