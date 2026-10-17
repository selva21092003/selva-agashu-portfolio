"use client";

import { Mail, Phone, Heart, Code2, ArrowUp, Sparkles, Activity } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export function Footer() {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="border-t border-border/60 dark:border-white/10 bg-card/95 backdrop-blur-xl relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-border/40">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                <Code2 className="h-4 w-4" />
              </div>
              <span className="font-bold gradient-text text-base">Selva Agashu</span>
            </div>
            <p className="text-xs text-muted-foreground font-sans">
              Backend Software Engineer • Spring Boot · Multi-Cloud · AI Agents
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3" id="footer-social">
            <a
              id="footer-github"
              href="https://github.com/selva21092003"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-border/80 bg-card/60 hover:border-primary hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              id="footer-linkedin"
              href="https://www.linkedin.com/in/selva-agashu-051851292/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-border/80 bg-card/60 hover:border-primary hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              id="footer-email"
              href="mailto:selvaagashu@gmail.com"
              className="w-9 h-9 rounded-full border border-border/80 bg-card/60 hover:border-primary hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              id="footer-phone"
              href="tel:+919345839879"
              className="w-9 h-9 rounded-full border border-border/80 bg-card/60 hover:border-primary hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
              aria-label="Phone"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/80 bg-card/60 hover:bg-card hover:border-primary/50 text-xs text-muted-foreground hover:text-foreground transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-primary" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>Available for backend &amp; cloud engineering roles</span>
          </div>

          <p id="footer-copyright" className="flex items-center gap-1">
            Built with Next.js, Three.js &amp; Spring Boot Philosophy • Selva Agashu
          </p>
        </div>
      </div>
    </footer>
  );
}
