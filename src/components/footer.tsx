import { GitBranch, Link2, Mail, Heart, Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer id="footer" className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <Code2 className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="font-bold gradient-text">Selva Agashu</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4" id="footer-social">
            <a
              id="footer-github"
              href="https://github.com/selva21092003"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-border bg-card hover:border-primary hover:text-primary hover:bg-primary/5 flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <GitBranch className="h-4 w-4" />
            </a>
            <a
              id="footer-linkedin"
              href="https://www.linkedin.com/in/selva-agashu-051851292/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-border bg-card hover:border-primary hover:text-primary hover:bg-primary/5 flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Link2 className="h-4 w-4" />
            </a>
            <a
              id="footer-email"
              href="mailto:selvaagashu@gmail.com"
              className="w-9 h-9 rounded-full border border-border bg-card hover:border-primary hover:text-primary hover:bg-primary/5 flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground" id="footer-nav">
            {["#about", "#experience", "#projects", "#skills", "#education", "#contact"].map(
              (href) => (
                <a
                  key={href}
                  href={href}
                  id={`footer-nav-${href.slice(1)}`}
                  className="hover:text-primary transition-colors duration-200 capitalize"
                >
                  {href.slice(1)}
                </a>
              )
            )}
          </nav>

          {/* Copyright */}
          <p
            id="footer-copyright"
            className="text-xs text-muted-foreground flex items-center gap-1"
          >
            Built with{" "}
            <Heart className="h-3 w-3 text-primary fill-primary" /> by Selva Agashu &bull; 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
